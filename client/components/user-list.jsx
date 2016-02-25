UserList = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState: function() {
    return {};
  },

  getMeteorData: function() {
    return {
      user: Meteor.user(),
      users: Meteor.users.find({}, { sort: { createdAt: 1 }}).fetch(),
      chats: ChatCollection.find({ participants: Meteor.userId() }).fetch()
    };
  },

  toggleChat: function(otherUserId) {
    return function() {

      var chatExists = false;

      _.each( this.data.chats, function(chat) {
        if ( _.contains( chat.participants, otherUserId )) {
          chatExists = true;
        }
      });

      if ( !chatExists ) {
        Meteor.call( 'insertChat', otherUserId );
      }
    }.bind(this)
  },

  render: function() {
    return (
      <div id="content">
        <div className="row userlist-header">
          <div className="col-sm-10 col-sm-offset-1">
            <h1>List of users</h1>
            <hr />
            <h3>Click on a name to open chat</h3>
          </div>
          <div className="col-sm-1"></div>
        </div>

        <div className="row">
          <ul className="userlist">
            {
              this.data.users.map( function(user) {
                if (user._id !== Meteor.userId())
                  return (



                    <div className="userlist-item"
                         key={ user._id }
                         onClick={ this.toggleChat(user._id) }>
                      <li className="col-sm-10 col-sm-offset-1">
                        { user.username }
                      </li>
                    </div>
                  )
              }.bind(this))
            }
          </ul>
        </div>
      </div>
    );
  }
});