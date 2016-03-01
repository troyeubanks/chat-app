Nav = React.createClass({

  mixins: [ReactMeteorData],

  getInitialState: function() {
    return {
      open: false
    }
  },

  getMeteorData: function() {
    return {
      chats: ChatCollection.find({ participants: Meteor.userId() }).fetch()
    };
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

  toggleNewBubbleForm: function(e) {
    e.preventDefault();

    this.setState({ open: !this.state.open });
  },

  handleKeyDown: function(e) {
    if (e.which === 13) {
      var topic = this.bubbleInput.value.trim();
      var imageSrc = this.bubbleImage.src;

      Meteor.call('insertChatRoom', topic, imageSrc, function (error) {
        if (error) {
          console.error("Error: ", error);
          alert("Chat with this topic already exists");
        } else {
          this.bubbleInput.value = '';
          this.setState({ open: false });
          //TODO reset this.bubbleImage when image uploading is implemented
        }
      }.bind(this));
      e.preventDefault();
    }
  },

  render: function() {

    var renderBubbleForm = function() {
      var bubbleFormClass = "bubble-form" + ( this.state.open ? " open" : "");

      //TODO Add image uploading
      var imageSrc = "/images/default_profile.png";

      return (
        <div className={ bubbleFormClass }>
          <div className="bubble-image">
            <img src={ imageSrc }
                 ref={ function(ref) {
                         this.bubbleImage = ref;
                     }.bind(this) } />
          </div>

          <div className="interest-input">
            <input type="text"
                   ref={ function(ref) {
                           this.bubbleInput = ref;
                       }.bind(this) }
                   onKeyDown={ this.handleKeyDown }
                   placeholder="type the chatroom topic" />
          </div>
        </div>
      )
    }.bind(this);

    return (
      <div id="nav">
        <nav>
          <div className="logo"
               onClick={ this.navClicked('root') }>
            <h1>ChatApp</h1>
          </div>

          { renderBubbleForm() }

          <hr />
          <ul className="nav-list">

            <li onClick={ this.navClicked('profile') }>
              <div className="nav-element ">
                <h2>
                  <i className="material-icons">account_circle</i>
                  Profile
                </h2>
              </div>
            </li>

            <li onClick={ this.toggleNewBubbleForm }>
              <div className="nav-element">
                <div className="create-bubble">
                  <h2>
                    <i className="material-icons">add_circle_outline</i>
                    Add Chat
                  </h2>
                </div>
              </div>
            </li>

            <li onClick={ this.logoutClicked }>
              <div className="nav-element">
                <h2>
                  <i className="material-icons">exit_to_app</i>
                  Logout
                </h2>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
});