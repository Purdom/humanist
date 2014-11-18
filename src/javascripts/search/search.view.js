

var $ = require('jquery');
var _ = require('lodash');
var Radio = require('backbone.radio');
var Backbone = require('backbone');
var template = require('./search.tpl');
require('selectize');


module.exports = Backbone.View.extend({


  el: '#search',


  /**
   * Render the template, start Selectize.
   *
   * @param {Object} options
   */
  initialize: function(options) {
    this.data = options;
    this._initRadio();
    this._initSelectize();
  },


  /**
   * Connect to event channels.
   */
  _initRadio: function() {
    this.radio = {
      global: Radio.channel('global')
    };
  },


  /**
   * Start Selectize.
   */
  _initSelectize: function() {

    // Get terms, with empty option.
    var terms = _.keys(this.data.nodes).sort();
    terms.unshift(null);

    // Render the <select>.
    this.$el.html(template({ words: terms }));
    this.select = this.$el.find('select');

    // Start Selectize.
    this.select.selectize();
    this.selectize = this.select[0].selectize;

    this.selectize.on('item_add', _.bind(this.publishSelect, this));
    this.selectize.on('item_remove', _.bind(this.publishUnselect, this));

  },


  /**
   * When a term is selected.
   *
   * @param {String} label
   */
  publishSelect: function(label) {
    this.radio.global.trigger('select', label);
  },


  /**
   * When the input is cleared.
   */
  publishUnselect: function() {
    this.radio.global.trigger('unselect');
  },


  /**
   * Set the current term.
   *
   * @param {String} label
   */
  renderSelect: function(label) {
    this.selectize.setValue(label);
  },


  /**
   * Clear the input.
   */
  renderUnselect: function(label) {
    this.selectize.clear();
  }


});
