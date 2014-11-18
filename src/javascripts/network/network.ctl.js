

var Controller = require('radio.controller');
var Network = require('./network.view');


module.exports = Controller.extend({


  events: {

    global: {
      highlight: 'highlight',
      unhighlight: 'unhighlight',
      select: 'select',
      unselect: 'unselect'
    },

    minimap: {
      center: 'minimapFocus'
    },

    router: {
      xyz: 'routerFocus'
    }

  },


  /**
   * Start the view.
   *
   * @param {Object} data
   */
  initialize: function(data) {
    this.view = new Network(data);
  },


  /**
   * Render highlights.
   *
   * @param {String} label
   */
  highlight: function(label) {
    this.view.renderHighlight(label);
  },


  /**
   * Render (and propagate) selections.
   *
   * @param {String} label
   */
  select: function(label) {
    this.view.renderSelect(label);
    this.view.focusOnWord(label, true);
  },


  /**
   * Render (and propagate) unselections.
   */
  unselect: function() {
    this.view.renderUnselect();
  },


  /**
   * Render unhighlights.
   */
  unhighlight: function() {
    this.view.renderUnhighlight();
  },


  /**
   * Mirror the minimap position.
   *
   * @param {Object} center
   */
  minimapFocus: function(center, animate) {
    this.view.focusOnXYZ(center, animate);
  },


  /**
   * Apply a :x/:y/:z route.
   *
   * @param {Object} center
   */
  routerFocus: function(center) {
    this.view.focusOnXYZ(center, true);
  }


});
