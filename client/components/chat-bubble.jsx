ChatBubble = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState: function () {
    return {};
  },

  getMeteorData: function() {
    return {
      chat: ChatCollection.findOne({ _id: this.props.chatId })
    };
  },

  toggleFavorite: function(e) {
    e.stopPropagation();
    console.log('favorite clicked');
  },

  joinChat: function(e) {
    e.preventDefault();

    Meteor.call('joinChat', this.data.chat._id, function(error) {
      if (error) {
        console.error(error);
      }
    });

  },

  render: function() {

    var masonryOptions = {
      transitionDuration: 0
    };

    return (
      <div className="bubble-tray col-sm-3">
        <div className="chat-bubble"
             onClick={ this.joinChat }>
          <div className="bubble-image">
            <img src={ this.data.chat.image } />
          </div>

          <hr />

          <div className="favorite"
               onClick={ this.toggleFavorite }>
            &#9734;
          </div>

          <div className="bubble-interest">
            <h2>{ this.data.chat.topic }</h2>
          </div>
        </div>
      </div>
    )
  }
});