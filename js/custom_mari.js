local = false
var url;
var cookie;
if(local){
    cookie = '들꽃';
    url = "http://127.0.0.1:5000/";
}else{
    cookie = $.cookie('indata');
    url = "https://loamarketjson.herokuapp.com/";
}

$(function(){
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: url + 'mari',
        success: function(json) {
            var newtime = [];
            var prevtime = [];
            var lasttime = [];

            var temparr = [];
            for (var i = 0; i < json.length; i++) {
                temparr.push(json[i]);
                if(temparr.length == 6){
                    if(newtime.length == 0){
                        newtime = temparr;
                    }else if(prevtime.length == 0){
                        prevtime = temparr;
                    }else{
                        lasttime = temparr;
                    }
                    temparr = [];
                }
            }
            console.log(newtime);
            console.log(prevtime);
            console.log(lasttime);

            var th = "";
            var untilwhen = "";
            var untilwhenday = "";
            var untilwhenhour = "";
            untilwhen = String(newtime[0]['untilwhen']);
            untilwhenday = untilwhen.slice(0,2);
            untilwhenhour = untilwhen.slice(-2);
            $("#newtime").text(untilwhenday + "일 " + untilwhenhour + "시까지 판매");
            untilwhen = String(prevtime[0]['untilwhen']);
            untilwhenday = untilwhen.slice(0,2);
            untilwhenhour = untilwhen.slice(-2);
            $("#prevtime").text(untilwhenday + "일 " + untilwhenhour + "시까지 판매");
            untilwhen = String(lasttime[0]['untilwhen']);
            untilwhenday = untilwhen.slice(0,2);
            untilwhenhour = untilwhen.slice(-2);
            $("#lasttime").text(untilwhenday + "일 " + untilwhenhour + "시까지 판매");


        }
    });
});