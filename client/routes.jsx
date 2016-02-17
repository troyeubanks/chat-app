FlowRouter.route('/', {
  name: "root",

  action: function( params, queryParams ) {
    ReactLayout.render(App, { content: <LandingPage />})
  }
});

FlowRouter.route('/profile', {
  name: "profile",

  action: function( params, queryParams ) {
    ReactLayout.render(App, { content: <Profile { ...params } />});
  }
});

FlowRouter.route('/userlist', {
  name: "userlist",

  action: function( params, queryParams ) {
    ReactLayout.render(App, { content: <UserList { ...params } />});
  }
});