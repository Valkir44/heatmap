class CustomHandsontableWidgetCtrl {

  $onInit() {
    this.colHeaders = ['Version', 'Executive General and Administration', 'Inventory Management', 'Manufacturing', 'Quality Assurance', 'Sales and Marketing', 'Research and Development'];
    this.tableData = [['Actual', -214569.02804853008, -105928.24112864747, 6825.64149834103, -4314.147215432423, 866378.2837408222, -204590.33887112237], ['Budget', -352171.14227059274, -98795.9712060611, 238.1234837768164, 238.1234837768164, 1512416.8967751563, -202891.60255816544], ['Last Year', -309116.6502055696, -124991.3211540927, 7183.136080128785, -4540.101692374503, -525266.1946542066, -244072.0727683794]];
    this.add(this.colHeaders, this.tableData);
  }

  add(colHeaders, tableData) {
    let container = document.getElementById('customHandsontableWidget');
    new Handsontable(container, {
      data: tableData,
      colHeaders: colHeaders,
      columns: [
        {
          type: 'numeric'
        },
        {
          type: 'numeric',
          format: '0,0',
          renderer: this.heatmapRenderer
        },
        {
          type: 'numeric',
          format: '0,0',
          renderer: this.heatmapRenderer
        },
        {
          type: 'numeric',
          format: '0,0',
          renderer: this.heatmapRenderer
        },
        {
          type: 'numeric',
          format: '0,0',
          renderer: this.heatmapRenderer
        },
        {
          type: 'numeric',
          format: '0,0',
          renderer: this.heatmapRenderer
        },
        {
          type: 'numeric',
          format: '0,0',
          renderer: this.heatmapRenderer
        },
      ]
    });
  }

  heatmapRenderer = (instance, td, row, col, prop, value, cellProperties) => {
    Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, cellProperties]);
    let color = getColor(value, minMaxRowValue(this.tableData[row]).min, minMaxRowValue(this.tableData[row]).max);
    td.style.backgroundColor = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ',' + 0.7 + ')';
    td.style.textAlign = 'right';
    td.style.fontWeight = 'bold';
    td.style.color = 'white';
  }
}

function getColor(v, min, max) {

  function getC(f, l, r) {
    return {
      r: Math.floor((1 - f) * l.r + f * r.r),
      g: Math.floor((1 - f) * l.g + f * r.g),
      b: Math.floor((1 - f) * l.b + f * r.b),
    };
  }

  let left = {r: 255, g: 0, b: 0},
    middle = {r: 0, g: 255, b: 0},
    right = {r: 0, g: 0, b: 255},
    mid = (max - min) / 2;
  return v < min + mid ?
    getC((v - min) / mid, left, middle) :
    getC((v - min - mid) / mid, middle, right);
}

function minMaxRowValue(row) {
  const newRow = row.slice(1);
  return {
    min: Math.min(...newRow),
    max: Math.max(...newRow)
  }
}

function setColor(row) {
  row.forEach(a => {
    let color = this.getColor(a, this.minMaxRowValue(row).min, this.minMaxRowValue(row).max);
    return 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
  });
}

angular.module('DemoApp').component('customHandsontableWidget', {
  templateUrl: 'widgets/handsontable/handsontable-widget.html',
  controller: CustomHandsontableWidgetCtrl,
  bindings: {}
})