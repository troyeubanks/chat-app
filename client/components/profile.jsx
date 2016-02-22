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

  removeInterest: function(interest) {
    return function(e) {
      e.preventDefault();

      var stateIndex = _.indexOf( this.state.newInterests, interest );
      var dbIndex = _.indexOf( this.data.user.profile.interests, interest );

      if (stateIndex !== -1) {

        var int = this.state.newInterests;
        int.splice(stateIndex, 1);
        this.setState({ 'newInterests': int });

      } else if ( dbIndex !== -1 ) {
        var int = this.data.user.profile.interests;
        int.splice(dbIndex, 1);


        Meteor.users.update( Meteor.userId(), { $set: { profile: { 'interests': int }}} );
      }
    }.bind(this)
  },

  render: function() {
    if (this.data.user) {
      var renderInterests = this.state.newInterests.map(function (interest, i) {
        if (interest) {
          return (
            <li key={ 'state' + i }>
              <div className="row">
                <div className="col-sm-1"></div>
                <div className="interest col-sm-10">
                  <h2 className="col-sm-9">{ interest }</h2>
                  <div className="remove col-sm-offset-2 col-sm-1"
                       onClick={ this.removeInterest(interest) }>
                    <i className="material-icons">clear</i>
                  </div>
                </div>
              </div>
            </li>
          )
        }
      }.bind(this))

      var renderProfileInterests = this.data.user.profile.interests.map(function (interest, i) {
        if (interest) {
          return (
            <li key={ 'db' + i }>
              <div className="row">
                <div className="col-sm-1"></div>
                <div className="interest col-sm-10">
                  <h2 className="col-sm-9">{ interest }</h2>
                  <div className="remove col-sm-offset-2 col-sm-1"
                       onClick={ this.removeInterest(interest) }>
                    <i className="material-icons">clear</i>
                  </div>
                </div>
              </div>
            </li>
          )
        }
      }.bind(this))
    }

    if (this.data.user) {
      var joinDate = this.data.user.createdAt;
      var joinDateString = joinDate.getMonth() + '/' + joinDate.getDate() + '/' + joinDate.getFullYear();
    }

    return (
      <section id="profile">
      {
        this.data.user ?
          <div className="container">

            <div className="user-info row">
              <div className="username col-sm-4">
                <h1>Username: { this.data.user.username }</h1>
              </div>

              <div className="join-date col-sm-4">
                <h1>Member Since: { joinDateString }</h1>
              </div>

              <div className="location col-sm-4">
                <label htmlFor="location">
                  <h1>Location:</h1>
                </label>
                <input type="text"
                       ref="location"
                       defaultValue={ this.data.user.profile.location } />
              </div>
            </div>


            <div className="interest-container row">
              <div className="interest-header">
                <h1 className="col-sm-3 col-sm-offset-2">Interests</h1>
                <div className="col-sm-1"></div>
                <input className="col-sm-4"
                       ref={ function(ref) {
                         this.interestInput = ref;
                       }.bind(this)}
                       type="text"
                       placeholder="Add an interest"
                       onKeyPress={ this.handleKeyPress } />
                <div className="col-sm-2"></div>
              </div>

              <div className="interest-list col-sm-10 col-sm-offset-1">
                <ul>
                {
                  renderProfileInterests
                }

                {
                  renderInterests
                }
                </ul>
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