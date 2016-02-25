Nav = React.createClass({

  mixins: [ReactMeteorData],

  getInitialState: function() {
    return {};
  },

  getMeteorData: function() {
    return {
      chats: ChatCollection.find({ participants: Meteor.userId() }).fetch()
    };
  },

  logoutClicked: function(e) {
    e.preventDefault();

    FlowRouter.go('root');
    Meteor.logout();
  },

  navClicked: function(path) {
    return function() {
      var flowPath = FlowRouter.path(path, null, null);
      FlowRouter.go(flowPath);
    };
  },

  render: function() {
    return (
      <div id="nav">
        <nav>
          <div className="logo"
               onClick={ this.navClicked('root') }>
            <h1>ChatApp</h1>
          </div>
          <hr />
          <ul className="nav-list">
            <li onClick={ this.navClicked('profile') }>
              <div className="nav-element ">
                <h2>
                  <i className="material-icons">account_circle</i>
                  Profile
                </h2>
              </div>
            </li>
            <li onClick={ this.navClicked('userlist') }>
              <div className="nav-element">
                <h2>
                  <i className="material-icons">list</i>
                  User List
                </h2>
              </div>
            </li>
            <li onClick={ this.logoutClicked }>
              <div className="nav-element">
                <h2>
                  <i className="material-icons">exit_to_app</i>
                  Logout
                </h2>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
});