var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var db;

function countUnshownNotification(callback) {
  db.collection('notifications').find({
    isShow: false
  }).count(function (error, count) {
    if (error) {
      return console.error(error);
    }
    callback(count);
  });
}

function notifyNewCountUpdated(newCount) {
  io.sockets.emit('new-count-updated', newCount);
}

function notifyNewNotification(newNotification, newCount) {
  io.sockets.emit('new-notification', {
    notification: newNotification,
    newCount
  });
}

function notifyNotificationUpdated(notification) {
  io.sockets.emit('notification-updated', notification);
}

/**
 * JSON body parser
 */
app.use(bodyParser.json());

/**
 * CORS
 */
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3333');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

/**
 * Anything in dist can be accessed statically without
 * this express router getting involved
 */
app.use(express.static(path.join(__dirname, 'dist'), {
  dotfiles: 'ignore',
  index: false
}));

/**
 * Always serve the same HTML file for all requests
 */
app.get(/^\/(?!api).*/, function (req, res) {
  console.log('Request: [GET]', req.originalUrl)
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.get('/api/notifications', function (req, res) {
  db.collection('notifications').find().toArray(function (error, items) {
    var notifications = items.map(function (item) {
      item.id = item._id;
      return item;
    });
    countUnshownNotification(function (newCount) {
      res.json({
        notifications: notifications,
        newCount: newCount
      });
    });
  });
});

app.post('/api/notifications', function (req, res) {
  var newNotification = req.body;

  newNotification.time = new Date();
  newNotification.isRead = false;
  newNotification.isShow = false;

  db.collection('notifications').insert(newNotification, function (error, result) {
    if (error) {
      return console.error(error);
    }

    var insertedNotification = result.ops[0];
    insertedNotification.id = insertedNotification._id;

    countUnshownNotification(function (newCount) {
      notifyNewNotification(insertedNotification, newCount);
    });

    res.json(insertedNotification);
  })
});

app.get('/api/notifications/:id', function (req, res) {
  var notificationId = new ObjectId(req.params.id);

  db.collection('notifications').findOne({
    _id: notificationId
  }, function (error, notification) {
    notification.id = notification._id;
    res.json(notification);
  });
});

app.put('/api/notifications/:id/read', function (req, res) {
  var notificationId = new ObjectId(req.params.id);

  db.collection('notifications').update({
    _id: notificationId
  }, {
    $set: {
      isRead: true,
      isShow: true
    }
  }, function (error) {
    if (error) {
      return console.error(error);
    }
    db.collection('notifications').findOne({
      _id: notificationId
    }, function (error, notification) {
      notification.id = notification._id;
      notifyNotificationUpdated(notification);
      res.json(notification);
    });
  });
});

app.post('/api/notifications/reset/counter', function (req, res) {

  db.collection('notifications').update({
    isShow: false
  }, {
    $set: {
      isShow: true
    }
  }, function (error) {
    if (error) {
      return console.error(error);
    }
    notifyNewCountUpdated(0);

    res.json(true);
  });
});

/**
 * Error Handling
 */
app.use(function (req, res, next) {
  console.log('404')
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res) {
  res.sendStatus(err.status || 500);
});

/**
 * WebSocket server
 */
io.on('connection', function (socket) {
  // Push current state
  db.collection('notifications').find().toArray(function (error, items) {
    var notifications = items.map(function (item) {
      item.id = item._id;
      return item;
    });
    countUnshownNotification(function (newCount) {
      socket.emit('current-state', {
        notifications,
        newCount: newCount
      });
    });
  });

  socket.on('disconnect', function () {
    console.log('User disconnected');
  });

  console.log('A user connected');
});

/**
 * Start Server
 */
const PORT = 8888;
const MONGODB_URL = 'mongodb://testuser:testuser%40123@ds023432.mlab.com:23432/react-noti-app';

MongoClient.connect(MONGODB_URL, function (error, database) {
  if (error) {
    return console.error(error);
  }
  db = database;
  http.listen(PORT, function () {
    console.log('Visit: localhost:' + PORT);
  });
});
