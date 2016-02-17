Schema = {};

Schema.UserProfile = new SimpleSchema({
  location: {
    type: String,
    optional: true,
    autoValue: function() {
      if (this.isInsert) {
        return '';
      } else if (this.isUpsert) {
        return { $setOnInsert: '' }
      }
    }
  },

  interests: {
    type: [String],
    optional: true,
    autoValue: function() {
      if (this.isInsert) {
        return [''];
      } else if (this.isUpsert) {
        return { $setOnInsert: [''] }
      }
    }
  }
});

Schema.User = new SimpleSchema({
  username: {
    type: String,
    optional: true
  },

  emails: {
    type: Array,
    optional: true
  },

  "emails.$": {
    type: Object
  },

  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },

  "emails.$.verified": {
    type: Boolean
  },

  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } else {
        this.unset();
      }
    }
  },

  profile: {
    type: Schema.UserProfile,
    optional: true,
  },

  services: {
    type: Object,
    optional: true,
    blackbox: true
  }
});

Meteor.users.attachSchema(Schema.User);