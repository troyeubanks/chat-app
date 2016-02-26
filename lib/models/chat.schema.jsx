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
      } else if (this.isUpdate) {
        return new Date();
      } else {
        this.unset();
      }
    }
  },

  body: {
    type: String
  },

  sender: {
    type: String
  }
});

Schema.Chat = new SimpleSchema({
  participants: {
    type: [String]
  },

  topic: {
    type: String
  },

  image: {
    type: String
  },

  usernames: {
    type: [String]
  },

  messages: {
    type: [Schema.ChatMessage]
  }
});

ChatCollection.attachSchema(Schema.Chat);