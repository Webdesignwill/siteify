
define([
  'App',
  'io',
  'UserModel'
], function (App, io, UserModel) {

  "use strict";

  var SiteifyLive = function () {

    var live = false,
          self = this;

    var channels = {};

    App.$broker.on('siteify:toggleLive', function (event) {
      toggleLive();
    });

    function toggleLive () {
      if(App.User.get('loggedin')) {
        self[self.live ? 'offlive' : 'onlive']();
        App.$broker.trigger('siteify:live:change', self.live);
      }
    }

    this.register = function (channel) {
      channels[channel.room] = {
        socket : null,
        events : channel.events
      };
    };

    this.emit = function (channel) {
      if(channels[channel.room].socket) {
        channels[channel.room].socket.emit(channel.event, channel.data);
      }
    };

    this.onlive = function () {
      var channel;
      for(var key in channels) {
        channel = channels[key];
        if(!channel.socket) {
          channel.socket = io.connect(key);
          for(key in channel.events) {
            channel.socket.on(key, channel.events[key]);
          }
        } else {
          channel.socket.connect([channel]);
        }
      }
      this.live = true;
    };

    this.offlive = function () {
      for(var key in channels) {
        channels[key].socket.disconnect([channels[key]]);
      }
      this.live = false;
    };

  };

  return new SiteifyLive();

});