Meteor.methods({
  insertChat: function(otherUserId) {
    var user = Meteor.user();
    var otherUser = Meteor.users.findOne(otherUserId);

    if (!otherUser || !user) {
      throw new Meteor.Error('user-not-found', 'User not found for chat creation');
    }

    var chatExists = ChatCollection.findOne({
      $or: [
        { participants: [user._id, otherUser._id] },
        { participants: [otherUser._id, user._id] }
      ]
    });

    if ( !chatExists ) {
      var participants = [user._id, otherUser._id];
      var usernames = [user.username, otherUser.username];
      ChatCollection.insert({
        participants: participants,
        usernames: usernames,
        messages: []
      });
    }
  },

  insertMessage: function(chatId, message) {
    var user = Meteor.user();
    var chat = ChatCollection.findOne({ _id: chatId });

    if ( !_.contains(chat.participants, user._id) ) {
      throw new Meteor.Error('unauthorized', 'User not authorized to insert message');
    }

    if ( user && chat ) {
      var timestamp = Date.now();
      ChatCollection.update({ _id: chat._id },
        {
          $push: {
            messages: {
              body: message,
              sender: user._id
            }
          }
        }
      );
    }
  }
});