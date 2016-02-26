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

  render: function() {
    return (
      <div className="bubble-tray col-sm-3">
        <div className="chat-bubble">
          <div className="bubble-image">
            <img src={ this.data.chat.image } />
          </div>

          <hr />

          <div className="favorite">
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