Meteor.methods({
  updateProfile: function(location, interests) {
    check(location, String);
    check(interests, [String]);

    var user = Meteor.users.findOne(this.userId);
    if (!user) {
      throw new Meteor.Error("user-not-found", "User not found");
    }

    var totalInterests = user.profile.interests;
    _.forEach(interests, function (interest) {
      if (interest) {
        totalInterests.push(interest);
      }
    });

    user.profile.location = location;
    user.profile.interests = totalInterests;

    Meteor.users.update(this.userId, { $set: { profile: user.profile }});
    return true;
  }
});