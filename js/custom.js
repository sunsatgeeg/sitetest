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
        url: url + 'visitor',
    });
});