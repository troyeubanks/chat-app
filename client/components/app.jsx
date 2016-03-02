App = React.createClass({

  mixins: [ReactMeteorData],

  getInitialState: function () {
    return {
      tabList: '',
      currentTab: ''
    };
  },

  getMeteorData: function() {
    return {
      chats: ChatCollection.find({ participants: Meteor.userId() }).fetch(),
      user: Meteor.user()
    };
  },

  componentDidMount: function() {
    this.setState({ tabList: this.data.chats });
    this.setState({ currentTab: this.data.chats[0] });
  },

  changeTab: function(tab) {
    this.setState({ currentTab: tab._id })
  },

  render: function () {

    return (
      <div id="app-content">
      {
        this.data.user ?
          <div>
            <div className="section-content">
              <div className="container">
                <main>{ this.props.content }</main>
              </div>
            </div>

            <div className="chat-room-container">
              <div className="chat-tabs row">
                <ChatTabs currentTab={ this.state.currentTab }
                          tabList={ this.state.tabList }
                          changeTab={ this.changeTab }
                          chats={ this.data.chats }/>
              </div>
              <div className="row">
                <ChatRoom currentTab={ this.state.currentTab } />
              </div>
            </div>

          </div>
        :
          <div></div>
      }
      </div>
    );
  }
});