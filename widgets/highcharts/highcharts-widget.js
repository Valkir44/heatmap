class CustomHighchartsWidgetCtrl {
  seriesData = [["Actual",-214569.02804853008,-105928.24112864747,6825.64149834103,-4314.147215432423,866378.2837408222,-204590.33887112237],["Budget",-352171.14227059274,-98795.9712060611,238.1234837768164,238.1234837768164,1512416.8967751563,-202891.60255816544],["Last Year",-309116.6502055696,-124991.3211540927,7183.136080128785,-4540.101692374503,-525266.1946542066,-244072.0727683794]];
  xAxisCategories = ['Executive General and Administration', 'Inventory Management', 'Manufacturing', 'Quality Assurance', 'Sales and Marketing', 'Research and Development'];
  yAxisCategories = ['Actual', 'Budget', 'Last Year'];
  minDataValue = -525266.1946542066;

  $onInit() {
    prepareSeriesData(this.seriesData, this.xAxisCategories, this.yAxisCategories, this.minDataValue)
  }
}

function getPointCategoryName(point, dimension) {
  var series = point.series,
    isY = dimension === 'y',
    axis = series[isY ? 'yAxis' : 'xAxis'];
  return axis.categories[point[isY ? 'y' : 'x']];
}

function prepareSeriesData(seriesData, xAxisCategories, yAxisCategories, minDataValue) {
  if (!seriesData) {
    return [];
  }
  const newSeriesData = seriesData.map(arr => arr.slice());
  const transformedSeriesData = newSeriesData.map((seriesDataElement, mainIndex) => {
    return {
      name: seriesDataElement.splice(0, 1).toString(),
      data: seriesDataElement.map((uniqueElement, subIndex) => [subIndex, mainIndex, uniqueElement]),
      dataLabels: {
        enabled: true
      }
    }
  })
  addCustomHighchartsWidget(xAxisCategories, yAxisCategories, minDataValue, transformedSeriesData);
}

function chartOptions() {
  return {
    type: 'heatmap',
    marginTop: 80,
    marginBottom: 80,
    marginRight: 100,
    plotBorderWidth: 1
  }
}

function legendOptions() {
  return {
    align: 'right',
    layout: 'vertical',
    margin: 0,
    verticalAlign: 'top',
    y: 25,
    x: -15,
    symbolHeight: 280
  }
}

function responsiveRuleOptions() {
  return {
    rules:[{
      condition: {maxWidth: 1100},
      chartOptions: {
        chart: {
          marginRight: 20,
          marginBottom: 20,
        },
        legend: {enabled: false},
        plotOptions: {
          series: {
            dataLabels: {
              style: {display: 'none'}
            }
          }
        }
      }
    },
      {
        condition: {maxWidth: 678},
        chartOptions: {
          xAxis: {
            labels: {
              formatter: function () {
                return this.value.charAt(0);
              }
            }
          },
          chart: {
            marginRight: 20,
            marginBottom: 20,
          },
          legend: {enabled: false},
          plotOptions: {
            series: {
              dataLabels: {
                style: {display: 'none'}
              }
            }
          }
        }
      }]
  }
}

function addCustomHighchartsWidget(xAxisCategories, yAxisCategories, minDataValue, transformedSeriesData) {
  Highcharts.chart('customHighchartsWidget', {
    chart: chartOptions(),
    title: {
      text: 'Custom Highcharts Widget'
    },
    credits: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    xAxis: {
      categories: xAxisCategories,
      opposite: true
    },
    yAxis: {
      categories: yAxisCategories,
      title: null
    },
    series: transformedSeriesData,
    accessibility: {
      point: {
        descriptionFormatter: function (point) {
          var ix = point.index + 1,
            xName = getPointCategoryName(point, 'x'),
            yName = getPointCategoryName(point, 'y'),
            val = point.value;
          return ix + '. ' + xName + ' sales ' + yName + ', ' + val + '.';
        }
      }
    },
    colorAxis: {
      min: minDataValue,
      maxColor: Highcharts.getOptions().colors[0]
    },
    legend: legendOptions(),
    tooltip: {
      formatter: function () {
        return '<b>' + getPointCategoryName(this.point, 'x') + '</b> sold <br><b>' +
          this.point.value + '</b> items on <br><b>' + getPointCategoryName(this.point, 'y') + '</b>';
      }
    },
    responsive: responsiveRuleOptions()
  });
}

angular.module('DemoApp').component('customHighchartsWidget', {
  templateUrl: 'widgets/highcharts/highcharts-widget.html',
  controller: CustomHighchartsWidgetCtrl
})