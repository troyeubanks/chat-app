ChatCollection = new Mongo.Collection('chat');

if (Meteor.isServer) {
  Meteor.publish('userData', function() {
    if (this.userId) {
      return Meteor.users.find();
    } else {
      this.ready();
    }
  });
}

if (Meteor.isClient) {
  Meteor.subscribe('userData');
}