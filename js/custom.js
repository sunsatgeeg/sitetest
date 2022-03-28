local = false
var url;
var cookie;
var nocommu = ['bidcalc','craftcalc']
if(local){
    cookie = '들꽃';
    url = "http://127.0.0.1:5000/";
}else{
    cookie = $.cookie('indata');
    url = "https://lochart.ga/";
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
    $('header').find('.nav').append(`          
    <a class="nav-link" aria-current="page" href="/">차트</a>
    <a class="nav-link" aria-current="page" href="mari">마리샵</a>
    <a class="nav-link" aria-current="page" href="secretmap">비밀지도</a>
    <a class="nav-link" aria-current="page" href="bidcalc">경매 계산기</a>
    <a class="nav-link" aria-current="page" href="craftcalc">제작 계산기(미완)</a>
    <a class="nav-link" aria-current="page" href="rewardcalc">더보기 계산기</a>`
    );
    
    $('header').find('.nav-link').filter(function(){
        if($(this).attr('href') == here){
            $(this).addClass('active');
            return;
        }
    })

    if(nocommu.indexOf(here) != -1){
        $.ajax({
            type: 'GET',
            data: here,
            dataType: 'jsonp',
            url: url + 'visitor',
        });
    }
});
