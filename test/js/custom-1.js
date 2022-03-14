$(function(){
  am5.ready(function() {
    /**
     * ---------------------------------------
     * This demo was created using amCharts 5.
     *
     * For more information visit:
     * https://www.amcharts.com/
     *
     * Documentation is available at:
     * https://www.amcharts.com/docs/v5/
     * ---------------------------------------
     */

    // =========================================================
    // Setting up the chart
    // =========================================================

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("candlechartdiv");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      layout: root.verticalLayout,
      background: am5.Rectangle.new(root, {
          fill: root.interfaceColors.get("alternativeBackground"),
          fillOpacity: 1
      })
    }));

    chart.get("colors").set("step", 2);


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var valueAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {
        inside: true
      }),
      height: am5.percent(70)
    }));
    

    valueAxis.get("renderer").labels.template.setAll({
      centerY: am5.percent(100),
      maxPosition: 0.98
    });

    valueAxis.axisHeader.children.push(am5.Label.new(root, {
      text: "Value",
      fontWeight: "bold",
      paddingBottom: 5,
      paddingTop: 5
    }));
    var yRenderer = valueAxis.get("renderer");
            yRenderer.labels.template.setAll({
                fill: am5.color(0xffffff),
                fillOpacity: 0.5
            });
            yRenderer.grid.template.setAll({
                stroke: am5.color(0xffffff)
            });

    var dateAxis = chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
      groupData: true,
      maxDeviation: 1,
      baseInterval: { timeUnit: "minute", count: 30 },
      renderer: am5xy.AxisRendererX.new(root, {}),
      tooltip: am5.Tooltip.new(root, {})
    }));

    dateAxis.get("renderer").labels.template.setAll({
      minPosition: 0.01,
      maxPosition: 0.99
    });
    var xRenderer = dateAxis.get("renderer");
      xRenderer.labels.template.setAll({
        fill: am5.color(0xffffff),
        fillOpacity: 0.5
    });
    xRenderer.grid.template.setAll({
        stroke: am5.color(0xffffff)
    });

    var color = root.interfaceColors.get("background");

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var valueSeries = chart.series.push(
      am5xy.CandlestickSeries.new(root, {
        fill: color,
        clustered: false,
        calculateAggregates: true,
        stroke: color,
        name: "STCK",
        xAxis: dateAxis,
        yAxis: valueAxis,
        valueYField: "close",
        openValueYField: "open",
        lowValueYField: "low",
        highValueYField: "high",
        valueXField: "date",
        lowValueYGrouped: "low",
        highValueYGrouped: "high",
        openValueYGrouped: "open",
        valueYGrouped: "close",
        legendValueText: "open: {openValueY} low: {lowValueY} high: {highValueY} close: {valueY}",
        legendRangeValueText: "{valueYClose}"
      })
    );

    var valueTooltip = valueSeries.set("tooltip", am5.Tooltip.new(root, {
      getFillFromSprite: false,
      getStrokeFromSprite: true,
      getLabelFillFromSprite: true,
      autoTextColor: false,
      pointerOrientation: "horizontal",
      labelText: "{name}: {valueY} {valueYChangePreviousPercent.formatNumber('[#00ff00]+#,###.##|[#ff0000]#,###.##|[#999999]0')}%"
    }));
    valueTooltip.get("background").set("fill", root.interfaceColors.get("background"));


    // Add legend to axis header
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-headers/
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    var valueLegend = valueAxis.axisHeader.children.push(
      am5.Legend.new(root, {
        useDefaultMarker: true
      })
    );
    valueLegend.data.setAll([valueSeries]);


    // Stack axes vertically
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Stacked_axes
    chart.leftAxesContainer.set("layout", root.verticalLayout);


    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}))
    cursor.lineX.setAll({
      stroke: am5.color(0xffffff)
    });
    cursor.lineY.setAll({
        stroke: am5.color(0xffffff)
    });


    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    var scrollbar = chart.set("scrollbarX", am5xy.XYChartScrollbar.new(root, {
      orientation: "horizontal",
      height: 50
    }));

    var sbDateAxis = scrollbar.chart.xAxes.push(am5xy.DateAxis.new(root, {
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {})
    }));

    var sbValueAxis = scrollbar.chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    var sbSeries = scrollbar.chart.series.push(am5xy.LineSeries.new(root, {
      valueYField: "close",
      valueXField: "date",
      xAxis: sbDateAxis,
      yAxis: sbValueAxis
    }));

    sbSeries.fills.template.setAll({
      visible: true,
      fillOpacity: 0.3
    });


    // =========================================================
    // Data loading
    // =========================================================
    
    // actual data loading and handling when it is loaded
    function loadData(unit, unitCount) {
      // Load external data
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Setting_data

      item = $('#selectItem').val();
      if(item == ""){
        alert('아이템을 선택해주세요');
      }

      var toast = Toastify({
        text: $(this).text() + ` 불러오는 중...`,
        position: "center",
        gravity: "bottom",
        duration: -1,
        close: false
      }).showToast();

      var url = "http://127.0.0.1:5000/candle_date?item=" + item + "&unitCount=" + unitCount;
      
      if(unit == 'minute'){
        second = 60
      }else if(unit == 'hour'){
        second = 3600;
      }else if(unit == 'day'){
        second = 86400;
      }else if(unit == 'week'){
        second = 604800;
      }else if(unit == 'month'){
        second = ????;
      }

      unitCount = unitCount/second;

      // Handle loaded data
      $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: url,
        success:function(json) {
          data = json['data'];
          
          // change base interval if it's different
          dateAxis.set("baseInterval", { timeUnit: unit, count: unitCount });
          sbDateAxis.set("baseInterval", { timeUnit: unit, count: unitCount });

          valueSeries.data.setAll(data);
          sbSeries.data.setAll(data);

          dateAxis.zoom(0, 1, 0);
          toast.hideToast();
        }
      });
    }

    // Button handlers
    var activeButton = $('#btn_1h');
    $('#btn_30m').on("click", function() {
      if (currentUnit != "30minute") {
        setActiveButton($(this));
        currentUnit = "30minute";
        loadData("minute", 1800);
      }
    });

    $('#btn_1h').on("click", function() {
      if (currentUnit != "1hour") {
        setActiveButton($(this));
        currentUnit = "1hour";
        loadData("hour", 3600);
      }
    });

    $('#btn_6h').on("click", function() {
      if (currentUnit != "6hour") {
        setActiveButton($(this));
        currentUnit = "6hour";
        loadData("hour", 21600);
      }
    });

    $('#btn_1d').on("click", function() {
      if (currentUnit != "1day") {
        setActiveButton($(this));
        currentUnit = "1day";
        loadData("day", 86400);
      }
    });

    var currentUnit = "1hour";

    function setActiveButton(button) {
      if (activeButton) {
        $(activeButton).removeClass("active");
      }
      activeButton = button;
      $(button).addClass("active");
    }

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 500);
  });
});