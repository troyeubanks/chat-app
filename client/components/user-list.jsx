UserList = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState: function() {
    return {};
  },

  getMeteorData: function() {
    console.log("Meteor users", Meteor.users.find({}).fetch());
    return {
      user: Meteor.user(),
      users: Meteor.users.find({}).fetch()
    };
  },

  render: function() {
    return (
      <div className="container">
        <div className="row">
          <ul className="userlist">
            {
              this.data.users.map( function(user) {
                return <li key={ user._id }>{ user.username }</li>;
              })
            }
          </ul>
        </div>
      </div>
    );
  }
});