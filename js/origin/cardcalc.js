var recommendExp;
var recommendCard;
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

bonusDamageBtns = document.querySelectorAll('#bonusdamageBtns button');
bonusDamageBtns.forEach(function(e){
    e.addEventListener('click', function(){
    bonusDamageBtns.forEach(function(f){
        if(f.classList.contains('active')){
        f.classList.remove('active');
        return false;
        }
    })
    e.classList.add('active');

    target = document.querySelector('#bookstbody');
    while (target.hasChildNodes()) {
        target.removeChild(target.firstChild);
    }

    try{
        targetLength = recommendExp[this.innerText].length;
    }catch{
        return;
    }

    var tooltipcontent;
    for (var i = 0; i < targetLength; i++) {
        tr = document.createElement('tr');
        tdsetname = document.createElement('td');
        tdsetexp = document.createElement('td');

        exp = recommendExp[this.innerText][i][Object.keys(recommendExp[this.innerText][i])];
        if(exp == 0) continue;
        
        tdsetname.textContent = Object.keys(recommendExp[this.innerText][i]);
        tdsetexp.textContent = (recommendExp[this.innerText][i][Object.keys(recommendExp[this.innerText][i])]).toLocaleString();

        targetTri = "";
        let list;

        document.querySelectorAll('#bonusdamageBtns button').forEach(function(g){
        if(g.classList.contains('active')){
            targetTri = g.innerText;
            return false;
        }
        })

        recommendCard[targetTri].forEach(function(g){
        if(Object.keys(g)[0] == tdsetname.innerText){
            list = g[Object.keys(g)[0]];
            return false;
        }
        });

        tooltipcontent = "<FONT SIZE='5pt'>"
        tempdict = {};
        for (var j = 0; j < list.length; j++) {
        if(tempdict[list[j][0]] == undefined) tempdict[list[j][0]] = [0,0];
        needcard = tempdict[list[j][0]][1] + (cardLevelUpExp[cardgrade[list[j][0]]].indexOf(list[j][1]) + 1);
        star = tempdict[list[j][0]][0];
        star++;
        tempdict[list[j][0]] = [star,needcard]; 
        }

        for (var j = 0; j < Object.keys(tempdict).length; j++) {
        tooltipcontent += `${Object.keys(tempdict)[j]} +${tempdict[Object.keys(tempdict)[j]][0]}각(${tempdict[Object.keys(tempdict)[j]][1]}장)<br>`;
        }

        tdsetexp.setAttribute('tooltipcontent',tooltipcontent);
        tr.setAttribute('data',JSON.stringify(tempdict));

        tr.append(tdsetname);
        tr.append(tdsetexp);
        tr.style.cursor = 'pointer';
        target.appendChild(tr);
    }
    
    tippy('#bookstbody > tr > td:nth-child(2)', {
        allowHTML: true, 
        content(reference) {
        return reference.getAttribute('tooltipcontent');
        },
        theme: 'light', 
        placement: 'top',
    });

    document.querySelectorAll('#bookstbody > tr').forEach(function(e){
        e.addEventListener('click', function(){
        data = this.getAttribute('data');
        parsedata = JSON.parse(data);

        for (var i = 0; i < Object.keys(parsedata).length; i++) {
            carddeck[Object.keys(parsedata)[i]] = carddeck[Object.keys(parsedata)[i]] + parsedata[Object.keys(parsedata)[i]][0];
        }

        cardsetcalcstart();

        target = document.querySelector('#bookstbody');
        while (target.hasChildNodes()) {
            target.removeChild(target.firstChild);
        }

        bonusDamageBtns.forEach(function(f){
            if(f.classList.contains('active')){
            f.classList.remove('active');
            return false;
            }
        });
        });
    })
    })
});

var carddeck = {};
document.querySelector('#helpbtn').addEventListener('click', function(){
    var helpimage = document.createElement('img');
    helpimage.src = "img/card1.jpg";
    helpimage.addEventListener('click', function(){window.open("img/card1.jpg");})
    helpimage.style.cursor = "pointer"
    helpimage.style.width = "50%";
    document.querySelector('#modalimg').appendChild(helpimage);

    helpimage = document.createElement('img');
    helpimage.src = "img/card2.jpg";
    helpimage.addEventListener('click', function(){window.open("img/card2.jpg");})
    helpimage.style.cursor = "pointer"
    helpimage.style.width = "50%";
    document.querySelector('#modalimg').appendChild(helpimage);

    helpimage = document.createElement('img');
    helpimage.src = "img/warning.jpg";
    helpimage.addEventListener('click', function(){window.open("img/warning.jpg");})
    helpimage.style.cursor = "pointer"
    helpimage.style.width = "50%";
    document.querySelector('#modalimg2').appendChild(helpimage);

    document.querySelector('#helpbtn').removeEventListener('click', arguments.callee);
}, false);

document.querySelector('#finishyes').addEventListener('click', function(){
    cardsetcalcstart();
}, false)

async function cardsetcalcstart(){
    document.querySelector('#matchfinish').style.display = 'none';
    document.querySelector('#matchstatus').style.display = '';

    document.querySelector('#matchingment').textContent = '여기까지 테스트';

    //return;
    document.querySelector('#matchingment').textContent = '필요 작업 진행중...(환경에 따라 최대 30초 소요)';
    var head = document.querySelector('head');
    var cardeffectscript = document.createElement('script');
    cardeffectscript.type = 'text/javascript';
    cardeffectscript.defer = true;
    cardeffectscript.src = 'js/cardeffect.js';
    head.appendChild(cardeffectscript);
    await new Promise(r => {
    cardeffectscript.onload = r
    })

    document.querySelector('#matchingment').textContent = '도감작 계산 시작';
    var stat = {
    "힘"      : 0,
    "체력"    : 0,
    "치명"    : 0,
    "특화"    : 0,
    "제압"    : 0,
    "신속"    : 0,
    "인내"    : 0,
    "숙련"    : 0,
    "방어력"  : 0,
    }
    var bonusDamage = {
    "인간" : 0,
    "악마" : 0,
    "물질" : 0,
    "불사" : 0,
    "식물" : 0,
    "곤충" : 0,
    "정령" : 0,
    "야수" : 0,
    "기계" : 0
    };

    var cardeffectlength = Object.keys(cardeffect).length;

    var setname;
    var set;
    var setcardlist;
    var bonus;
    var level;
    var leveltotal;
    var nextbonus;
    var nextlevels;
    var nextLevelExp;
    var nextUpSetLevel;
    recommendExp = {};
    recommendCard = {};
    for (var i = 0; i < cardeffectlength; i++) {
    leveltotal = 0;
    nextlevels = [];
    nextLevelExp = 0;
    nextUpSetLevel = [];
    setname = Object.keys(cardeffect)[i];
    document.querySelector('#matchingment').textContent = `(${i+1} / ${cardeffectlength}) [${setname}] 진행중`;
    set = cardeffect[Object.keys(cardeffect)[i]];
    setcardlist = set[0];
    
    for (var j = 0; j < setcardlist.length; j++) {
        level = carddeck[setcardlist[j]];
        if(level == undefined){
        break;
        }
        leveltotal += level;

        for (var k = 4; k > -1+level; k--) {
        nextlevels.push([setcardlist[j],cardLevelUpExp[cardgrade[setcardlist[j]]][k]])
        }
    }
    if(j != setcardlist.length){
        continue;
    }
    
    nextlevels.sort(function(a,b){
        return a[1] - b[1];
    })

    stat[set[1]] += set[2];

    for (var j = 0; j < Object.keys(set[4]).length; j++) {
        if(Object.keys(set[4])[j] <= leveltotal){
        bonusDamage[set[3]] += set[4][Object.keys(set[4])[j]];
        }else{
        nextbonusdamage = set[4][Object.keys(set[4])[j]];
        nextleveldif = Object.keys(set[4])[j] - leveltotal;
        for (var k = 0; k < nextleveldif; k++) {
            nextLevelExp += nextlevels[k][1];
            nextUpSetLevel.push(nextlevels[k]);
        }
        break;
        }
    }

    try{
        recommendCard[set[3]].push({[setname]:nextUpSetLevel});
        recommendExp[set[3]].push({[setname]:nextLevelExp});
    }catch{
        recommendCard[set[3]] = [{[setname]:nextUpSetLevel}];
        recommendExp[set[3]] = [({[setname]:nextLevelExp})];
    }
    }
    //카드 삭제한번이라도 했으면 오차 있을수 있음
    document.querySelector('#matchingment').textContent = `계산 완료(임시로 콘솔창에서 확인)`;

    for (var i = 0; i < Object.keys(recommendExp).length; i++) {
    recommendExp[Object.keys(recommendExp)[i]].sort(function(a,b){
        return a[Object.keys(a)[0]] - b[Object.keys(b)[0]];
    })
    }

    //console.log('과거에 카드 삭제한번이라도 했으면 오차 있을수 있음(카드 삭제를 해도 도감에서는 수집 유무로 효과가 올라가기 때문에)');
    //console.log('권장강화카드');
    //console.log(recommendCard);
    //console.log('권장강화카드에 필요한 카드경험치');
    //console.log(recommendExp);
    //console.log(stat)
    //console.log(bonusDamage);

    
    for (var i = 0; i < Object.keys(stat).length; i++) {
    document.querySelectorAll('#'+Object.keys(stat)[i]).forEach(e => {
        e.textContent = stat[Object.keys(stat)[i]];
    });
    }
    for (var i = 0; i < Object.keys(bonusDamage).length; i++) {
    document.querySelectorAll('#'+Object.keys(bonusDamage)[i]).forEach(e => {
        e.textContent = bonusDamage[Object.keys(bonusDamage)[i]].toFixed(2) + "%";
    });
    }

    document.querySelector('#matchzone').style.display="none";
    document.querySelector('#mycard').style.display="";
}

document.querySelector('#finishno').addEventListener('click', function(){
    alert('조건에 맞춰 다시 해주시거나 그래도 안되시면 sjssj7777@naver.com로 인식하기로 한 사진을 보내주세요')
}, false)

// ************************ Drag and drop ***************** //
let dropArea = document.getElementById("drop-area")

// Prevent default drag behaviors
;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)   
    document.body.addEventListener(eventName, preventDefaults, false)
})

// Highlight drop area when item is dragged over it
;['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
})

;['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
})

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)

document.querySelector('#matchstart').addEventListener('click', gomatching, false)

function gomatching(){
    if(document.querySelectorAll('#gallery > img').length == 0){
    alert('사진을 선택해주세요')
    return
    }
    this.style.display="none";
    document.querySelector('#drop-area').style.display="none";
    document.querySelector('#helpbtn').style.display = 'none';
    document.querySelector('#matchstatus').style.display = '';
    

    var head = document.querySelector('head');
    var opencvscript = document.createElement('script');
    var cardlistscript = document.createElement('script');
    opencvscript.type = 'text/javascript';
    cardlistscript.type = 'text/javascript';
    opencvscript.defer = true;
    cardlistscript.defer = true;
    opencvscript.src = 'js/opencv.js';
    cardlistscript.src = 'js/cardlist.js';
    head.appendChild(opencvscript);
    head.appendChild(cardlistscript);
    document.querySelector('#matchingment').textContent = '필요 작업 진행중...(환경에 따라 최대 30초 소요)';
}

var Module = {
    async onRuntimeInitialized() { 
    document.querySelector('#matchingment').textContent='카드 인식 시작';
    var cavasimage;
    var canvas;
    var cardremoveimage = new Image();
    cardremoveimage.src = cardremovebase64;
    await new Promise(r => {
        cardremoveimage.onload = r
    })
    var cardremove = cv.imread(cardremoveimage);
    var screenimg = document.querySelectorAll('#gallery > img');
    screenimg = [...screenimg];
    screenimg.sort(function(a,b){
        var textA = a.getAttribute('filename')
        var textB = b.getAttribute('filename')
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    let mask;
    var method = cv.TM_CCOEFF_NORMED;
    let result_cols;
    let result_rows;
    var result;
    let minMaxLoc;
    let matchLoc;
    var cardremovex;
    var cardremovey;
    var startX;
    var startY;
    let template;
    var templateimage;
    let dst;
    let rect;
    var lastI;
    document.querySelector('#matchingment').textContent='';
    for (var m = 0; m < screenimg.length; m++) {
        thispagecardlist = [];
        document.querySelector('#matchwhich').textContent=`${m+1}번째 스크린샷 인식중, `;

        cavasimage = new Image();
        cavasimage.src = screenimg[m].src;
        await new Promise(r => {
        cavasimage.onload = r
        })
        canvas = cv.imread(cavasimage);
        
        if(canvas.cols != 1920 || canvas.rows != 1080){
        alert('해상도가 1920 X 1080이 아닙니다.');
        return;
        }

        mask    = new cv.Mat();

        result_cols =   canvas.cols - cardremove.cols + 1;
        result_rows =   canvas.rows - cardremove.rows + 1;

        result = new cv.Mat(result_rows, result_rows, cv.CV_32FC1);

        cv.matchTemplate(canvas, cardremove, result, method, mask);

        cv.normalize(result, result, 0, 1, cv.NORM_MINMAX, -1, new cv.Mat() );

        minMaxLoc   =   cv.minMaxLoc(result);

        if(method == cv.TM_SQDIFF || method == cv.TM_SQDIFF_NORMED){
            matchLoc  = minMaxLoc.minLoc;
        }else{
            matchLoc  = minMaxLoc.maxLoc;
        }

        cardremovex = matchLoc.x;
        cardremovey = matchLoc.y;
        startX = cardremovex;
        startY = cardremovey + 98;

        lastI = 0;
        
        for (var j = 0; j < 4; j++) {
        y = startY + (j * 182);
        for (var k = 0; k < 10; k++) {
            dst = new cv.Mat();
            mask = new cv.Mat();
            rect = new cv.Rect(0,0,0,0);

            x = startX + (k * 118);
            
            rect = new cv.Rect(x, y, 116, 164);
            source = canvas.roi(rect);

            for (var i = lastI; i < Object.keys(cardlist).length; i++) {
            templateimage = new Image();
            templateimage.src = Object.keys(cardlist)[i];
            await new Promise(r => {
                templateimage.onload = r
            })
            template = cv.imread(templateimage);

            result_cols =   source.cols - template.cols + 1;
            result_rows =   source.rows - template.rows + 1;

            result      =   new cv.Mat(result_rows, result_rows, cv.CV_32FC1);

            cv.matchTemplate(source, template, result, method, mask);

            cv.normalize(result, result, 0, 1, cv.NORM_MINMAX, -1, new cv.Mat() );

            minMaxLoc   =   cv.minMaxLoc(result);

            if(method == cv.TM_SQDIFF || method == cv.TM_SQDIFF_NORMED){
                matchLoc  = minMaxLoc.minLoc;
            }else{
                matchLoc  = minMaxLoc.maxLoc;
            }

            if(matchLoc.x == 38 && matchLoc.y == 38){
                //솔 그랑데, 지휘관 솔 이미지 똑같아서 조건 추가
                if(cardlist[Object.keys(cardlist)[i]] == '솔 그랑데' && source.ucharAt(21, 41 * source.channels() + 2) < 130){
                continue;
                }
                //기드온, 투란 오인식
                if(cardlist[Object.keys(cardlist)[i]] == '기드온' && source.ucharAt(61, 32 * source.channels()) < 150){
                continue;
                }
                //비아키스, 레나 오인식
                if(cardlist[Object.keys(cardlist)[i]] == '비아키스' && source.ucharAt(43, 30 * source.channels() + 2) > 90){
                continue;
                }
                //레퓌스, 난민 파밀리아 오인식
                if(cardlist[Object.keys(cardlist)[i]] == '레퓌스' && source.ucharAt(73, 34 * source.channels()) > 170){
                continue;
                }
                //사일러스, 하눈 오인식
                if(cardlist[Object.keys(cardlist)[i]] == '사일러스' && source.ucharAt(42, 28 * source.channels()) > 50){
                continue;
                }
                //하누마탄, 한이 서린 여인 오인식
                if(cardlist[Object.keys(cardlist)[i]] == '하누마탄' && source.ucharAt(50, 54 * source.channels()) < 200){
                continue;
                }

                for (var l = 5; l > 0; l--) {
                if(source.ucharAt(135, (91 - (Math.abs(l-5) * 15)) * source.channels()) > 150){
                    carddeck[cardlist[Object.keys(cardlist)[i]]] = l;
                    l=0;
                }else if(l==1){
                    carddeck[cardlist[Object.keys(cardlist)[i]]] = 0;
                }
                }
                /*
                thrshholdsource = new cv.Mat();
                cv.threshold(source, thrshholdsource, 200, 255, cv.THRESH_BINARY);
                // 9장 이하 카드개수
                if(
                    (
                    thrshholdsource.ucharAt(120,86 * thrshholdsource.channels()     ) == 255 &&
                    thrshholdsource.ucharAt(120,86 * thrshholdsource.channels() + 1 ) == 255 &&
                    thrshholdsource.ucharAt(120,86 * thrshholdsource.channels() + 2 ) == 255
                    ) &&
                    (
                    thrshholdsource.ucharAt(115,57 * thrshholdsource.channels()    ) == 0   &&
                    thrshholdsource.ucharAt(115,57 * thrshholdsource.channels() + 1) == 255 &&
                    thrshholdsource.ucharAt(115,57 * thrshholdsource.channels() + 2) == 255
                    )
                ){
                    //8장
                    if(
                        (thrshholdsource.ucharAt(120,93 * thrshholdsource.channels()    ) == 255 && thrshholdsource.ucharAt(124,94 * thrshholdsource.channels()    ) == 255 && thrshholdsource.ucharAt(115,94 * thrshholdsource.channels()    ) == 255) &&
                        (thrshholdsource.ucharAt(120,93 * thrshholdsource.channels() + 1) == 255 && thrshholdsource.ucharAt(124,94 * thrshholdsource.channels() + 1) == 255 && thrshholdsource.ucharAt(115,94 * thrshholdsource.channels() + 1) == 255) &&
                        (thrshholdsource.ucharAt(120,93 * thrshholdsource.channels() + 2) == 255 && thrshholdsource.ucharAt(124,94 * thrshholdsource.channels() + 2) == 255 && thrshholdsource.ucharAt(115,94 * thrshholdsource.channels() + 2) == 255)
                    ){
                        console.log(cardlist[Object.keys(cardlist)[i]],'8장')
                    }
                    //3장
                    else if(
                        (thrshholdsource.ucharAt(116,97 * thrshholdsource.channels()    ) == 255 && thrshholdsource.ucharAt(115,96 * thrshholdsource.channels()    ) == 255 && thrshholdsource.ucharAt(119,95 * thrshholdsource.channels()    ) == 255) &&
                        (thrshholdsource.ucharAt(116,97 * thrshholdsource.channels() + 1) == 255 && thrshholdsource.ucharAt(115,96 * thrshholdsource.channels() + 1) == 255 && thrshholdsource.ucharAt(119,95 * thrshholdsource.channels() + 1) == 255) &&
                        (thrshholdsource.ucharAt(116,97 * thrshholdsource.channels() + 2) == 255 && thrshholdsource.ucharAt(115,96 * thrshholdsource.channels() + 2) == 255 && thrshholdsource.ucharAt(119,95 * thrshholdsource.channels() + 2) == 255)
                    ){
                        console.log(cardlist[Object.keys(cardlist)[i]],'3장')
                    }
                    //6장
                    else if(
                        (thrshholdsource.ucharAt(115,96 * thrshholdsource.channels()    ) == 255 && thrshholdsource.ucharAt(124,96 * thrshholdsource.channels()    ) == 255 && thrshholdsource.ucharAt(119,93 * thrshholdsource.channels()    ) == 255) &&
                        (thrshholdsource.ucharAt(115,96 * thrshholdsource.channels() + 1) == 255 && thrshholdsource.ucharAt(124,96 * thrshholdsource.channels() + 1) == 255 && thrshholdsource.ucharAt(119,93 * thrshholdsource.channels() + 1) == 255) &&
                        (thrshholdsource.ucharAt(115,96 * thrshholdsource.channels() + 2) == 255 && thrshholdsource.ucharAt(124,96 * thrshholdsource.channels() + 2) == 255 && thrshholdsource.ucharAt(119,93 * thrshholdsource.channels() + 2) == 255)
                    ){
                        console.log(cardlist[Object.keys(cardlist)[i]],'6장')
                    }
                    //9장
                    else if(
                        (thrshholdsource.ucharAt(124,94 * thrshholdsource.channels()    ) == 255 && thrshholdsource.ucharAt(120,97 * thrshholdsource.channels()    ) == 255 && thrshholdsource.ucharAt(116,97 * thrshholdsource.channels()    ) == 255) &&
                        (thrshholdsource.ucharAt(124,94 * thrshholdsource.channels() + 1) == 255 && thrshholdsource.ucharAt(120,97 * thrshholdsource.channels() + 1) == 255 && thrshholdsource.ucharAt(116,97 * thrshholdsource.channels() + 1) == 255) &&
                        (thrshholdsource.ucharAt(124,94 * thrshholdsource.channels() + 2) == 255 && thrshholdsource.ucharAt(120,97 * thrshholdsource.channels() + 2) == 255 && thrshholdsource.ucharAt(116,97 * thrshholdsource.channels() + 2) == 255)
                    ){
                        console.log(cardlist[Object.keys(cardlist)[i]],'9장')
                    }
                    //7장
                    else if(
                        (thrshholdsource.ucharAt(115,93 * thrshholdsource.channels()    ) == 255 && thrshholdsource.ucharAt(115,97 * thrshholdsource.channels()    ) == 255 && thrshholdsource.ucharAt(124,94 * thrshholdsource.channels()    ) == 255) &&
                        (thrshholdsource.ucharAt(115,93 * thrshholdsource.channels() + 1) == 255 && thrshholdsource.ucharAt(115,97 * thrshholdsource.channels() + 1) == 255 && thrshholdsource.ucharAt(124,94 * thrshholdsource.channels() + 1) == 255) &&
                        (thrshholdsource.ucharAt(115,93 * thrshholdsource.channels() + 2) == 255 && thrshholdsource.ucharAt(115,97 * thrshholdsource.channels() + 2) == 255 && thrshholdsource.ucharAt(124,94 * thrshholdsource.channels() + 2) == 255)
                    ){
                        console.log(cardlist[Object.keys(cardlist)[i]],'7장')
                    }
                    //4장
                    else if(
                        (thrshholdsource.ucharAt(121,93 * thrshholdsource.channels()    ) == 255 && thrshholdsource.ucharAt(121,97 * thrshholdsource.channels()    ) == 255 && thrshholdsource.ucharAt(116,96 * thrshholdsource.channels()    ) == 255) &&
                        (thrshholdsource.ucharAt(121,93 * thrshholdsource.channels() + 1) == 255 && thrshholdsource.ucharAt(121,97 * thrshholdsource.channels() + 1) == 255 && thrshholdsource.ucharAt(116,96 * thrshholdsource.channels() + 1) == 255) &&
                        (thrshholdsource.ucharAt(121,93 * thrshholdsource.channels() + 2) == 255 && thrshholdsource.ucharAt(121,97 * thrshholdsource.channels() + 2) == 255 && thrshholdsource.ucharAt(116,96 * thrshholdsource.channels() + 2) == 255)
                    ){
                        console.log(cardlist[Object.keys(cardlist)[i]],'4장')
                    }
                    //2장
                    else if(
                        (thrshholdsource.ucharAt(115,95 * thrshholdsource.channels()    ) == 255 && thrshholdsource.ucharAt(124,93 * thrshholdsource.channels()    ) == 255 && thrshholdsource.ucharAt(124,97 * thrshholdsource.channels()    ) == 255) &&
                        (thrshholdsource.ucharAt(115,95 * thrshholdsource.channels() + 1) == 255 && thrshholdsource.ucharAt(124,93 * thrshholdsource.channels() + 1) == 255 && thrshholdsource.ucharAt(124,97 * thrshholdsource.channels() + 1) == 255) &&
                        (thrshholdsource.ucharAt(115,95 * thrshholdsource.channels() + 2) == 255 && thrshholdsource.ucharAt(124,93 * thrshholdsource.channels() + 2) == 255 && thrshholdsource.ucharAt(124,97 * thrshholdsource.channels() + 2) == 255)
                    ){
                        console.log(cardlist[Object.keys(cardlist)[i]],'2장')
                    }
                    //1장
                    else if(
                        (thrshholdsource.ucharAt(116,95 * thrshholdsource.channels()    ) == 255 && thrshholdsource.ucharAt(116,94 * thrshholdsource.channels()    ) == 255) &&
                        (thrshholdsource.ucharAt(116,95 * thrshholdsource.channels() + 1) == 255 && thrshholdsource.ucharAt(116,94 * thrshholdsource.channels() + 1) == 255) &&
                        (thrshholdsource.ucharAt(116,95 * thrshholdsource.channels() + 2) == 255 && thrshholdsource.ucharAt(116,94 * thrshholdsource.channels() + 2) == 255)
                    ){
                        console.log(cardlist[Object.keys(cardlist)[i]],'1장')
                    }
                    //5장
                    else{
                        console.log(cardlist[Object.keys(cardlist)[i]],'5장')
                    }

                //10장 이상 카드개수
                }else if(
                    (
                    thrshholdsource.ucharAt(120,82 * thrshholdsource.channels()     ) >= 230 &&  
                    thrshholdsource.ucharAt(120,82 * thrshholdsource.channels() + 1 ) >= 230 &&
                    thrshholdsource.ucharAt(120,82 * thrshholdsource.channels() + 2 ) >= 230
                    ) &&
                    (
                    (thrshholdsource.ucharAt(115,53 * thrshholdsource.channels()    ) >= 130 && thrshholdsource.ucharAt(115,53 * thrshholdsource.channels()    ) <= 158) &&
                    (thrshholdsource.ucharAt(115,53 * thrshholdsource.channels() + 1) >= 224 && thrshholdsource.ucharAt(115,53 * thrshholdsource.channels() + 1) <= 246) &&
                    (thrshholdsource.ucharAt(115,53 * thrshholdsource.channels() + 2) >= 214 && thrshholdsource.ucharAt(115,53 * thrshholdsource.channels() + 2) <= 242)
                    )
                ){
                    //11장
                    if(
                        (thrshholdsource.ucharAt(116,99 * thrshholdsource.channels()    ) >= 230 && thrshholdsource.ucharAt(116,100 * thrshholdsource.channels()    ) >= 230) &&
                        (thrshholdsource.ucharAt(116,99 * thrshholdsource.channels() + 1) >= 230 && thrshholdsource.ucharAt(116,100 * thrshholdsource.channels() + 1) >= 230) &&
                        (thrshholdsource.ucharAt(116,99 * thrshholdsource.channels() + 2) >= 230 && thrshholdsource.ucharAt(116,100 * thrshholdsource.channels() + 2) >= 230)
                    ){
                        console.log(cardlist[Object.keys(cardlist)[i]],'11장')
                    }
                    //12장
                    else if(
                        (thrshholdsource.ucharAt(124,97 * thrshholdsource.channels()    ) >= 230 && thrshholdsource.ucharAt(124,102 * thrshholdsource.channels()    ) >= 230) &&
                        (thrshholdsource.ucharAt(124,97 * thrshholdsource.channels() + 1) >= 230 && thrshholdsource.ucharAt(124,102 * thrshholdsource.channels() + 1) >= 230) &&
                        (thrshholdsource.ucharAt(124,97 * thrshholdsource.channels() + 2) >= 230 && thrshholdsource.ucharAt(124,102 * thrshholdsource.channels() + 2) >= 230)
                    ){
                        console.log(cardlist[Object.keys(cardlist)[i]],'12장')
                    }
                    //13장
                    else if(
                        (thrshholdsource.ucharAt(119,99 * thrshholdsource.channels()    ) >= 230 && thrshholdsource.ucharAt(118,101 * thrshholdsource.channels()    ) >= 230) &&
                        (thrshholdsource.ucharAt(119,99 * thrshholdsource.channels() + 1) >= 230 && thrshholdsource.ucharAt(118,101 * thrshholdsource.channels() + 1) >= 230) &&
                        (thrshholdsource.ucharAt(119,99 * thrshholdsource.channels() + 2) >= 230 && thrshholdsource.ucharAt(118,101 * thrshholdsource.channels() + 2) >= 230)
                    ){
                        console.log(cardlist[Object.keys(cardlist)[i]],'13장')
                    }
                    //14장
                    else if(
                        (thrshholdsource.ucharAt(117,101 * thrshholdsource.channels()    ) >= 230 && thrshholdsource.ucharAt(121,101 * thrshholdsource.channels()    ) >= 230) &&
                        (thrshholdsource.ucharAt(117,101 * thrshholdsource.channels() + 1) >= 230 && thrshholdsource.ucharAt(121,101 * thrshholdsource.channels() + 1) >= 230) &&
                        (thrshholdsource.ucharAt(117,101 * thrshholdsource.channels() + 2) >= 230 && thrshholdsource.ucharAt(121,101 * thrshholdsource.channels() + 2) >= 230)
                    ){
                        console.log(cardlist[Object.keys(cardlist)[i]],'14장')
                    }
                    //15장
                    else if(
                        (thrshholdsource.ucharAt(119,100 * thrshholdsource.channels()    ) >= 210 && thrshholdsource.ucharAt(118,98 * thrshholdsource.channels()    ) >= 220) &&
                        (thrshholdsource.ucharAt(119,100 * thrshholdsource.channels() + 1) >= 210 && thrshholdsource.ucharAt(118,98 * thrshholdsource.channels() + 1) >= 220) &&
                        (thrshholdsource.ucharAt(119,100 * thrshholdsource.channels() + 2) >= 210 && thrshholdsource.ucharAt(118,98 * thrshholdsource.channels() + 2) >= 220)
                    ){
                        console.log(cardlist[Object.keys(cardlist)[i]],'15장')
                    }
                    //10장
                    else{
                    console.log(cardlist[Object.keys(cardlist)[i]],'10장')
                    }
                
                // 카드 개수 X
                }else{ 
                    console.log(cardlist[Object.keys(cardlist)[i]],'0장')
                }
                thrshholdsource.delete();
                */
                lastI = i;
                thispagecardlist.push(cardlist[Object.keys(cardlist)[i]]);
                document.querySelector('#matchingment').textContent=`인식된 카드 ${Object.keys(carddeck).length}장`;

                delete cardlist[Object.keys(cardlist)[i]];

                i=Object.keys(cardlist).length;
            }
            template.delete();result.delete();
            }
            source.delete();mask.delete();
        }
        }
        document.querySelector('#searchingcardlist').innerHTML += `<br><br>${screenimg[m].getAttribute('filename')}[${thispagecardlist.length}장] : ${thispagecardlist}`;
    }
    canvas.delete(),cardremove.delete();  
    document.querySelector('#matchwhich').textContent=``;
    document.querySelector('#matchstatus').style.display = 'none';
    document.querySelector('#matchingment').textContent=`인식된 총 카드 ${Object.keys(carddeck).length}장`;
    document.querySelector('#matchfinish').style.display = "";
    }
}


function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
}

function highlight(e) {
    dropArea.classList.add('highlight')
}

function unhighlight(e) {
    dropArea.classList.remove('active')
}

function handleDrop(e) {
    var dt = e.dataTransfer
    var files = dt.files

    handleFiles(files)
}

let uploadProgress = []
let progressBar = document.getElementById('progress-bar')

function initializeProgress(numFiles) {
    progressBar.value = 0
    uploadProgress = []

    for(let i = numFiles; i > 0; i--) {
    uploadProgress.push(0)
    }
}

function updateProgress(fileNumber, percent) {
    uploadProgress[fileNumber] = percent
    let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
    progressBar.value = total
}

function handleFiles(files) {
    files = [...files]
    initializeProgress(files.length)
    files.forEach(previewFile)
}

function previewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = async function() {
    let img = document.createElement('img');
    img.src = reader.result;
    img.setAttribute('filename',file.name);
    document.getElementById('gallery').appendChild(img);
    }
}