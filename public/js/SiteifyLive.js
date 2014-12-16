
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

    App.$broker.on('siteify:toggleLive', function (event, options) {
      toggleLive(options);
    });

    function toggleLive (options) {
      if(App.User.get('loggedin')) {
        self[self.live ? 'offlive' : 'onlive'](options);
        App.$broker.trigger('siteify:live:change', self.live);
      }
    }

    this.registerChannel = function (channel) {
      channels[channel] = {
        socket : null
      };
    };

    this.onlive = function (options) {
      var channel;
      for(var key in channels) {
        channel = channels[key];
        if(!channel.socket) {
          channel.socket = io.connect([channel]);
        } else {
          channel.socket.connect([channel]);
        }
      }
      this.live = true;
    };

    this.offlive = function (options) {
      for(var key in channels) {
        channels[key].socket.disconnect([channels[key]]);
      }
      this.live = false;
    };

  };

  return new SiteifyLive();

});