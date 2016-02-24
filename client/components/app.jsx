App = React.createClass({

  mixins: [ReactMeteorData],

  getInitialState: function () {
    return {};
  },

  getMeteorData: function() {
    return {
      chats: ChatCollection.find({ participants: Meteor.userId() }).fetch()
    };
  },

  render: function () {
    return (
      <div id="app-content">
        <Nav />

        <div className="section-content">
          <div className="container">
            <main>{ this.props.content }</main>
          </div>
          {
            this.data.chats && this.data.chats.length ?
              this.data.chats.map(function (chat, counter) {
                return (
                  <ChatWindow key={ counter++ }
                              chat={ chat } />
                );
              })
            :
              ''
          }

        </div>
      </div>
    );
  }
});