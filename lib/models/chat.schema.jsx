ChatCollection = new Mongo.Collection('chat');
Schema = {};

Schema.ChatMessage = new SimpleSchema({
  timestamp: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } else {
        this.unset();
      }
    }
  },

  body: {
    type: String,
    optional: true
  }
});

Schema.Chat = new SimpleSchema({
  participants: {
    type: [String],
    optional: false
  },

  otherUsername: {
    type: String,
    optional: false
  },

  messages: {
    type: [Schema.ChatMessage],
    optional: true
  }
});

ChatCollection.attachSchema(Schema.Chat);