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
      <div className="content">
        Welcome to the Sample Chat App!
      </div>
    );
  }
});