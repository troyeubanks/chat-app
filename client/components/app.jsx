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

        <div className="section-content">
          <div className="container">
            <main>{ this.props.content }</main>
          </div>
        </div>

        <Nav />
      </div>
    );
  }
});