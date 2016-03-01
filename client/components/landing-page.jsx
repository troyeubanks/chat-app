LandingPage = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState: function() {
    return {};
  },

  getMeteorData: function() {
    return {
      user: Meteor.user(),
      chats: ChatCollection.find({}).fetch()
    };
  },

  render: function() {

    var bubbleLayout = (
      this.data.chats ?
        this.data.chats.map( function(chat, counter) {
          return (
            <ChatBubble key={ counter++ }
                        chatId={ chat._id } />
          )
        })
      :
        ''
    );

    return (
      <div id="content">
        <div className="row">
          <div className="heading jumbotron">
            <h1>Welcome to the Sample Chat App!</h1>

          </div>
          <hr />
        </div>

        {
          this.data.user ?
            <div id="bubble-container">
              <div className="row">
                { bubbleLayout }
              </div>
            </div>
          :
            <div className="row">

              <div className="bg-info col-md-6">
                Please login to get started
              </div>

              <div className="login-button col-md-6">
                <AccountsUIWrapper />
              </div>

            </div>
        }
      </div>
    );
  }
});