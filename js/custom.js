local = false
var url;
var cookie;
var nocommu = ['bidcalc','craftcalc']
if(local){
    cookie = '들꽃';
    url = "http://127.0.0.1:5000";
}else{
    cookie = $.cookie('indata');
    url = "https://lochart.ga";
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
    var servererror = true;
    if(!(servererror)){
        $('head').append(`
        <!-- temp ADfit -->
        <script src="//t1.daumcdn.net/kas/static/ba.min.js" async></script>
        `);
    }
    if(servererror){
        $('main').children().prepend(`
        <hr>
        <div class="clearfix">
            <h1>현재 집에서 돌리고 있는 db 서버가 연결되지 않네요;;<br> 원인이 인터넷 연결이 끊어져있는데 갑자기?;;<br>출근길에 돌아가고 있는 것도 확인됐었는데<br> 19시 즈음에 퇴근하고 집에 도착해서<br> 인터넷 끊긴 원인 찾고 복구하겠습니다...</h1>
        </div>
        <hr>
        `);
    }
    
    $('header').find('.nav').append(`          
    <a class="nav-link" aria-current="page" href="/">차트</a>
    <a class="nav-link" aria-current="page" href="mari">마리샵</a>
    <a class="nav-link" aria-current="page" href="secretmap">비밀지도</a>
    <a class="nav-link" aria-current="page" href="bidcalc">경매 계산기</a>
    <a class="nav-link" aria-current="page" href="craftcalc">제작 계산기(미완)</a>
    <a class="nav-link" aria-current="page" href="rewardcalc">더보기 계산기</a>
    `);
    
    $('header').find('.nav-link').filter(function(){
        if($(this).attr('href') == here){
            $(this).addClass('active');
            return;
        }
    })

    if(nocommu.indexOf(here) != -1){
        $.ajax({
            type: 'POST',
            url: url + '/visitor',
            data: here,
        });
    }
});
