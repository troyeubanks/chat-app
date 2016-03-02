ChatTabs = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState: function() {
    return {};
  },

  getMeteorData: function() {
    return {};
  },

  handleClick: function( tab ) {
    this.props.changeTab(tab)
  },

  render: function() {
    return (
      <div className="tab-container">
        {
          this.props.tabList ?
            this.props.tabList.map( (tab) => {
              return (
                <Tab key={ tab._id }
                     handleClick={ this.handleClick.bind(this, tab) }
                     isCurrent={ (this.props.currentTab === tab._id) } />

              )
            }) : ''

        }
      </div>
    )
  }
});