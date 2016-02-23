Nav = React.createClass({

  mixins: [ReactMeteorData],

  getInitialState: function() {
    return {};
  },

  getMeteorData: function() {
    return {};
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
                <i className="material-icons">account_circle</i>
                Profile
            </li>
            <li onClick={ this.navClicked('userlist') }>
                <i className="material-icons">list</i>
                User List
            </li>
            <li onClick={ this.logoutClicked }>
              <i className="material-icons">exit_to_app</i>
              Logout
            </li>
          </ul>
        </nav>

        <div id="profile">

        </div>
      </div>
    )
  }
});