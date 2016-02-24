if (Meteor.isServer) {
  Meteor.publish('userData', function() {
    if (this.userId) {
      return Meteor.users.find();
    } else {
      this.ready();
    }
  });

  Meteor.publish('myChats', function() {
    if (this.userId) {
      return ChatCollection.find({
        participants: this.userId
      });
    }
  });

  ChatCollection.allow({
    insert: function(userId, message) {
      return userId === message.sender;
    },

    update: function(userId, chat) {
      return _.contains( chat.participants, userId );
    }

  });
}

if (Meteor.isClient) {
  Meteor.subscribe('userData');
  Meteor.subscribe('myChats');
}