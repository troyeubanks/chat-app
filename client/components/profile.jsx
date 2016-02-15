Profile = React.createClass({
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
        Profile page content
      </div>
    );
  }
});