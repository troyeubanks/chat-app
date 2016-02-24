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
      ChatCollection.insert({
        participants: participants,
        otherUsername: otherUser.username
      });
    }

  }
});