var nocommu = ['bidcalc','cardcalc','/','simulation','simulation_jewel','simulation_card_legendary_dark','simulation_card_legendary',
'simulation_card_LegendaryToEpic','simulation_card_LegendaryToRare','simulation_card_LegendaryToUncommon','simulation_card_all']

function delCookie(cname){
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function clickToCopy(){
    try{value = this.value;}catch{};

    if(value == undefined){
        try{value = this.innerText;}catch{};
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

var servererror = false;
if(servererror){
    document.querySelector('body').removeChild(document.querySelector('body').firstChild)
    document.querySelector('main').innerHTML = `
    <hr>
    <div class="clearfix">
        <h1>현재 집에서 돌리고 있는 db 서버가 연결되지 않네요;;<br> 원인이 인터넷 연결이 끊어져있는데 갑자기?;;<br>출근길에 돌아가고 있는 것도 확인됐었는데<br> 19시 즈음에 퇴근하고 집에 도착해서<br> 인터넷 끊긴 원인 찾고 복구하겠습니다...</h1>
    </div>
    <hr>
    `;
}

document.querySelector('header .nav').innerHTML = `          
    <a class="nav-link" aria-current="page" href="/">Home</a>
    <a class="nav-link" aria-current="page" href="chart">차트</a>
    <a class="nav-link" aria-current="page" href="mari">마리샵</a>
    <a class="nav-link" aria-current="page" href="secretmap">비밀지도</a>
    <a class="nav-link" aria-current="page" href="bidcalc">경매 계산기</a>
    <a class="nav-link" aria-current="page" href="craftcalc">제작 계산기</a>
    <a class="nav-link" aria-current="page" href="rewardcalc">더보기 계산기</a>
    <a class="nav-link" aria-current="page" href="cardcalc">도감작 계산기</a>
    <a class="nav-link" aria-current="page" href="simulation">시뮬레이션</a>
    <a class="nav-link" aria-current="page" href="sasagefind">사사게 검색기(재운영)</a>
`;

document.querySelectorAll('header .nav-link').forEach(function(e){
    if(e.getAttribute('href') == here){
        e.classList.add('active');
        return;
    }
});

try{
    if(nocommu.indexOf(here) != -1){
        bodydata = new FormData();
        bodydata.append(here,"")
        fetch(url + '/visitor', {
            method: 'POST',
            body: bodydata
        });
    }
}catch{
    
}

