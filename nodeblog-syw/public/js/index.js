$(function () {
    $('.main table.one').on('click','tr',function (){
        $(this).addClass('on').siblings().removeClass('on');
    })

    $.ajax({
        type: 'get', 
        url: '/datalist',
        dataType: 'json',
        headers: {
            Accept: "application/json; charset=utf-8"
        },
        data:{
            num:'_30'
        },
        success: function (data) {
            var newdata = JSON.parse(data).message;
            var dhtml = "<tr><th>序号</th><th>期号</th> <th>万</th> <th>千</th> <th>百</th> <th>十</th> <th>个</th> <th>和</th><th>尾</th><th>对</th></tr>";

            for (var i = 0; i < newdata.length; i++) {
                var list = newdata[i].r.split(',');
                var list2 = '';

                if(i < newdata.length-1){
                    list2 = newdata[(i+1)].r.split(',');
                }else{
                    list2 = ['9','9','9','9','9'];
                }
                var sum = parseInt(list[0])+parseInt(list[1])+parseInt(list[2])+parseInt(list[3])+parseInt(list[4]);
                var end = sum.toString()[1] ? sum.toString()[1] : sum.toString()[0];

                var istrue = list2.indexOf(end) > -1 ? '√' : '×';
                var istrueClass = list2.indexOf(end) > -1 ? 'right' : 'err';

                dhtml += '<tr>'+
                            '<td>' + (i+1) + '</td>'+
                            '<td class="num" width="20%">' + newdata[i].n + '</td>'+
                            '<td>' + list[0] + '</td>'+
                            '<td>' + list[1] + '</td>'+
                            '<td>' + list[2] + '</td>'+
                            '<td>' + list[3] + '</td>'+
                            '<td>' + list[4] + '</td>'+
                            '<td>' + sum + '</td>'+
                            '<td>' + end + '</td>'+
                            '<td class="'+istrueClass+'">' + istrue + '</td>'+
                        '</tr>';
            }

            $('.main table.one').html(dhtml);
        }
    });

})
