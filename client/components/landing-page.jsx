LandingPage = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState: function() {
    return {};
  },

  getMeteorData: function() {
    return {};
  },

  render: function() {
    return (
      <div id="content">
        <div className="container">
          <h1>Welcome to the Sample Chat App!</h1>
        </div>
      </div>
    );
  }
});