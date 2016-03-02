ChatRoom = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState: function() {
    return {};
  },

  getMeteorData: function() {
    return {
      user: Meteor.user(),
      chats: ChatCollection.find({ participants: Meteor.userId() }).fetch()
    };
  },

  handleKeyDown: function( chatId ) {
    return function(e) {
      if (e.which === 13) {
        var value = this.chatInput.value;
        Meteor.call('insertMessage', chatId, value, function(error) {
          if (error) {
            console.error("error: ", error);
          } else {
            this.chatInput.value = '';
          }
        }.bind(this));
      }
    }.bind(this)
  },

  render: function() {
    var chat = {};


    if (this.data.chats) {
      chat = _.findWhere( this.data.chats, { _id: this.props.currentTab._id });

      if (chat) {
        var userList = chat.usernames.map( function(username, counter) {
          return <li key={ counter++ }>{ username }</li>
        })
      }
    }

    return (
      <div className="row">
      {
        chat ?
          <div className="chat-window">
            <div className="chat-messages">
              {
                chat.messages ?
                  chat.messages.map( function(message, counter) {
                    var isSender = message.sender === Meteor.userId();
                    var className = ( isSender ? "message mine": "message" );

                    return (
                      <div key={ counter }
                           className={ className }>
                        <p>
                          { message.body }
                        </p>
                      </div>
                    );
                  }) : ''
              }
            </div>
            <div className="chat-input">
              <input type="text"
                     placeholder="type your message"
                     onKeyDown={ this.handleKeyDown(chat._id) }
                     ref={ function(ref) {
                             this.chatInput = ref
                         }.bind(this)} />
            </div>
            <div className="user-list">
              <ul>
                { userList }
              </ul>
            </div>
          </div>
        :
          ''
      }
      </div>
    );
  }
});