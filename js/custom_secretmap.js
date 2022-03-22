$(function(){
    $('[data-bs-toggle="tooltip"]').tooltip({html: true})
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        url: url + "secretmap",
        success:function(json) {
            callback = json[0];
            droplist = ['태양의 가호', '태양의 축복', '태양의 은총', '명예의 파편 주머니(대)', '3T 보석 1레벨'];
            droplistimages = {'태양의 가호' : '7_163', '태양의 축복' : '7_162', "태양의 은총" : '7_161', '명예의 파편 주머니(대)' : '8_227', "3T 보석 1레벨" : '9_46'};
            droplistqty = {'태양의 가호' : 4, '태양의 축복' : 8, "태양의 은총" : 12, '명예의 파편 주머니(대)' : 8, "3T 보석 1레벨" : 40};
            droplistgrades = {'태양의 가호' : 3, '태양의 축복' : 2, "태양의 은총" : 1, '명예의 파편 주머니(대)' : 3, "3T 보석 1레벨" : 1};
            table = $('#droplist');
            var totalgain = 0;
            var tax = 0;
            var taxtooltip = "";

            for (var i = 0; i < droplist.length; i++) {
                totalgain += callback[droplist[i]] * droplistqty[droplist[i]];
                tax += Math.ceil(callback[droplist[i]] * 0.05) * droplistqty[droplist[i]];
                taxtooltip += "(" + String(callback[droplist[i]]) + " x 0.05) = " + String(Math.ceil(callback[droplist[i]] * 0.05)) + " x " + droplistqty[droplist[i]] + " = " + Math.ceil(callback[droplist[i]] * 0.05) * droplistqty[droplist[i]] + "<br>"
                table.append(`
                    <tr>    
                    <th scope="row"><img src="https://cdn-lostark.game.onstove.com/EFUI_IconAtlas/Use/Use_` + droplistimages[droplist[i]] + `.png" class="item-image" data-grade="` + droplistgrades[droplist[i]] + `"/></th>
                    <td class="text-start item-name fw-bold" data-grade="` + droplistgrades[droplist[i]] + `">` + droplist[i] + `</td>
                    <td>` + callback[droplist[i]] + `</td>
                    <td>` + callback[droplist[i]] * droplistqty[droplist[i]] + `</td>
                    </tr>
                `)
            }
            taxtooltip += "(소수점 첫째 자리에서 올림)<br><span class='fw-bold'>(단, 보석의 경우<br>합성이 있어 오차 있음)</span>";


            $('#total').text(totalgain);
            $('#tax').text("- " + tax);
            $('#tax').attr('data-bs-original-title', taxtooltip);
            var distribution = parseInt((totalgain-tax) / 30);
            $('#distribution').text("- " + distribution);
            $('#distribution').attr('data-bs-original-title', "" + String(totalgain) + " - " + String(tax) + " = " + String(totalgain - tax) + " ÷ 30");
            var breakpoint = totalgain - tax - distribution;
            $('#breakpoint').text(breakpoint);
            $('#breakpoint').attr('data-bs-original-title', String(totalgain) + " - " + String(tax) + " - " + String(distribution));
            var fairprice = parseInt(breakpoint*100/(110));
            $('#fairprice').text(fairprice);
            $('#fairprice').attr('data-bs-original-title', String(breakpoint) + " ÷ 1.1");
            var giveme = parseInt(fairprice*100/(110));
            $('#giveme').text(giveme);
            $('#giveme').attr('data-bs-original-title', String(fairprice) + " ÷ 1.1");

            datatime = callback['date'];
            db_year = datatime.slice(0,4);
            db_mon = datatime.slice(4,6);
            db_day = datatime.slice(6,8);
            db_hour = datatime.slice(8,10);
            db_min = datatime.slice(10,12);
            $('#date').text(db_year + "-" + db_mon + "-" + db_day + " " + db_hour + ":" + db_min + " 기준");

        }
    });
});