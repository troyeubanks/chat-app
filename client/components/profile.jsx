Profile = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState: function() {
    return {
      modified: false,
      newInterests: []
    };
  },

  getMeteorData: function() {
    return {
      user: Meteor.user()
    };
  },

  saveProfile: function(e) {
    e.preventDefault();

    var location = this.refs.location.value.trim();
    var interests = this.state.newInterests;

    Meteor.call("updateProfile", location, interests, function(error, result) {
      if (error) {
        console.error("Error: ", error);
      }
    });

    this.setState({ "modified": false});
    this.setState({ "newInterests": [] });
  },

  handleKeyPress: function(e) {
    if (e.which === 13 && this.interestInput.value != '') {
      var interest = this.interestInput.value;

      var currentInterests = this.state.newInterests;
      currentInterests.push(interest);
      this.setState({ "newInterests": currentInterests });

      console.log("newInterests", this.state.newInterests);
      this.interestInput.value = '';
      e.preventDefault();
    }
  },

  render: function() {
    return (
      <section id="profile">
      {
        this.data.user ?
          <div className="container">
            <div className="row">
              <div className="username col-md-4">
                Username: { this.data.user.username }
              </div>

              <div className="join-date col-md-4">
                Member Since: { this.data.user.createdAt.toDateString() }
              </div>

              <div className="location col-md-4">
                <label htmlFor="location">
                  Location:
                </label>
                <input type="text"
                       ref="location"
                       defaultValue='' />
              </div>
            </div>

            <div className="row">
              <div className="interests col-md-12">
                <h3>Interests</h3>
                <input ref={ function(ref) {
                         this.interestInput = ref;
                       }.bind(this)}
                       type="text"
                       placeholder="Add an interest"
                       onKeyPress={ this.handleKeyPress } />

              </div>
            </div>

            <div className="row">
              <div className="save-profile btn btn-primary"
                   onClick={ this.saveProfile }>
                Save
              </div>
            </div>
          </div>
        :
          <div></div>
      }
      </section>
    );
  }
});