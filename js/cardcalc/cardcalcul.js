const allCardTotalExp = 50225200;
const docapack = {
    '삭막한 초원의 카드 팩':['마리 파우렌츠','바스티안','사샤','예지의 아크 아가톤','진화의 군주 카인','카인','타나토스','도굴단장 우고','레온하트 네리아','루드릭','바루투','불칸','소금거인','슈테른 네리아','시그나투스','아드모스','아이히만 박사','안톤','에스','역병 인도자','제이','천둥','칼라도세','하르잘','다단','모리나','세비엘','시이라','용병 세이라','자이언트 웜','지휘관 솔','한이 서린 여인','기자 마티아스'],
    '용감한 기사의 카드 팩':['검은이빨','마법사 로나운','슈헤리트','신뢰의 아크 아스타','알레그로','자간','천둥날개','갈기파도 항구 네리아','녹스','로블롬','루테란 성 네리아','리게아스','릭투스','미한','사교도 대제사장','세리아','윌리윌리','자히아','칼스 모론토','패자의 검','하셀링크','하울로크','히바이크','가비슈','모르페오','몬테르크','베나르','베르하트','비슈츠','아자란','집행관 솔라스','카도건','푸름 전사 브리뉴','리웰라','멜피셔스','비비안','크란테루스'],
    '노래하는 혹한 카드 팩':['반다','진 매드닉','하백','희망의 아크 엘피스','길달','도철','루아브','마네스','만포','미령','바에단','시안','역병군단 바르토','원포','절망의 레키엘','타르실라','파한','혼재의 추오','객주도사','금강','나크슌','도륙자 아르르','레이든','삭월','수령도사','여울','월향도사','자베른','포포','하리','한손','호동','사자탈'],
    '새벽 잎사귀의 카드 팩':['라하르트','루메루스','모카모카','미스틱','베르투스','빙결의 레기오로스','아나벨','아델','에아달린','우르닐','지그문트','창조의 아크 오르투스','가룸','거신 카스피엘','고르곤','기드온','붉은 남작 에디','세티노','수호자 에오로','수호자 티르','아크의 수호자 오셀','토토마','페일린','프록시마','하이비 집행관','나베갈','다쿠쿠','수호자 페오스','창조의 알','토토이끼','고블린 장로 발루','나루니','테르나크'],
    '신비한 풍류의 카드 팩':['그노시스','나크라세나','반다','실페리온','에페르니아','엔비스카','운다트','지혜의 아크 라디체','크로마니움','타이탈로스','하백','홍염의 요호','게르디아','길달','도철','만포','몽환의 퀸','몽환의 킹','미령','아벤','알리페르','엘레노아','역병군단 바르토','오렐다','원포','절망의 레키엘','파한','혼재의 추오','객주도사','금강','도륙자 아르르','몽환의 나이트','몽환의 룩','몽환의 비숍','삭월','수령도사','여울','월향도사','하리','한손','호동','몽환의 폰','사자탈','참크리','투란'],
    '단단한 용기의 카드 팩':['검은이빨','벨크루제','신뢰의 아크 아스타','아카테스','알레그로','어둠의 레기오로스','천둥날개','카이슈르','카이슈테르','칼벤투스','케이사르','피요르긴','헬가이아','갈기파도 항구 네리아','나베르','나잔','녹스','루테란 성 네리아','리게아스','미한','사교도 대제사장','에이케르','위대한 성 네리아','윌리윌리','자히아','칼스 모론토','키즈라','피에르','하셀링크','하울로크','히바이크','가비슈','모르페오','몬테르크','비슈츠','아자란','우르르','이마르','집행관 솔라스','푸름 전사 브리뉴','멜피셔스','비비안','이와르','텔파'],
    '어두운 잎사귀 카드 팩':['레바노스','모카모카','사이카','아르카디아','엘버하스틱','용암 크로마니움','창조의 아크 오르투스','칼도르','칼트말루스','파르쿠나스','페데리코','헌신의 아크 카르타','혹한의 헬가이아','혼돈의 사이카','거신 카스피엘','굴딩','변절자 제페토','붉은 남작 에디','비올레','세티노','수호자 에오로','수호자 티르','아크의 수호자 오셀','진멸의 창','토토마','하이비 집행관','다쿠쿠','루티아','수호자 페오스','창조의 알','토토이끼','나루니','나비','데메타르','두키칼리버','첼라'],
    '춤추는 혹한의 카드 팩':['나히니르','니아','벨가누스','샤나','아르고스','알비온','이그렉시온','중갑 나크라세나','진 매드닉','흑야의 요호','희망의 아크 엘피스','나기','루아브','리루','마네스','바에단','세토','스텔라','시안','자하라','키케라','타르실라','나크슌','레이든','자베른','포포','하리야','베르베로'],
    '조화로운 바다 카드 팩':['에르제베트','칼바서스','크리스틴','고르카그로스','두키킹','브리아레오스','샐리','솔 그랑데','수신 아포라스','실험체 타르마쿰','아드린느','아비시나','에라스모','크누트','판다 푸푸','고비우스 24세','레나','루벤스타인 델 아르코','미카엘과 노메드','타냐 벤텀','표류소녀 엠마','프랭크','헨리','난민 파밀리아','네스','다람쥐 욤','벨리타','여우 사피아노','카드리'],
};

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

        bonusdamagelistup(this.innerText);
    })
});

document.querySelector('#reconBtn').addEventListener('click', function(){
    delCookie('savecarddeck');
    location.reload();
});

let thisTriCardList = {};

let recommendExp = null;
let recommendCard = null;
async function cardsetcalcstart(){
    document.querySelector('#matchfinish').style.display = 'none';
    document.querySelector('#matchstatus').style.display = '';
    document.querySelector('#matchingment').textContent = '필요 작업 진행중...(환경에 따라 최대 30초 소요)';
    
    await loadJavascript('js/cardcalc/cardeffect.js?v=09262006');

    document.querySelector('#matchingment').textContent = '도감작 계산 시작';
    let myStat = {
        "힘"     : 0,
        "체력"   : 0,
        "치명"   : 0,
        "특화"   : 0,
        "제압"   : 0,
        "신속"   : 0,
        "인내"   : 0,
        "숙련"   : 0,
        "방어력" : 0,
    }
    let myBonusDamage = {
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

    let cardeffectlength = Object.keys(cardeffect).length;

    recommendExp = {};
    recommendCard = {};
    for (let i = 0; i < cardeffectlength; i++) {
        let leveltotal = 0;
        let nextlevels = [];
        let nextLevelExp = 0;
        let nextUpSetLevel = [];
        let nextbonusdamage = 0;
        let nextleveldiff = 0;
        let setname = Object.keys(cardeffect)[i];
        let set = cardeffect[setname];
        let setcardlist = set[0];
        let setStatInfo = set[1];
        let setStatPlus = set[2];
        let setBonusDmgInfo = set[3];
        let setBonusDmgPlusList = set[4];
        
        let j = null;
        for (j = 0; j < setcardlist.length; j++) {
            let unitName = setcardlist[j];
            let unitLevel = null;

            try{
                if(!thisTriCardList[setBonusDmgInfo].includes(unitName)) thisTriCardList[setBonusDmgInfo].push(unitName);
            }catch{thisTriCardList[setBonusDmgInfo] = [unitName];}

            try{
                unitLevel = hasCardDeck[unitName][0];
            }catch{break;}

            leveltotal += unitLevel;

            for (let k = 4; k > -1+unitLevel; k--) {
                nextlevels.push([unitName, cardLevelUpExp[cardgrade[unitName]][k]])
            }
        }
        if(j != setcardlist.length){
            continue;
        }
        
        nextlevels.sort((a,b)=>{
            return a[1] - b[1];
        })

        myStat[setStatInfo] += setStatPlus;

        for (let j = 0; j < Object.keys(setBonusDmgPlusList).length; j++) {
            if(Object.keys(setBonusDmgPlusList)[j] <= leveltotal){
                myBonusDamage[setBonusDmgInfo] += setBonusDmgPlusList[Object.keys(setBonusDmgPlusList)[j]];
            }else{
                nextbonusdamage = setBonusDmgPlusList[Object.keys(setBonusDmgPlusList)[j]];
                nextleveldiff = parseInt(Object.keys(setBonusDmgPlusList)[j]) - leveltotal;
                for (var k = 0; k < nextleveldiff; k++) {
                    nextLevelExp += nextlevels[k][1];
                    nextUpSetLevel.push(nextlevels[k]);
                }
                break;
            }
        }
        
        try{
            recommendCard[set[3]].push({[setname]:nextUpSetLevel});
            recommendExp[set[3]].push({[setname]:[nextLevelExp,nextbonusdamage]});
        }catch{
            recommendCard[set[3]] = [{[setname]:nextUpSetLevel}];
            recommendExp[set[3]] = [({[setname]:[nextLevelExp,nextbonusdamage]})];
        }
    }

    for (let i = 0; i < Object.keys(myStat).length; i++) {
        document.querySelectorAll('#'+Object.keys(myStat)[i]).forEach(e => {
            e.textContent = myStat[Object.keys(myStat)[i]];
        });
    }
    for (let i = 0; i < Object.keys(myBonusDamage).length; i++) {
        document.querySelectorAll('#'+Object.keys(myBonusDamage)[i]).forEach(e => {
            e.textContent = myBonusDamage[Object.keys(myBonusDamage)[i]].toFixed(2) + "%";
        });
    }

    document.querySelector('#matchzone').style.display="none";
    document.querySelector('#mycard').style.display="";

    let saveCVal = "";
    for (let i = 0; i < Object.keys(hasCardDeck).length; i++) {
        saveCVal += `${Object.keys(cardgrade).indexOf(Object.keys(hasCardDeck)[i])}:[${Object.values(hasCardDeck)[i]}],`;
    }
    setCookie('savecarddeck',saveCVal,365)
};


function bonusdamagelistup(tri){
    let target = document.querySelector('#bookstbody');
    while (target.hasChildNodes()) {
        target.removeChild(target.firstChild);
    }

    try{
        targetLength = recommendExp[tri].length;
    }catch{
        return;
    }

    for (let i = 0; i < targetLength; i++) {
        let name = Object.keys(recommendExp[tri][i]);
        tr = document.createElement('tr');
        tdsetname = document.createElement('td');
        tdsetexp = document.createElement('td');
        tdsetdmg = document.createElement('td');

        let exp = recommendExp[tri][i][name][0];
        let bonusDamage = recommendExp[tri][i][name][1];
        let orderCardList = recommendCard[tri][i][name];
        if(exp == 0) continue;

        let myEffectStar = 0;
        for (let j = 0; j < cardeffect[name][0].length; j++) {
            try{myEffectStar += hasCardDeck[cardeffect[name][0][j]][0];}
            catch{continue;}
        }

        let targetEffectStar = null;
        for (let j = Object.keys(cardeffect[name][4]).length-1; j >= 0; j--) {
            if(parseInt(Object.keys(cardeffect[name][4])[j]) <= myEffectStar){
                targetEffectStar = parseInt(Object.keys(cardeffect[name][4])[j+1]);
                break;
            }else if(j==0){
                targetEffectStar = parseInt(Object.keys(cardeffect[name][4])[0]);
            }
        }
        
        let nextlevels = [];
        for (let j = 0; j < cardeffect[name][0].length; j++) {
            let cardname$ = cardeffect[name][0][j];

            let tempMyHasQty = null;
            try{tempMyHasQty = parseInt(hasCardDeck[cardname$][1]);}
            catch{continue;}
            

            let tempk = 0;
            for (let k = parseInt(hasCardDeck[cardname$][0])+1; k < 6; k++) {
                if(tempMyHasQty >= k){
                    tempk += k;
                    tempMyHasQty -= k;
                    nextlevels.push([cardname$, cardLevelUpExp[cardgrade[cardname$]][k-1]]);
                    if(k != 5) continue;
                }
                else break;
            }
        }
            
        nextlevels.sort(function(a,b){
            return a[1] - b[1];
        })

        let star = null;
        let needcard = null;
        let simulNeedExp = 0;
        let simulTempDict = {};
        let tempdict = {};
        for (let j = 0; j < nextlevels.length; j++) {
            myEffectStar ++;
            simulNeedExp += nextlevels[j][1];
            
            try{
                star = simulTempDict[nextlevels[j][0]][0] + 1;
            }catch{
                star = 1;
            }
            try{
                needcard = simulTempDict[nextlevels[j][0]][1] + (cardLevelUpExp[cardgrade[nextlevels[j][0]]].indexOf(nextlevels[j][1]) + 1);
            }catch{
                needcard = (cardLevelUpExp[cardgrade[nextlevels[j][0]]].indexOf(nextlevels[j][1])) + 1;
            }

            simulTempDict[nextlevels[j][0]] = [star,needcard];
            if(myEffectStar >= targetEffectStar) {
                tr.style.setProperty('color', 'orange', 'important');
                tr.style.setProperty('--hover-color-var', 'orange');
                tempdict = simulTempDict;
                exp = simulNeedExp;
                break;
            }
        }
        
        if(Object.keys(tempdict).length == 0){
            for (let j = 0; j < orderCardList.length; j++) {
                try{
                    star = tempdict[orderCardList[j][0]][0] + 1;
                }catch{
                    star = 1;
                }
                try{
                    needcard = tempdict[orderCardList[j][0]][1] + (cardLevelUpExp[cardgrade[orderCardList[j][0]]].indexOf(orderCardList[j][1]) + 1);
                }catch{
                    needcard = (cardLevelUpExp[cardgrade[orderCardList[j][0]]].indexOf(orderCardList[j][1])) + 1;
                }
        
                tempdict[orderCardList[j][0]] = [star,needcard];
            }
        } 

        let tooltipcontent = "<FONT SIZE='5pt'>"
        let clickcontent = "";
        for (let j = 0; j < Object.keys(tempdict).length; j++) {
            tooltipcontent += `${Object.keys(tempdict)[j]} +${tempdict[Object.keys(tempdict)[j]][0]}각(${tempdict[Object.keys(tempdict)[j]][1]}장)<br>`;
            clickcontent += `${Object.keys(tempdict)[j]} +${tempdict[Object.keys(tempdict)[j]][0]}각, `
        }
        
        tdsetname.textContent = name;
        tdsetexp.textContent = `${(exp).toLocaleString()}`;
        tdsetdmg.innerHTML = `${bonusDamage}%<br>[${(parseInt(exp/(bonusDamage/0.01))).toLocaleString()}]`;

        tdsetexp.setAttribute('tooltipcontent',tooltipcontent);
        tdsetexp.setAttribute('clickcontent',clickcontent);
        tr.setAttribute('data',JSON.stringify(tempdict));

        tr.append(tdsetname);
        tr.append(tdsetexp);
        tr.append(tdsetdmg);
        tr.style.cursor = 'pointer';
        target.appendChild(tr);
    }

    //각성률, 도카팩 추천 start
    let myAllCardTotalExp = 0;
    let myThisTriTotalExp = 0;
    let thisTriTotalExp = 0;
    let recDocapack = {};
    Object.keys(docapack).forEach(capack => recDocapack[capack] = 0);

    for (let i = 0; i < Object.keys(hasCardDeck).length; i++) {
        let myCardName = Object.keys(hasCardDeck)[i];
        let myCardStar = hasCardDeck[myCardName][0];
        myAllCardTotalExp += cardNeedExp[cardgrade[myCardName]][myCardStar];
    }
    for (let i = 0; i < thisTriCardList[tri].length; i++) {
        let myCardName = thisTriCardList[tri][i];
        let myCardStar, myCardQty = null;

        thisTriTotalExp += cardNeedExp[cardgrade[myCardName]][5];
        try{
            myCardStar = hasCardDeck[myCardName][0];
            myCardQty = hasCardDeck[myCardName][1];
        }catch{continue;}

        myThisTriTotalExp += cardNeedExp[cardgrade[myCardName]][myCardStar];
        
        for (let j = 0; j < Object.keys(docapack).length; j++) {
            let capackName = Object.keys(docapack)[j];
            if(docapack[capackName].includes(myCardName)){
                let tempvalue = null;
                if(myCardStar==0) tempvalue=0;
                else if(myCardStar==1) tempvalue=1;
                else if(myCardStar==2) tempvalue=3;
                else if(myCardStar==3) tempvalue=6;
                else if(myCardStar==4) tempvalue=10;
                else if(myCardStar==5) break;

                recDocapack[capackName] = recDocapack[capackName] + (15 - (tempvalue + myCardQty))
            }
        }

    }
    let sortRecDocapack = Object.entries(recDocapack).sort(function([,a],[,b]){
        return b - a;
    })

    target = document.querySelector('#recCardTbody');
    while (target.hasChildNodes()) {
        target.removeChild(target.firstChild);
    }
    for (let i = 0; i < sortRecDocapack.length; i++) {
        let temptr = document.createElement('tr');
        let tmeptdname = document.createElement('td');
        let tmeptdqty = document.createElement('td');

        tmeptdname.textContent = `${i+1}. ${sortRecDocapack[i][0]}`;
        tmeptdqty.textContent = `${sortRecDocapack[i][1]}장`;

        temptr.appendChild(tmeptdname);
        temptr.appendChild(tmeptdqty);

        target.appendChild(temptr);
    }

    document.querySelector('#all-exp-progress-bar').textContent = `${(myAllCardTotalExp).toLocaleString()} / ${(allCardTotalExp).toLocaleString()} [${((myAllCardTotalExp / allCardTotalExp) * 100).toFixed(3)}%]`
    document.querySelector('#all-exp-progress-bar').previousElementSibling.style.width = `${(myAllCardTotalExp / allCardTotalExp) * 100}%`;
    document.querySelector('#this-exp-progress-bar').textContent = `${(myThisTriTotalExp).toLocaleString()} / ${(thisTriTotalExp).toLocaleString()} [${((myThisTriTotalExp / thisTriTotalExp) * 100).toFixed(3)}%]`
    document.querySelector('#this-exp-progress-bar').previousElementSibling.style.width = `${(myThisTriTotalExp / thisTriTotalExp) * 100}%`;
    document.querySelector('#this-progress').textContent = `${tri.substring(0,1)}추피 각성률`
    //각성률, 도카팩 추천 end

    let regex = /[^0-9]/g;
    let tagarr = Array.from(document.querySelectorAll("#bookstbody tr"));
    document.querySelector("#bookstbody").innerHTML = "";
    tagarr.sort(function (a, b) {
        let val1 = parseInt(a.querySelectorAll('td')[1].textContent.replace(regex,""));
        let val2 = parseInt(b.querySelectorAll('td')[1].textContent.replace(regex,""));
        return (val2 > val1) ? -1 : (val2 < val1) ? 1 : 0;
    });

    for (let i = 0; i < tagarr.length; i++) {
        document.querySelector("#bookstbody").append(tagarr[i])
    }
    
    tippy('#bookstbody > tr > td:nth-child(2)', {
        allowHTML: true, 
        content(reference) {
            return reference.getAttribute('tooltipcontent');
        },
        theme: 'light', 
        placement: 'top',
    });

    document.querySelectorAll('#bookstbody > tr > td:nth-child(2)').forEach(function(e){
        e.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            navigator.clipboard.writeText(e.getAttribute('clickcontent'));
        })
    });
    
    document.querySelectorAll('#bookstbody > tr').forEach(function(e){
        e.addEventListener('click', async function(){
            data = this.getAttribute('data');
            parsedata = JSON.parse(data);
            for (let i = 0; i < Object.keys(parsedata).length; i++) {
                let upCardName = Object.keys(parsedata)[i];
                let addStar = parseInt(Object.values(parsedata)[i][0]);
                let subQty = parseInt(Object.values(parsedata)[i][1]);

                hasCardDeck[upCardName] = [parseInt(hasCardDeck[upCardName][0]) + addStar, parseInt(hasCardDeck[upCardName][1]) - subQty];
            }

            await cardsetcalcstart();

            bonusdamagelistup(tri);
        });
    })
}
