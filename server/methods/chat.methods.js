Meteor.methods({
  insertChatRoom: function(topic, image) {
    check(topic, String);
    check(image, String);

    var user = Meteor.user();

    if ( !user ) {
      throw new Meteor.Error('user-not-found', 'No user found');
    }

    var chatExists = ChatCollection.findOne({
      topic: topic
    });

    if ( chatExists ) {
      throw new Meteor.Error('chat-exists', 'Chat with topic already exists');
    } else {
      var participants = [user._id];
      var usernames = [user.username];
      ChatCollection.insert({
        topic: topic,
        image: image,
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