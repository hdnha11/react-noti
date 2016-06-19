var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var notifications = [{
  id: 1,
  imageContent: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  textContent: 'Facere deserunt sit quisquam vero tenetur dignissimos',
  time: new Date(),
  isRead: false
}, {
  id: 2,
  imageContent: null,
  textContent: 'Necessitatibus numquam eum veniam minus doloribus',
  time: new Date(),
  isRead: false
}, {
  id: 3,
  imageContent: null,
  textContent: 'Quidem dolorem eum reprehenderit ex sint ab',
  time: new Date(),
  isRead: false
}];

var newComingNotificationCount = 3;

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
  res.json({
    notifications: notifications,
    newCount: newComingNotificationCount
  });
});

app.post('/api/notifications', function (req, res) {
  var newNotification = req.body;

  newNotification.id = notifications[notifications.length - 1].id + 1;
  newNotification.time = new Date();
  newNotification.isRead = false;
  notifications.push(newNotification);

  newComingNotificationCount++;

  notifyNewNotification(newNotification, newComingNotificationCount);

  res.json(newNotification);
});

app.get('/api/notifications/:id', function (req, res) {
  var notificationId = parseInt(req.params.id, 10);

  res.json(notifications.filter(function (notification) {
    return notification.id === notificationId;
  })[0]);
});

app.put('/api/notifications/:id/read', function (req, res) {
  var notificationId = parseInt(req.params.id, 10);
  var notification = notifications.filter(function (notification) {
    return notification.id === notificationId;
  })[0];

  notification.isRead = true;

  notifyNotificationUpdated(notification);

  res.json(notification);
});

app.post('/api/notifications/reset/counter', function (req, res) {
  newComingNotificationCount = 0;
  notifyNewCountUpdated(0);

  res.json(true);
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
  socket.emit('current-state', {
    notifications,
    newCount: newComingNotificationCount
  });

  socket.on('disconnect', function () {
    console.log('User disconnected');
  });

  console.log('A user connected');
});

/**
 * Start Server
 */
const port = 8888;
http.listen(port, function () {
  console.log('Visit: localhost:' + port);
});
