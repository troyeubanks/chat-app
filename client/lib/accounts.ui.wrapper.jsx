AccountsUIWrapper = React.createClass({
  componentDidMount: function() {
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
  },

  componentWillUnmount: function() {
    Blaze.remove(this.view);
  },

  render: function() {
    return <span ref="container" />;
  }
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});