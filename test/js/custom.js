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
        fill: am5.color(0x000000)
      }),
      height: am5.percent(70)
    }));
    

    valueAxis.get("renderer").labels.template.setAll({
      centerY: am5.percent(100),
      maxPosition: 0.98
    });

    valueAxis.axisHeader.children.push(am5.Label.new(root, {
      text: "거래소 최저가",
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
        name: "",
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
        legendValueText: "시가: {openValueY}    저점: {lowValueY}    고점: {highValueY}    종가: {valueY}",
        legendRangeValueText: "{valueYClose}"
      })
    );

    var valueTooltip = valueSeries.set("tooltip", am5.Tooltip.new(root, {
      getFillFromSprite: false,
      getStrokeFromSprite: true,
      getLabelFillFromSprite: true,
      autoTextColor: false,
      pointerOrientation: "horizontal",
      labelText: "{valueY} {valueYChangePreviousPercent.formatNumber('[#009400]+#,###.##|[#820000]#,###.##|[#999999]0')}%"
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
    function loadData(unit) {
      // Load external data
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Setting_data
      console.log(unit);
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
      
      var url = "http://127.0.0.1:5000/candle_date?item=" + item + "&unit=" + unit;
      var unitCount = 0;
      //15분, 30분, 1시간, 3시간, 6시간, 12시간, 1일, 1주, 1달
      if(unit == '30m'){
        unit = "minute";
        unitCount = 30;
      }else if(unit == '1h'){
        unit = "hour";
        unitCount = 1;
      }else if(unit == '3h'){
        unit = "hour";
        unitCount = 3;
      }else if(unit == '6h'){
        unit = "hour";
        unitCount = 6;
      }else if(unit == '12h'){
        unit = "hour";
        unitCount = 12;
      }else if(unit == '1d'){
        unit = "day";
        unitCount = 1;
      }else if(unit == '1w'){
        unit = "day";
        unitCount = 7;
      }else if(unit == '1M'){
        unit = "month";
        unitCount = 1;
      }
      
      // Handle loaded data
      $.ajax({
        type: 'POST',
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
    var activeButton;
    $("#candleBtn button").filter(function() {
      $(this).on("click", function() {
        btnid = $(this).attr('id');
        if (currentUnit != btnid) {
          setActiveButton($(this));
          currentUnit = btnid;
          loadData(btnid);
        }
      });
    });

    var currentUnit = "";

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