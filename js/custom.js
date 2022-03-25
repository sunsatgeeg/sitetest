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

function clickToCopy(element){
    try{value = $(this).val();}catch{};

    if(value == ""){
        try{value = $(this).text();}catch{};
    }

    navigator.clipboard.writeText(value);

    Toastify({
        text: "복사!",
        position: "center",
        gravity: "bottom",
        duration: 1000,
        close: false
    }).showToast();
}

$(function(){
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: url + 'visitor',
    });
});
