
module.exports = function (app, io) {
  io.of('/pages').on('connection', function (sockets) {
    sockets.on('pages:count:change', function (page) {
      sockets.broadcast.emit('pages:count:change', page);
    });
    sockets.on('disconnect', function () {});
  });
};