$(function(){
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: url + 'mari',
        success: function(json) {
            var newtime = [];
            var prevtime = [];
            var lasttime = [];

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
            console.log(newtime);
            console.log(prevtime);
            console.log(lasttime);

            var th = "";
            var untilwhen = "";
            var untilwhenday = "";
            var untilwhenhour = "";
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
            
            var content;
            var item;
            var itemimage;
            var itemgrade;
            var itemtitle;
            function cardContent(item){
                itemimage = item['image'];
                itemgrade = item['grade'];
                itemtitle = item['name'];

                content = `<div class="card bg-secondary mb-3 px-auto">
                    <div class="row g-0">
                    <div class="col-md-3">
                    <img src="https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/${itemimage}.png" data-grade="${itemgrade}" class="img-fluid rounded-start item-image" alt="이미지">
                    </div>
                    <div class="col-md-9">
                        <div class="card-header fs-5 text-start ps-2 pe-0 item-name fw-bold" style="white-space:nowrap; overflow:hidden" data-grade="${itemgrade}">${itemtitle}</div>
                        <div class="card-body text-white">
                            <p class="card-text"></p>
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
            } catch{
                return;
            }

        }
    });
});