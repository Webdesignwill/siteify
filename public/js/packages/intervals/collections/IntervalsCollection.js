
define([
  'IntervalModel',
  'Oauth2Model'
], function (IntervalModel, Oauth2Model) {

  "use strict";

  var IntervalsCollection = Backbone.Collection.extend({

    url : '/api/interval/all',

    model : IntervalModel,

    urls : {
      add : '/api/interval/add',
      update : '/api/interval/update',
      delete : '/api/interval/delete'
    },

    getMatchCount : function () {
      var count = _.countBy(this.models, function (model) {
        return model.get('match');
      });
      return count.true || 0;
    },

    addInterval : function (interval, done) {
      $.ajax({
        type : 'POST',
        context : this,
        url : this.urls.add,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Bearer ' + Oauth2Model.get('access_token')
        },
        data : interval,
        success : function (data, status) {
          this.add(data, {parse:true});
          done(true, data, status);
        },
        error : function (data, status) {
          done(false, data, status);
        }
      });
    },

    update : function (user, done) {
      $.ajax({
        type : 'PUT',
        context : this,
        url : this.urls.update,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Bearer ' + Oauth2Model.get('access_token')
        },
        data : user,
        success : function (data, status) {
          this.set(data);
          done(true, data, status);
        },
        error : function (data, status) {
          done(false, data, status);
        }
      });
    },

    delete : function (_id, done) {
      $.ajax({
        type : 'DELETE',
        context : this,
        url : this.urls.delete,
        contentType : 'application/x-www-form-urlencoded',
        headers : {
          Authorization : 'Bearer ' + Oauth2Model.get('access_token')
        },
        data : _id,
        success : function (data, status) {
          this.remove(this.get(data._id));
          done(true, data, status);
        },
        error : function (data, status) {
          done(false, data, status);
        }
      });
    }

  });

  return new IntervalsCollection();

});