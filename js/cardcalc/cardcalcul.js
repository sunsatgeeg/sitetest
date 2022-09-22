let updateversiontime = "08241750";

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

let recommendExp = null;
let recommendCard = null;
async function cardsetcalcstart(){
    document.querySelector('#matchfinish').style.display = 'none';
    document.querySelector('#matchstatus').style.display = '';
    document.querySelector('#matchingment').textContent = '필요 작업 진행중...(환경에 따라 최대 30초 소요)';
    
    await loadJavascript('js/cardcalc/cardeffect.js');

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
            try{unitLevel = hasCardDeck[unitName][0];}
            catch{break;}

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
    target = document.querySelector('#bookstbody');
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
