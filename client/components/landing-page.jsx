LandingPage = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState: function() {
    return {};
  },

  getMeteorData: function() {
    return {
      user: Meteor.user()
    };
  },

  render: function() {
    return (
      <div id="content">
        <div className="container">
          <div className="row">
            <div className="heading jumbotron">
              <h1>Welcome to the Sample Chat App!</h1>

            </div>
            <hr />
          </div>

          {
            this.data.user ?
              <div className="row">

                <div className="instructions">
                  You are logged in as: { this.data.user.username }
                </div>

                <div className="nav-tabs">
                  <Nav />
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
      </div>
    );
  }
});