ChatWindow = React.createClass({

  mixins: [ReactMeteorData],

  getInitialState: function() {
    return {
      open: this.props.open
    }
  },

  getMeteorData: function() {
    return {};
  },

  toggleChat: function(e) {
    e.preventDefault();

    this.setState({ open: !this.state.open });
  },

  handleKeyPress: function(e) {
    if (e.which === 13) {
      var message = this.chatInput.value;

      Meteor.call('insertMessage', this.props.chat._id, message, function(error) {
        if (error) {
          console.error("insertMessage error: ", error);
        }
      });

      this.chatInput.value = '';
      e.preventDefault();
    }
  },

  render: function() {
    var chatClass = 'chat-window' + (this.state.open ? ' open' : '');
    var otherUsername = this.props.chat.usernames[0] === Meteor.user().username ?
                        this.props.chat.usernames[1] : this.props.chat.usernames[0];
    return (
      <div className="row">
        <div className="col-sm-3">
          <div className={ chatClass }
               onClick={ this.toggleChat }>
            <div className="row chat-header">
              <div className="other-username col-sm-5 col-sm-offset-1">
                <h2>{ otherUsername }</h2>
              </div>
              <div className="close col-sm-1 col-sm-offset-5">
                x
              </div>
            </div>

            <div className="chat-body">
              <div className="messages">
                {
                  this.props.chat.messages ?
                    this.props.chat.messages.map( function(message, counter) {
                      return (
                        <p key={ counter++ }>{ message.body }</p>
                      )
                    })
                  :
                    <p>No messages</p>
                }
              </div>

              <input type="text"
                     placeholder="type your message"
                     ref={ function(ref) {
                       this.chatInput = ref
                     }.bind(this) }
                     onKeyPress={ this.handleKeyPress } />
            </div>
          </div>
        </div>
      </div>
    )
  }
});