document.addEventListener("DOMContentLoaded", ()=>{
    fetch(url + '/secretmap', {method: 'POST'})
    .then((response) => response.json())
    .then((callback) => {
        droplist = [
            "태양의 가호", 
            "태양의 축복", 
            "태양의 은총", 
            "명예의 파편 주머니(대)", 
            "3T 보석 1레벨"
        ];
        droplistimages = {
            "태양의 가호" : "7_163", 
            "태양의 축복" : "7_162", 
            "태양의 은총" : "7_161", 
            "명예의 파편 주머니(대)" : "8_227", 
            "3T 보석 1레벨" : "9_46"
        };
        droplistgrades = {
            "태양의 가호" : 3, 
            "태양의 축복" : 2, 
            "태양의 은총" : 1, 
            "명예의 파편 주머니(대)" : 3, 
            "3T 보석 1레벨" : 1
        };
        droplistqty = {
            "파푸니카" : {"태양의 가호" : 4, "태양의 축복" : 4, "태양의 은총" : 8, "명예의 파편 주머니(대)" : 8, "3T 보석 1레벨" : 28}, 
            "베른 남부" : {"태양의 가호" : 4, "태양의 축복" : 8, "태양의 은총" : 12, "명예의 파편 주머니(대)" : 8, "3T 보석 1레벨" : 40},
            "볼다이크" : {"태양의 가호" : 4, "태양의 축복" : [8,12], "태양의 은총" : 16, "명예의 파편 주머니(대)" : [8,12], "3T 보석 1레벨" : 48},
        };
        randomDrop = {
            "파푸니카" : false,
            "베른 남부" : false,
            "볼다이크" : true,
        };
        table = document.querySelector('#droplist');

        datatime = callback['date'];
        db_year = datatime.slice(0,4);
        db_mon = datatime.slice(4,6);
        db_day = datatime.slice(6,8);
        db_hour = datatime.slice(8,10);
        db_min = datatime.slice(10,12);
        document.querySelector('#date').innerText = db_year + "-" + db_mon + "-" + db_day + " " + db_hour + ":" + db_min + " 기준";

        function calc(content){
            while (table.hasChildNodes()) {
                table.removeChild(table.firstChild);
            }
            if(randomDrop[content]){
                let totalMinGain = 0;
                let totalMaxGain = 0;
                let minTax = 0;
                let maxTax = 0;
                let taxtooltip = "";
                for(let i = 0; i < droplist.length; i++) {
                    let thisMinQty = typeof droplistqty[content][droplist[i]] != 'object' ? droplistqty[content][droplist[i]] : droplistqty[content][droplist[i]][0];
                    let thisMaxQty = typeof droplistqty[content][droplist[i]] != 'object' ? droplistqty[content][droplist[i]] : droplistqty[content][droplist[i]][1];
                    let qtyString = typeof droplistqty[content][droplist[i]] != 'object' ? droplistqty[content][droplist[i]] : `[${String(droplistqty[content][droplist[i]]).replace(',','~')}]`;
                    
                    let thisGainString = typeof droplistqty[content][droplist[i]] != 'object' ? callback[droplist[i]] * thisMinQty : `${callback[droplist[i]] * thisMinQty} ~ ${callback[droplist[i]] * thisMaxQty}`;
    
                    let thisMinTax = Math.ceil(callback[droplist[i]] * 0.05) * thisMinQty;
                    let thisMaxTax = Math.ceil(callback[droplist[i]] * 0.05) * thisMaxQty;
                    let taxString = typeof droplistqty[content][droplist[i]] != 'object' ? thisMinTax : `[${thisMinTax}~${thisMaxTax}]`;
                    minTax += thisMinTax;
                    maxTax += thisMaxTax;
    
                    totalMinGain += callback[droplist[i]] * thisMinQty;
                    totalMaxGain += callback[droplist[i]] * thisMaxQty;
                    
                    if(droplist[i] == "3T 보석 1레벨") taxtooltip += `(<FONT color='orange'>${String(callback[droplist[i]])}</FONT> x 0.05) = ${String(Math.ceil(callback[droplist[i]] * 0.05))} x ${thisMinQty} = ${Math.ceil(callback[droplist[i]] * 0.05) * thisMinQty}<br>`
                    else taxtooltip += `(${String(callback[droplist[i]])} x 0.05) = ${String(Math.ceil(callback[droplist[i]] * 0.05))} x ${qtyString} = ${taxString}<br>`;
    
                    temptr = document.createElement('tr');
                    temptd = document.createElement('td');
                    tempimg = document.createElement('img');
                    tempimg.src = `https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Use/Use_${droplistimages[droplist[i]]}.png`;
                    tempimg.classList.add('item-image');
                    tempimg.setAttribute('data-grade', droplistgrades[droplist[i]]);
                    temptd.append(tempimg);
                    temptr.append(temptd);
        
                    temptd = document.createElement('td');
                    temptd.classList.add('text-start');
                    temptd.classList.add('item-name');
                    temptd.classList.add('fw-bold');
                    temptd.setAttribute('data-grade', droplistgrades[droplist[i]]);
                    temptd.innerText = droplist[i];
                    temptr.append(temptd);
                    
                    temptd = document.createElement('td');
                    temptd.innerText = callback[droplist[i]];
                    temptr.append(temptd);
        
                    temptd = document.createElement('td');
                    temptd.innerText = qtyString;
                    temptr.append(temptd)
        
                    temptd = document.createElement('td');
                    temptd.innerText = thisGainString;
                    temptr.append(temptd);
        
                    table.append(temptr);
                }
                taxtooltip += "(소수점 올림)<br><span class='fw-bold'>(단, <FONT color='orange'>보석</FONT>의 경우<br>합성이 있어 오차 있음)</span>";
        
                document.querySelector('#th_content').innerText = content;
        
                document.querySelector('#total').innerText = `${totalMinGain} ~ ${totalMaxGain}`;
                document.querySelector('#tax').innerText = `${minTax} ~ ${maxTax}`
                document.querySelector('#tax').setAttribute('tooltipcontent', taxtooltip);
        
                let minDistribution = Math.floor(totalMinGain / 29);
                let maxDistribution = Math.floor(totalMaxGain / 29);
                document.querySelector('#distribution').innerText = `${minDistribution} ~ ${maxDistribution}`;
                document.querySelector('#distribution').setAttribute('tooltipcontent', `(최소)<br>${totalMinGain} / 29[인]<br><br>(최대)<br>${totalMaxGain} / 29[인]<br><br>(소수점 버림)`);
        
                let minBreakpoint = Math.floor((totalMinGain-minTax)*(29/30));
                let maxBreakpoint = Math.floor((totalMaxGain-maxTax)*(29/30));
                document.querySelector('#breakpoint').innerText = `${minBreakpoint} ~ ${maxBreakpoint}`;
                document.querySelector('#breakpoint').setAttribute('tooltipcontent', `(최소)<br>${totalMinGain} - ${minTax} = <FONT color='orange'>${totalMinGain-minTax}</FONT><br>29[인] / 30[인] = <FONT color='green'>0.966...·</FONT><br><FONT color='orange'>${totalMinGain-minTax}</FONT> x <FONT color='green'>0.966...·</FONT> = ${minBreakpoint}<br><br>(최대)<br>${totalMaxGain} - ${maxTax} = <FONT color='orange'>${totalMaxGain-maxTax}</FONT><br>29[인] / 30[인] = <FONT color='green'>0.966...·</FONT><br><FONT color='orange'>${totalMaxGain-maxTax}</FONT> x <FONT color='green'>0.966...·</FONT> = ${maxBreakpoint}<br><br>(소수점 버림)`);
                document.querySelector('#breakpoint').removeEventListener("click", arguments.callee);
                document.querySelector('#breakpoint').value = minBreakpoint;
                document.querySelector('#breakpoint').addEventListener("click", clickToCopy);
                document.querySelector('#breakpoint').style.cursor = "pointer";
        
                let minFairprice = parseInt(minBreakpoint*100/(110));
                let maxFairprice = parseInt(maxBreakpoint*100/(110));
                document.querySelector('#fairprice').innerText = `${minFairprice} ~ ${maxFairprice}`;
                document.querySelector('#fairprice').setAttribute('tooltipcontent', `(최소)<br>${minBreakpoint} ÷ 1.1<br><br>(최대)<br>${maxBreakpoint} ÷ 1.1`);
                document.querySelector('#fairprice').removeEventListener("click", arguments.callee);
                document.querySelector('#fairprice').value = minFairprice;
                document.querySelector('#fairprice').addEventListener("click", clickToCopy);
                document.querySelector('#fairprice').style.cursor = "pointer";
        
                let minGiveme = parseInt(minFairprice*100/(110));
                let maxGiveme = parseInt(maxFairprice*100/(110));
                document.querySelector('#giveme').innerText = `${minGiveme} ~ ${maxGiveme}`;
                document.querySelector('#giveme').setAttribute('tooltipcontent', `(최소)<br>${minFairprice} ÷ 1.1<br><br>(최대)<br>${maxFairprice} ÷ 1.1`);
                document.querySelector('#giveme').removeEventListener("click", arguments.callee);
                document.querySelector('#giveme').value = minGiveme;
                document.querySelector('#giveme').addEventListener("click", clickToCopy);
                document.querySelector('#giveme').style.cursor = "pointer";
            }else{
                let totalgain = 0;
                let tax = 0;
                let taxtooltip = "";
                for(let i = 0; i < droplist.length; i++) {
                    totalgain += callback[droplist[i]] * droplistqty[content][droplist[i]];
                    tax += Math.ceil(callback[droplist[i]] * 0.05) * droplistqty[content][droplist[i]];
                    if(droplist[i] == "3T 보석 1레벨"){
                        taxtooltip += "(<FONT color='orange'>" + String(callback[droplist[i]]) + "</FONT> x 0.05) = " + String(Math.ceil(callback[droplist[i]] * 0.05)) + " x " + droplistqty[content][droplist[i]] + " = " + Math.ceil(callback[droplist[i]] * 0.05) * droplistqty[content][droplist[i]] + "<br>"
                    }
                    else taxtooltip += "(" + String(callback[droplist[i]]) + " x 0.05) = " + String(Math.ceil(callback[droplist[i]] * 0.05)) + " x " + droplistqty[content][droplist[i]] + " = " + Math.ceil(callback[droplist[i]] * 0.05) * droplistqty[content][droplist[i]] + "<br>"
                    temptr = document.createElement('tr');
                    temptd = document.createElement('td');
                    tempimg = document.createElement('img');
                    tempimg.src = `https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Use/Use_${droplistimages[droplist[i]]}.png`;
                    tempimg.classList.add('item-image');
                    tempimg.setAttribute('data-grade', droplistgrades[droplist[i]]);
                    temptd.append(tempimg);
                    temptr.append(temptd);
        
                    temptd = document.createElement('td');
                    temptd.classList.add('text-start');
                    temptd.classList.add('item-name');
                    temptd.classList.add('fw-bold');
                    temptd.setAttribute('data-grade', droplistgrades[droplist[i]]);
                    temptd.innerText = droplist[i];
                    temptr.append(temptd);
                    
                    temptd = document.createElement('td');
                    temptd.innerText = callback[droplist[i]];
                    temptr.append(temptd);
        
                    temptd = document.createElement('td');
                    temptd.innerText = droplistqty[content][droplist[i]];
                    temptr.append(temptd)
        
                    temptd = document.createElement('td');
                    temptd.innerText = callback[droplist[i]] * droplistqty[content][droplist[i]];
                    temptr.append(temptd);
        
                    table.append(temptr)
                }
                taxtooltip += "(소수점 올림)<br><span class='fw-bold'>(단, <FONT color='orange'>보석</FONT>의 경우<br>합성이 있어 오차 있음)</span>";
        
                document.querySelector('#th_content').innerText = content;
        
                document.querySelector('#total').innerText = totalgain;
                document.querySelector('#tax').innerText = tax;
                document.querySelector('#tax').setAttribute('tooltipcontent', taxtooltip);
        
                let distribution = Math.floor(totalgain / 29);
                document.querySelector('#distribution').innerText = distribution;
                document.querySelector('#distribution').setAttribute('tooltipcontent', `${totalgain} / 29[인]<br>(소수점 버림)`);
        
                let breakpoint = Math.floor((totalgain-tax)*(29/30));
                document.querySelector('#breakpoint').innerText = breakpoint;
                document.querySelector('#breakpoint').setAttribute('tooltipcontent', `${totalgain} - ${tax} = <FONT color='orange'>${totalgain-tax}</FONT><br>29[인] / 30[인] = <FONT color='green'>0.966...·</FONT><br><FONT color='orange'>${totalgain-tax}</FONT> x <FONT color='green'>0.966...·</FONT> = ${breakpoint}<br>(소수점 버림)`);
                document.querySelector('#breakpoint').removeEventListener("click", arguments.callee);
                document.querySelector('#breakpoint').value = breakpoint;
                document.querySelector('#breakpoint').addEventListener("click", clickToCopy);
                document.querySelector('#breakpoint').style.cursor = "pointer";
        
                let fairprice = parseInt(breakpoint*100/(110));
                document.querySelector('#fairprice').innerText = fairprice;
                document.querySelector('#fairprice').setAttribute('tooltipcontent', String(breakpoint) + " ÷ 1.1");
                document.querySelector('#fairprice').removeEventListener("click", arguments.callee);
                document.querySelector('#fairprice').value = fairprice;
                document.querySelector('#fairprice').addEventListener("click", clickToCopy);
                document.querySelector('#fairprice').style.cursor = "pointer";
        
                let giveme = parseInt(fairprice*100/(110));
                document.querySelector('#giveme').innerText = giveme;
                document.querySelector('#giveme').setAttribute('tooltipcontent', String(fairprice) + " ÷ 1.1");
                document.querySelector('#giveme').removeEventListener("click", arguments.callee);
                document.querySelector('#giveme').value = giveme;
                document.querySelector('#giveme').addEventListener("click", clickToCopy);
                document.querySelector('#giveme').style.cursor = "pointer";
            }
        }
    
        calc('볼다이크');
        document.querySelectorAll('.content button').forEach(function(e){
            e.addEventListener('click', function(){
                document.querySelectorAll('.content button').forEach(function(f){
                    f.classList.remove('active');
                });
                this.classList.add('active');
                calc(this.innerText);
            })
        })
    })
    
    tippy('table td:nth-child(2)', {
        allowHTML: true, 
        onShow(instance) {
            instance.setContent(instance.reference.getAttribute('tooltipcontent'));
        },
        theme: 'light', 
        placement: 'right',
    });
});