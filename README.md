# Notifications Service

## Development

We need `Node.js` to build and manage dependencies, so make sure you have installed `Node.js` before getting started.

```bash
# Install the dependencies
$ npm install

# Start the server (port: 8888)
$ npm start

# Build production (find production version in `dist` folder)
$ npm run build

# Start development server (port: 3333)
$ npm run dev-server
```
## Configuration

In `server.js` file you can config `PORT` and `MONGODB_URL` constants. The default values are `8888` and `my mLab remote db`.

## APIs

### ***get*** `/api/notifications`

Get all notifications.

### ***post*** `/api/notifications`

Create a new notification.

JSON body:

```bash
{
  "imageContent": "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
  "textContent": "Facere deserunt sit quisquam vero tenetur dignissimos"
}
```

*imageContent* is optional.

### ***get*** `/api/notifications/:id`

Get a notification by its id.

### ***put*** `/api/notifications/:id/read`

Update read state for a notification.

### ***post*** `/api/notifications/reset/counter`

Reset new coming notification counter.
