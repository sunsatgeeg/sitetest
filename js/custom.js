var url = "https://loamarketjson.herokuapp.com/";

$.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: url+'other',
    success:function(json) {
        var dropdownMenu = $('.dropdown-menu');
        db_time = String(json['db_refresh_time']);
        for (let i = 0; i < json['items'].length; i++) {
            dropdownMenu.append('<li><a href="#" id="item">' + json['items'][i] + '</a></li>')
        }

        am5.ready(function() {
            if($.cookie('indata') != ""  || $.cookie('indata') != undefined){
                var cookietoast = Toastify({
                    text: "최근 추가한 아이템(들) 불러오는 중...",
                    position: "center",
                    gravity: "bottom",
                    duration: -1,
                    close: false
                }).showToast();
            }
            // Create root element
            // https://www.amcharts.com/docs/v5/getting-started/#Root_element 
            var root = am5.Root.new("chartdiv");
    
            // Set themes
            // https://www.amcharts.com/docs/v5/concepts/themes/ 
            root.setThemes([
                am5themes_Animated.new(root)
            ]);
    
            // Create chart
            // https://www.amcharts.com/docs/v5/charts/xy-chart/
            var chart = root.container.children.push(am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: "panX",
                wheelY: "zoomX",
                maxTooltipDistance: 0,
                background: am5.Rectangle.new(root, {
                    fill: root.interfaceColors.get("alternativeBackground"),
                    fillOpacity: 1
                })
            }));
    
            // Create axes  
            // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
            var xAxis = chart.xAxes.push(am5xy.GaplessDateAxis.new(root, {
                maxDeviation: 0.2,
                baseInterval: {
                    timeUnit: "minute",
                    count: 1
                },
                renderer: am5xy.AxisRendererX.new(root, {})
                //, tooltip: am5.Tooltip.new(root,{})
            }));
            var xRenderer = xAxis.get("renderer");
            xRenderer.labels.template.setAll({
                fill: am5.color(0xffffff),
                fillOpacity: 0.5
            });
            xRenderer.grid.template.setAll({
                stroke: am5.color(0xffffff)
            });
    
            var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {})
            }));
            var yRenderer = yAxis.get("renderer");
            yRenderer.labels.template.setAll({
                fill: am5.color(0xffffff),
                fillOpacity: 0.5
            });
            yRenderer.grid.template.setAll({
                stroke: am5.color(0xffffff)
            });
    
            // Add cursor
            // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
            var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
                behavior: "none"
            }));
            cursor.lineX.setAll({
                stroke: am5.color(0xffffff)
            });
            cursor.lineY.setAll({
                stroke: am5.color(0xffffff)
            });
    
            // Add scrollbar
            // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
            chart.set("scrollbarX", am5.Scrollbar.new(root, {
                orientation: "horizontal"
            }));
    
            // Add legend
            // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
            var legend = chart.rightAxesContainer.children.push(am5.Legend.new(root, {
                width: 325,
                paddingLeft: 15,
                centerY: am5.percent(50),
                y: am5.percent(50),
                height: am5.percent(100),
                verticalScrollbar: am5.Scrollbar.new(root, {
                orientation: "vertical"
                })
            }));
    
            legend.itemContainers.template.set("width", am5.p100);
            legend.valueLabels.template.setAll({
                textAlign: "left"
            });
    
            var indata = [];
    
            function generateChartData(data, len) {
                if(len == undefined){
                    len = 1;
                }
                var chartData = [];
                data.forEach(function(element){
                    var price=element[len];
                    var time=String(element[0]);
                    year=time.slice(0,4);
                    month=Number(time.slice(4,6))-1;
                    day=time.slice(6,8);
                    hour=time.slice(8,10);
                    minute=time.slice(10,12);
    
                    var newDate = new Date(year, month, day, hour, minute).getTime();
    
                    chartData.push({
                        date: newDate,
                        value: price
                    });
                })
                return chartData;
            }
    
            $(".dropdown-toggle").on("click", function(){
                setTimeout(function(){ 
                    $("#myInput").focus(); 
                }, 50 );
            });

            $("#myInput").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                $(".dropdown-menu li").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });

            $(".dropdown-menu li").filter(function() {
                $(this).on("click", function(){
                    $("#myInput").val("");
                    $(".dropdown-menu li").css('display', '');
                    $(".dropdown-menu").scrollTop(0);
                    
                    if(!(indata.includes($(this).text()))){
                        
                        var toast = Toastify({
                            text: $(this).text() + " 불러오는 중...",
                            position: "center",
                            gravity: "bottom",
                            duration: -1,
                            close: false
                        }).showToast();

                        $.ajax({
                            type: 'GET',
                            dataType: 'jsonp',
                            data:{'item':$(this).text()},
                            url: url,
                            success:function(json) {
                                var series = chart.series.push(am5xy.LineSeries.new(root, {
                                    name: json['item'],
                                    xAxis: xAxis,
                                    yAxis: yAxis,
                                    valueYField: "value",
                                    valueXField: "date",
                                    legendLabelText: "[{fill}]{name}[/]",
                                    legendValueText: "[bold {fill}]{value}[/]",
                                    tooltip: am5.Tooltip.new(root, {
                                        pointerOrientation: "horizontal",
                                        labelText: "[[{valueX.formatDate('yy-MM-dd hh:mm')}]]\n{name} : [bold]{valueY}[/]"
                                    })
                                }));
                
                                series.data.setAll(generateChartData(json['data']));
                                legend.data.setAll(chart.series.values);
                                                    
                                var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
                                    behavior: "none"
                                }));
                                cursor.lineX.setAll({
                                    stroke: am5.color(0xffffff)
                                });
                                cursor.lineY.setAll({
                                    stroke: am5.color(0xffffff)
                                });
                
                                chart.series.each(function(chartSeries) {
                                    chartSeries.strokes.template.setAll({
                                        strokeWidth: 3
                                    })
                                });
                                
                                indata.push(json['item']);
                                $.cookie('indata', indata, { expires: 30});

                                toast.hideToast();
                            }
                        });
                    } else {
                        for (var i = 0; i < chart.series.values.length; i++) {
                            if( chart.series.values[i]._settings['name'] == $(this).text() ) {
                                chart.series.removeIndex(i);
                                legend.data.setAll(chart.series.values);
                                
                                for (var i = 0; i < indata.length; i++) {
                                    if ( indata[i] == $(this).text() ){
                                        indata.splice(i, 1);
                                        break;
                                    }
                                }
                                
                                $.cookie('indata', indata, { expires:  30});
    
                                var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
                                    behavior: "none"
                                }));
                                cursor.lineX.setAll({
                                    stroke: am5.color(0xffffff)
                                });
                                cursor.lineY.setAll({
                                    stroke: am5.color(0xffffff)
                                });
                                
                                chart.yAxes.push(am5xy.ValueAxis.new(root, {
                                    renderer: am5xy.AxisRendererY.new(root, {})
                                }));
                            }                   
                        }
                    }
                });
            });
    
            db_year = db_time.slice(0,4);
            db_mon = String(Number(db_time.slice(4,6))-1);
            db_day = db_time.slice(6,8);
            db_hour = db_time.slice(8,10);
            db_min = db_time.slice(10,12);

            chart.children.unshift(am5.Label.new(root, {
                text: "서버 데이터 갱신 시간 : " + db_year + "-" + db_mon + "-" + db_day + " " + db_hour + ":" + db_min,
                fontSize: 15,
                x: 55,
                y: am5.percent(99),
                fill: am5.color(0xffffff)
            }));
    
            
            if($.cookie('indata') != ""){
                //var cookie = '빛나는 신호탄';
                var cookie = $.cookie('indata');
                if(cookie == undefined){
                    return;
                }
                var array = cookie.split(",");
                indata = array;
                $.ajax({
                    type: 'GET',
                    dataType: 'jsonp',
                    data:{'item':cookie},
                    url: url,
                    success:function(json) {
                        var array = json['item'].split(",");
                        if (array.length == 1){
                            var series = chart.series.push(am5xy.LineSeries.new(root, {
                                name: array[0],
                                xAxis: xAxis,
                                yAxis: yAxis,
                                valueYField: "value",
                                valueXField: "date",
                                legendLabelText: "[{fill}]{name}[/]",
                                legendValueText: "[bold {fill}]{value}[/]",
                                tooltip: am5.Tooltip.new(root, {
                                    pointerOrientation: "horizontal",
                                    labelText: "[[{valueX.formatDate('yy-MM-dd hh:mm')}]]\n{name} : [bold]{valueY}[/]"
                                })
                            }));
                            series.data.setAll(generateChartData(json['data'],i));
                        }
                        for (var i = 1; i < array.length; i++) {
                            var series = chart.series.push(am5xy.LineSeries.new(root, {
                                name: array[i],
                                xAxis: xAxis,
                                yAxis: yAxis,
                                valueYField: "value",
                                valueXField: "date",
                                legendLabelText: "[{fill}]{name}[/]",
                                legendValueText: "[bold {fill}]{value}[/]",
                                tooltip: am5.Tooltip.new(root, {
                                    pointerOrientation: "horizontal",
                                    labelText: "[[{valueX.formatDate('yy-MM-dd hh:mm')}]]\n{name} : [bold]{valueY}[/]"
                                })
                            }));
                            series.data.setAll(generateChartData(json['data'],i));
                        }
                        legend.data.setAll(chart.series.values);
                                                
                        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
                            behavior: "none"
                        }));
                        cursor.lineX.setAll({
                            stroke: am5.color(0xffffff)
                        });
                        cursor.lineY.setAll({
                            stroke: am5.color(0xffffff)
                        });
    
                        chart.series.each(function(chartSeries) {
                            chartSeries.strokes.template.setAll({
                                strokeWidth: 3
                            })
                        });
                        cookietoast.hideToast();
                    }
                });
            } 
            
            // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            chart.appear(1000, 100);
        });


    }
});