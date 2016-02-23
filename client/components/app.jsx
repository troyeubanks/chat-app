App = React.createClass({

  mixins: [ReactMeteorData],

  getInitialState: function () {
    return {};
  },

  getMeteorData: function() {
    return {};
  },

  render: function () {
    return (
      <div id="app-content">
        <Nav />

        <div className="section-content">
          <div className="container">
            <main>{ this.props.content }</main>
          </div>
        </div>
      </div>
    );
  }
});