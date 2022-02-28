local = false
if(local){
    var cookie = '';
    var url = "http://192.168.219.101:5000/";
}else{
    var cookie = $.cookie('indata');
    var url = "https://loamarketjson.herokuapp.com/";
}

$(function(){
    Toastify({
        text: "무료로 서버 빌려서 돌리는거라 데이터 통신 속도가 많이 느립니다\n\n그리고 시세 데이터가 대략 3개월? 정도 밖에 안 모였는데도 데이터 불러오는데 2~3초 기다려야하는데\n1년 데이터 불러오면 대충 아이템 1개 불러올때마다 20초?\n\n그래서 나중에는 못쓸정도로 생각해 광고 넣어서 빠른시간안에 더 좋은 서버 구할예정이여서 양해바랍니다...\n\n그리고 아직 무료서버라 트래픽 많이 몰리고, 만든지 얼마안되서\n개선할때 잠깐 상태 안좋아질 수 있습니다.　　　　　　　　　　　　　　　　　　　　　　　　닫기",
        position: "center",
        gravity: "bottom",
        duration: -1,
        close: true
    }).showToast();
});

$.ajax({
    type: 'GET',
    dataType: 'jsonp',
    url: url+'other',
    success:function(json) {
        var dropdownMenu = $('.dropdown-menu');
        db_time = String(json['db_refresh_time']);

        for (let i = 0; i < json['items'].length; i++) {
            dropdownMenu.append('<li><a id="item">' + json['items'][i] + '</a></li>');
        }

        am5.ready(function() {
            if(!($.cookie('indata') == ""  || $.cookie('indata') == undefined)){
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
                    count: 5
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
                paddingLeft: 15
            }));
    
            legend.itemContainers.template.set("width", am5.p100);
            legend.valueLabels.template.setAll({
                textAlign: "left"
            });
            
            db_year = db_time.slice(0,4);
            db_mon = db_time.slice(4,6);
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
            
            function generateChartData(data) {
                chartData = [];
                for (var i = 0; i < data.length; i++) {
                    tempdict = {}
                    for (var j = 1; j < data[i].length; j++) {
                        if(data[i][j] == null){
                            continue;
                        }
                        if(Object.keys(tempdict).length == 0){
                            var time = String(data[i][0]);
                            year = time.slice(0,4);
                            month = Number(time.slice(4,6))-1;
                            day = time.slice(6,8);
                            hour = time.slice(8,10);
                            minute = time.slice(10,12);
                            var newDate = new Date(year, month, day, hour, minute).getTime();
                            tempdict['date'] = newDate;
                        }
                        tempdict[j] = data[i][j];
                    }
                    if(Object.keys(tempdict).length != 0){
                        chartData.push(tempdict);
                    }
                }
            }

            function makeSeries(name, field){
                name = name.replace("null,", "");
                var series = chart.series.push(am5xy.SmoothedXLineSeries.new(root, {
                    name: name.trim().replace("[","[[").replace("]","]]"),
                    xAxis: xAxis,
                    yAxis: yAxis,
                    valueYField: field,
                    valueXField: "date",
                    locationX: 0,
                    connect: false,
                    legendLabelText: "[{fill}]{name}[/]",
                    legendValueText: "[bold {fill}]{valueY}[/]",
                    tooltip: am5.Tooltip.new(root, {
                        pointerOrientation: "horizontal",
                        labelText: "[[{valueX.formatDate('yy-MM-dd')}({valueX.formatDate('EEE')}) {valueX.formatDate('HH:mm')}]]\n{name} : [bold]{valueY}[/]"
                    })
                }));
                series.strokes.template.setAll({
                    strokeWidth: 3
                });
                series.data.setAll(chartData);
                legend.data.push(series);
            }

            $(".dropdown-toggle").on("click", function(){
                setTimeout(function(){ 
                    $("#myInput").focus(); 
                }, 50);
            });

            $("#myInput").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                $(".dropdown-menu li").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });

            $(".dropdown-menu li").on("mouseover", function(){
                $(this).css("cursor", "pointer");
            });

            var indata = [];
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
                                generateChartData(json['data']);
                                makeSeries(json['item'], 1);

                                indata.push(json['item'].replace("null,",""));
                                $.cookie('indata', indata, { expires: 30});

                                toast.hideToast();
                            }
                        });
                    } else {
                        for (var i = 0; i < chart.series.values.length; i++) {
                            if(chart.series.values[i]._settings['name'] == $(this).text()) {
                                chart.series.removeIndex(i);
                                legend.data.setAll(chart.series.values);
                                
                                for (var i = 0; i < indata.length; i++) {
                                    if(indata[i] == $(this).text()){
                                        indata.splice(i, 1);
                                        break;
                                    }
                                }
                                $.cookie('indata', indata, { expires:  30});
                            }                   
                        }
                    }
                });
            });
            
            if($.cookie('indata') != ""){
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
                        generateChartData(json['data']);

                        for (var i = 1; i < array.length; i++) {
                            makeSeries(array[i], i);
                        }

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