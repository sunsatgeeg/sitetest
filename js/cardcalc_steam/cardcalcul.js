const allCardTotalExp=46055900;
const docapack = {
    'Desolate Meadow Card Pack':    ["Admos","Agaton","Anton","Bastian","Bergstrom","Celedan","Dadan","Giant Worm","Harzal","J","Krause","Lord of Evolution Krause","Mari","Mathias","Morina","Plaguebringer","Prideholme Neria","Rudric","S","Salt Giant","Sasha","Seville","Siera","Signatus","Sol","Stern Neria","Thanatos","Thunder","Ugo","Varut","Velkan","Vengeful Spirit","Zeira"],
    'Fearless Knight Card Pack':    ["Allegro","Asta","Azaran","Benard","Berhart","Bishu","Blackfang","Brinewt","Cadogan","Cals","Cassleford","Executor Solas","Gabrian","Halrock","Heretic High Priest","Hiebike","Jagan","Jahia","Kranterus","Ligheas","Luterra Castle Neria","Meehan","Mephitious","Monterque","Morpheo","Nahun","Nox","Rictus","Riwella","Rovlen","Scherrit","Seria","Thunderwings","Vanquisher","Vivian","Wavestrand Port Neria","Wili-Wili"],
    'Melodious Snow Card Pack':     ["Arre","Banda","Chaotic Chuo","Dochul","Elpon","Gildal","Gumga","Habeck","Hari","Hodon","Javern","Lion Mask","Madam Moonscent","Madnick","Maneth","Manpo","Miru","Nakshun","Onehand","Pahan","Poppy","Ramis","Rekiel","Ruave","Sakkul","Sian","Sir Druden","Sir Valleylead","Tarsila","Varto","Vrad","Wonpho","Yuul"],
    'Dawning Leaf Card Pack':       ["Anabel","Avele","Balu","Caspiel","Dakudaku","Ealyn","Ed the Red","Egg of Creation","Eolh","Garum","Gideon","Gorgon","Hybee Executioner","Icy Legoros","Lumerus","Mokamoka","Mystic","Naruni","Navegal","Occel","Ortuus","Payla","Peroth","Proxima","Setino","Sigmund","Ternark","Thar","Tir","Totoiki","Totoma","Ur'nil","Vertus"],
    'Mysterious Elegant Card Pack': ["Alifer","Arre","Aven","Banda","Chamkuri","Chaotic Chuo","Chromanium","Dochul","Enviska","Ephernia","Flame Fox Yoho","Gherdia","Gildal","Gnosis","Gumga","Habeck","Hari","Hodon","Lenora","Lion Mask","Madam Moonscent","Manpo","Miru","Nacrasena","Onehand","Orelda","Pahan","Phantom Bishop","Phantom King","Phantom Knight","Phantom Pon","Phantom Queen","Phantom Rook","Ratik","Rekiel","Sakkul","Sir Druden","Sir Valleylead","Sylperion","Turan","Tytalos","Undart","Varto","Wonpho","Yuul"],
    'Strong Courage Card Pack':     ["Achates","Allegro","Asta","Azaran","Bishu","Blackfang","Brinewt","Cals","Calventus","Cassleford","Dark Legoros","Eikerr","Executor Solas","Fjorgin","Gabrian","Great Castle Neria","Halrock","Helgaia","Heretic High Priest","Hiebike","Imar","Indar","Jahia","Kaishur","Kaishuter","Kaysarr","Kyzra","Ligheas","Luterra Castle Neria","Meehan","Mephitious","Monterque","Morpheo","Naber","Nazan","Nox","Piyer","Telpa","Thunderwings","Urr","Velcruze","Vivian","Wavestrand Port Neria","Wili-Wili"],
    'Ebony Leaf Card Pack':         ["Alaric","Alberhastic","Caspiel","Chaotic Zaika","Chella","Dakudaku","Demetar","Ed the Red","Egg of Creation","Eolh","Frost Helgaia","Geppetto","Goulding","Hybee Executioner","Jederico","Kaldor","Kalmaris","Karta","Lava Chromanium","Levanos","Levi","Lutia","Mokamoka","Nabi","Naruni","Occel","Ortuus","Perkunas","Peroth","Setino","Spear of Annihilation","Tir","Tookalibur","Totoiki","Totoma","Zaika"],
    'Dancing Snow Card Pack':       ["Albion","Argos","Armored Nacrasena","Berver","Cicerra","Elpon","Hariya","Igrexion","Jahara","Javern","Liru","Madnick","Maneth","Nagi","Nakshun","Navinos","Nia","Night Fox Yoho","Poppy","Ramis","Ruave","Seto","Shana","Sian","Stella","Tarsila","Velganos","Vrad"],
    'Harmonious Sea Card Pack':     ["Abyssina","Adrinne","Aporas","Bellita","Brealeos","Cadri","Calvasus","Erasmo","Ezrebet","Favreau","Gobius XXIV","Kagros","Knut","Krissa","Lena","Mikeel and Nomed","Neth","Pamil","Puppa","Rubenstein del Orazio","Samly","Sapiano","Sol Grande","Tanay","Tarmakum","Temma","Tooki King","Yom","Zenri"],
};

let bonusDamageBtns = document.querySelectorAll('#bonusdamageBtns button');
document.querySelector('#allBonusDmg').addEventListener('click', allBonusDmg);
function allBonusDmg(){
    bonusDamageBtns.forEach(function(f){
        if(f.classList.contains('active')){
            f.classList.remove('active');
            return false;
        }
    })
    if(tippyToggle){
        tippyToggle.destroy();
        tippyToggle = null;
    }
    document.querySelector('#allBonusDmg').classList.add('active');
    document.querySelector('#allBonusDmgDiv').style.display = '';
    document.querySelector('#unitBonusDmgDiv').style.display = 'none';

    let targetTable = document.querySelector('#allBonusDmgTable');
    while (targetTable.hasChildNodes()) {
        targetTable.removeChild(targetTable.firstChild);
    }
    
    for (let i = 0; i < Object.keys(hasCardDeck).length; i++) {
        let cardName = Object.keys(hasCardDeck)[i];
        let cardAwake = hasCardDeck[cardName][0];
        if(cardAwake == 5) continue;
        
        let finishAwakeDmg = {
            'Demons':0.00,
            'Beasts':0.00,
            'Humanoids':0.00,
            'Undead':0.00,
            'Metallic':0.00,
            'Elementals':0.00,
            'Plants':0.00,
            'Machines':0.00,
            'Insects':0.00,
        };
        let totalDmg = 0;
        for (let j = 0; j < Object.keys(cardeffect).length; j++) {
            let setName = Object.keys(cardeffect)[j];
            let setCardList = cardeffect[setName][0];
            let setBonusDmgTri = cardeffect[setName][3];
            let setAwakeInfoList = cardeffect[setName][4];

            if(setCardList.includes(cardName)){
                let simulSetTotalAwake = 0;
                let k = 0
                for (k = 0; k < setCardList.length; k++) {
                    try{
                        simulSetTotalAwake += parseInt(hasCardDeck[setCardList[k]][0]);
                    }catch{break;}
                }
                if(k != setCardList.length){
                    continue;
                }

                let targetSetTotalAwake, targetSetTotalAwakeDmg = null;
                for (let k = Object.keys(setAwakeInfoList).length-1; k >= 0; k--) {
                    if(parseInt(Object.keys(setAwakeInfoList)[k]) <= simulSetTotalAwake){
                        targetSetTotalAwake = parseInt(Object.keys(setAwakeInfoList)[k+1]);
                        targetSetTotalAwakeDmg = setAwakeInfoList[targetSetTotalAwake];
                        break;
                    }else if(k==0){
                        targetSetTotalAwake = parseInt(Object.keys(setAwakeInfoList)[0]);
                        targetSetTotalAwakeDmg = setAwakeInfoList[targetSetTotalAwake];
                    }
                }

                if((5 - cardAwake) + simulSetTotalAwake >= targetSetTotalAwake){
                    finishAwakeDmg[setBonusDmgTri] = finishAwakeDmg[setBonusDmgTri] + parseFloat(targetSetTotalAwakeDmg);
                    totalDmg += parseFloat(targetSetTotalAwakeDmg);
                }
            }
        }

        let content = "";
        for (let j = 0; j < Object.keys(finishAwakeDmg).length; j++) {
            let triName = Object.keys(finishAwakeDmg)[j];
            let triDmg = finishAwakeDmg[triName];
            if(triDmg == 0) continue;

            if(content == "") content += `${triName} : ${(triDmg.toFixed(2)).padEnd(4,'0')}`;
            else content += `<br>${triName} : ${(triDmg.toFixed(2)).padEnd(4,'0')}`;
        }
        

        if(content != ""){
            let needExp = 0;
            let cardQty = hasCardDeck[cardName][1];
            for (let j = cardAwake; j < 5; j++) {
                needExp += cardLevelUpExp[cardgrade[cardName]][j];
                cardQty -= j + 1;
            }

            let trElement = document.createElement('tr');
            let tdName = document.createElement('td');
            let tdExp = document.createElement('td');
            let tdTotal = document.createElement('td');
            let tdDmg = document.createElement('td');

            if(cardQty == 0){
                trElement.style.setProperty('color', 'orange', 'important');
                trElement.style.setProperty('--hover-color-var', 'orange');
            }
            trElement.style.cursor = 'pointer';
            trElement.addEventListener('click', async (e)=>{
                let thisTr = e.target.parentElement;
                let thisName = thisTr.childNodes[0].textContent;
                hasCardDeck[thisName] = [5,0];

                await cardsetcalcstart();
                allBonusDmg();
            })

            tdName.textContent = cardName;
            tdExp.textContent = (needExp).toLocaleString();
            tdTotal.textContent = (totalDmg.toFixed(2)).padEnd(4,'0');
            tdDmg.innerHTML = content;

            trElement.appendChild(tdName);
            trElement.appendChild(tdExp);
            trElement.appendChild(tdTotal);
            trElement.appendChild(tdDmg);

            targetTable.appendChild(trElement);
        }
    }

    let sortables = document.querySelectorAll('.sortable');
    sortables.forEach((t)=>{
        t.classList.remove('asc');
        t.classList.remove('desc');
        t.classList.add('ascdesc');
    });
    multiSort(document.querySelector("#allBonusDmgDiv table th:nth-child(2)"), 'exp')
}

function multiSort(e, what){
    let sortables = document.querySelectorAll('.sortable');
    sortables.forEach((t)=>{
        if(t!=e){
            t.classList.remove('asc');
            t.classList.remove('desc');
            t.classList.add('ascdesc');
        }else{
            t.classList.add('desc');
            t.classList.remove('ascdesc');
        }
    });

    let sortMethodA, sortMethodB = 0;
    if(e.classList.contains('asc')){
        e.classList.add('desc');
        e.classList.remove('asc');
        sortMethodA = -1;
        sortMethodB = 1;
    }else{
        e.classList.remove('desc');
        e.classList.add('asc');
        sortMethodA = 1;
        sortMethodB = -1;
    }

    let targetTable = document.querySelector('#allBonusDmgTable');
    let tagarr = Array.from(document.querySelectorAll("#allBonusDmgTable tr"));
    while (targetTable.hasChildNodes()) {
        targetTable.removeChild(targetTable.firstChild);
    }

    tagarr.sort(function (a, b) {
        let exp1 = parseInt(a.querySelectorAll('td')[1].textContent.replace(',',''));
        let exp2 = parseInt(b.querySelectorAll('td')[1].textContent.replace(',',''));
        let dmg1 = parseFloat(a.querySelectorAll('td')[2].textContent);
        let dmg2 = parseFloat(b.querySelectorAll('td')[2].textContent);
        
        if(what == 'bonus'){
            if (dmg1 < dmg2) return sortMethodB;
            if (dmg1 > dmg2) return sortMethodA;
            if (exp1 < exp2) return sortMethodB;
            if (exp1 > exp2) return sortMethodA;
            return 0;
        }else{
            if (exp1 < exp2) return sortMethodB;
            if (exp1 > exp2) return sortMethodA;
            if (dmg1 < dmg2) return sortMethodB;
            if (dmg1 > dmg2) return sortMethodA;
            return 0;
        }
    });
    

    for (let i = 0; i < tagarr.length; i++) {
        targetTable.append(tagarr[i])
    }
}

bonusDamageBtns = document.querySelectorAll('#bonusdamageBtns button');
bonusDamageBtns.forEach(function(e){
    e.addEventListener('click', function(){
        document.querySelector('#allBonusDmg').classList.remove('active');
        bonusDamageBtns.forEach(function(f){
            if(f.classList.contains('active')){
                f.classList.remove('active');
                return false;
            }
        })
        if(tippyToggle){
            tippyToggle.destroy();
            tippyToggle = null;
        }

        document.querySelector('#allBonusDmgDiv').style.display = 'none';
        document.querySelector('#unitBonusDmgDiv').style.display = '';

        e.classList.add('active');

        bonusdamagelistup(this.innerText);
    })
});

document.querySelector('#reconBtn').addEventListener('click', function(){
    delCookie('savecarddeck_steam');
    location.reload();
});

let thisTriCardList = {};

let recommendExp = null;
let recommendCard = null;
async function cardsetcalcstart(){
    document.querySelector('#matchfinish').style.display = 'none';
    document.querySelector('#matchstatus').style.display = '';
    document.querySelector('#matchingment').textContent = 'Required operation in progress... (up to 30 seconds depending on environment)';
    
    await loadJavascript('js/cardcalc_steam/cardeffect.js?v=11012259');

    document.querySelector('#matchingment').textContent = 'Start books calculating';
    let myStat = {
        "Strength"          : 0,
        "Vitality"          : 0,
        "Crit"              : 0,
        "Specialization"    : 0,
        "Domination"        : 0,
        "Swiftness"         : 0,
        "Endurance"         : 0,
        "Expertise"         : 0,
        "Defense"           : 0,
    }
    let myBonusDamage = {
        "Humanoids"     : 0,
        "Demons"        : 0,
        "Metallic"      : 0,
        "Undead"        : 0,
        "Plants"        : 0,
        "Insects"       : 0,
        "Elementals"    : 0,
        "Beasts"        : 0,
        "Machines"      : 0
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
        if(Object.values(hasCardDeck)[i][0] != 0) console.log(`${Object.keys(hasCardDeck)[i]} : ${Object.values(hasCardDeck)[i][0]}, ${Object.values(hasCardDeck)[i][1]}`);
        saveCVal += `${Object.keys(cardgrade).indexOf(Object.keys(hasCardDeck)[i])}:[${Object.values(hasCardDeck)[i]}],`;
    }
    setCookie('savecarddeck_steam',saveCVal,365)
};

let tippyToggle = null;
function newTippy(ele,content,toggle,trigger,zindex){
    if(toggle == null) toggle = true;
    if(trigger == null) trigger = 'mouseenter focus';
    if(zindex == null) zindex = 5555;

    let popup = tippy(ele, {
        allowHTML: true, 
        content: content,
        theme: 'light',
        hideOnClick: toggle,
        trigger: trigger,
        zIndex: zindex,
        maxWidth: 'none',
    });
    return popup
}
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
            tooltipcontent += `${Object.keys(tempdict)[j]} +${tempdict[Object.keys(tempdict)[j]][0]} Awake (${tempdict[Object.keys(tempdict)[j]][1]} Pcs)<br>`;
            clickcontent += `${Object.keys(tempdict)[j]} +${tempdict[Object.keys(tempdict)[j]][0]} Awake, `
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
        tmeptdqty.textContent = `${sortRecDocapack[i][1]}Pcs`;

        temptr.appendChild(tmeptdname);
        temptr.appendChild(tmeptdqty);

        target.appendChild(temptr);
    }

    document.querySelector('#all-exp-progress-bar').textContent = `${(myAllCardTotalExp).toLocaleString()} / ${(allCardTotalExp).toLocaleString()} [${((myAllCardTotalExp / allCardTotalExp) * 100).toFixed(3)}%]`
    document.querySelector('#all-exp-progress-bar').previousElementSibling.style.width = `${(myAllCardTotalExp / allCardTotalExp) * 100}%`;
    document.querySelector('#this-exp-progress-bar').textContent = `${(myThisTriTotalExp).toLocaleString()} / ${(thisTriTotalExp).toLocaleString()} [${((myThisTriTotalExp / thisTriTotalExp) * 100).toFixed(3)}%]`
    document.querySelector('#this-exp-progress-bar').previousElementSibling.style.width = `${(myThisTriTotalExp / thisTriTotalExp) * 100}%`;
    document.querySelector('#this-progress').textContent = `${tri} Rate`
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

    document.querySelectorAll('#bookstbody > tr > td:nth-child(2)').forEach((e)=>{
        newTippy(e, `${e.getAttribute('tooltipcontent')}<FONT SIZE='2pt'>[Right-click fixed, copy]</FONT>`, null, null, null)
        e.addEventListener('contextmenu', (event)=>{
            if(tippyToggle){
                tippyToggle.destroy();
                tippyToggle = null;
            }else{
                tippyToggle = newTippy(e, `${e.getAttribute('tooltipcontent')}<FONT SIZE='2pt'>[Right-click unfixed]</FONT>`, 'toggle', 'click', 9999);
                tippyToggle.show()
            }
            event.preventDefault();
            navigator.clipboard.writeText(e.getAttribute('clickcontent'));
        });
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

            if(tippyToggle){
                tippyToggle.destroy();
                tippyToggle = null;
            }

            await cardsetcalcstart();

            bonusdamagelistup(tri);
        });
    })
}
