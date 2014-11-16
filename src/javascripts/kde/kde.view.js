

var $ = require('jquery');
var _ = require('lodash');
var d3 = require('d3-browserify');
var Backbone = require('backbone');
var data_graphic = require('mg');
var config = require('../config');


module.exports = Backbone.View.extend({


  el: '#kde',


  /**
   * Render a KDE plot.
   *
   * @param {String} label
   */
  show: function(label) {

    $.getJSON('kde/'+label+'.json', function(kde) {

      // Cast ISO strings -> dates.
      kde = _.map(kde, function(datum) {
        datum.date = new Date(datum.date);
        return datum;
      });

      var xFormat = d3.time.format('%y');

      // Update chart.
      data_graphic({

        target: '#kde',
        data: kde,
        x_accessor: 'date',
        y_accessor: 'value',
        area: false,
        y_axis: false,
        width: 400,
        height: 140,
        left: 10,
        right: 10,

        show_years: false,
        xax_count: 10,
        xax_format: function(d) {
          return xFormat(d);
        }

      });

    });

  }


});