$(function(){
    function calc(){

        exgold = parseInt(($('#itemamount') / (100 * 0.95)) * parseInt($('#crystalprice').val()));
        totalgold = ($('#itemprice')*(($("#itemtradecount")*itemqty)/itemtradecount));
        profit = totalgold-exgold;
        profitper = ((profit/totalgold)*100).toFixed(1);

        if(profit >= 0){
            profitcolor = "00ff00";
        }else if(profit < 0){
            profitcolor = "ff6b6b";
        }
    }

    $('#crystalprice').on('keyup', function(){
        if($(this).val() == ""){
          return;
        }
        price = parseInt($(this).val());
        calc(price, personcount);
    });
});

$(function(){
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: url + 'mari',
        success: function(json) {
            var newtime = [];
            var prevtime = [];
            var lasttime = [];

            var marketdata = json[json.length - 1];
            json.pop()

            var temparr = [];
            for (var i = 0; i < json.length; i++) {
                temparr.push(json[i]);
                if(temparr.length == 6){
                    if(newtime.length == 0){
                        newtime = temparr;
                    }else if(prevtime.length == 0){
                        prevtime = temparr;
                    }else{
                        lasttime = temparr;
                    }
                    temparr = [];
                }
            }

            var parenttable = $('.maritable');
            if(lasttime.length != 0){
                parenttable.children().first().children().append('<th id="lasttime" width="33.33%"></th>');
                parenttable.children().last().children().append('<td id="lasttimelist"></td>');
            }
            if(prevtime.length != 0){
                parenttable.children().first().children().append('<th id="prevtime" width="33.33%"></th>');
                parenttable.children().last().children().append('<td id="prevtimelist"></td>');
            }
            if(newtime.length != 0){
                parenttable.children().first().children().append('<th id="newtime" width="33.33%"></th>');
                parenttable.children().last().children().append('<td id="newtimelist"></td>');
            }

            var untilwhen = "";
            var untilwhenday = "";
            var untilwhenhour = "";
            try{
                untilwhen = String(newtime[0]['untilwhen']);
                untilwhenday = untilwhen.slice(0,2);
                untilwhenhour = untilwhen.slice(-2);
                $("#newtime").text(untilwhenday + "일 " + untilwhenhour + "시까지 판매");
                untilwhen = String(prevtime[0]['untilwhen']);
                untilwhenday = untilwhen.slice(0,2);
                untilwhenhour = untilwhen.slice(-2);
                $("#prevtime").text(untilwhenday + "일 " + untilwhenhour + "시까지 판매");
                untilwhen = String(lasttime[0]['untilwhen']);
                untilwhenday = untilwhen.slice(0,2);
                untilwhenhour = untilwhen.slice(-2);
                $("#lasttime").text(untilwhenday + "일 " + untilwhenhour + "시까지 판매");
            }catch{
            }
            
            var content;
            var item;
            var itemimage;
            var itemgrade;
            var itemtitle;
            var itemoriginaltitle;
            var itemtradecount;
            var itempackcount;
            var itemamount;
            var itemqty;
            var exgold;
            var totalgold;
            var profit;
            var profitcolor;
            function cardContent(item){
                itemimage = item['image'];
                itemgrade = item['grade'];
                itemtitle = item['name'];
                itemtradecount = item['tradecount'];
                itempackcount = item['packcount'];
                itemamount = item['amount'];
                itemqty = item['qty'];
                
                itemoriginaltitle = item['name'].replace(" 주머니 (귀속)","").replace(" (귀속)","");
                itemoriginaltitle = itemoriginaltitle.slice(0, itemoriginaltitle.lastIndexOf(' ['));
                
                exgold = parseInt((itemamount / (100 * 0.95)) * parseInt($('#crystalprice').val()));
                totalgold = (marketdata[itemoriginaltitle]*((itempackcount*itemqty)/itemtradecount));
                profit = totalgold-exgold;
                profitper = ((profit/totalgold)*100).toFixed(1);

                if(profit >= 0){
                    profitcolor = "00ff00";
                }else if(profit < 0){
                    profitcolor = "ff6b6b";
                }

                content = `
                    <div class="card bg-secondary mb-3">
                        <div class="row g-0">
                            <div class="col-md-3 my-auto">
                                <img src="https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/${itemimage}.png" data-grade="${itemgrade}" class="img-fluid rounded-start item-image" alt="이미지">
                            </div>
                        <div class="col-md-9">
                            <div class="card-header ps-2 pe-0 py-1 item-name fs-5 text-start fw-bold"">${itemtitle}</div>
                                <div class="card-body px-1 py-1 text-white">
                                    <div class="float-start text-start">
                                        <p class="my-0">크리스탈(환산골드) : </p>
                                        <p class="my-0">시세[<span id="itemtradecount">${itemtradecount}</span>개 단위] : </p>
                                        <p class="my-0">합계 : </p>
                                        <p class="my-0">이익(%) : </p>
                                    </div>
                                    <div class="float-end text-end fw-bold">
                                        <input hidden>
                                        <p class="my-0">
                                            <span class="float-start" id="itemamount">${itemamount}<img src="img/crystal.png" class="ms-1 img-fluid"></span>
                                            <span id="exgold">(${exgold.toLocaleString()}<img src="img/gold.png" class="ms-1 img-fluid">)</span>
                                        </p>
                                        <p class="my-0" id="itemprice">${marketdata[itemoriginaltitle].toLocaleString()}<img src="img/gold.png" class="ms-1 img-fluid"></p>
                                        <p class="my-0" id="totalgold">${totalgold.toLocaleString()}<img src="img/gold.png" class="ms-1 img-fluid"></p>
                                        <p class="my-0" style="color:#${profitcolor};">
                                            <span id="profit">${profit.toLocaleString()}<img src="img/gold.png" class="ms-1 img-fluid"></span>
                                            <span id="profitper">(${profitper}%)</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;

                return content;
            }
            
            try{
                for (var i = 0; i < newtime.length; i++) {
                    item = newtime[i];
                    itemlist = $('#newtimelist');
                    itemlist.append(cardContent(item));
                }
                for (var i = 0; i < prevtime.length; i++) {
                    item = prevtime[i];
                    itemlist = $('#prevtimelist');
                    itemlist.append(cardContent(item));
                }
                for (var i = 0; i < lasttime.length; i++) {
                    item = lasttime[i];
                    itemlist = $('#lasttimelist');
                    itemlist.append(cardContent(item));
                }
            } catch (e){
                console.log(e)
            }

        }
    });
});