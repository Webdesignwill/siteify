
module.exports = function (app, io) {
  io.of('/pages').on('connection', function (sockets) {
    sockets.on('new:page', function (page) {
      sockets.broadcast.emit('page:added', page);
    });
    sockets.on('delete:page', function (page) {
      sockets.broadcast.emit('page:deleted', page);
    });
  });
};