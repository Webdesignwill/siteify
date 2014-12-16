
module.exports = function (app, io) {
  io.of('/pages').on('connection', function (socket) {
    socket.on('page:added', function (page) {
      socket.broadcast.emit('page:added', page);
    });
    socket.on('page:removed', function (page) {
      socket.broadcast.emit('page:removed', page);
    });
    socket.on('disconnect', function () {});
  });
};