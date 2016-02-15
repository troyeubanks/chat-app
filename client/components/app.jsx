App = React.createClass({

  mixins: [ReactMeteorData],

  getInitialState: function () {
    return {};
  },

  getMeteorData: function() {
    return {
    };
  },

  render: function () {
    return (
      <div className="app-content">
        <main>{ this.props.content }</main>
      </div>
    );
  }
});