/*获取url参数*/
function getQuery(name) {
	var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
	if (result === null || result.length < 1) {

		return '';
	}
	return result[1];
}


/*统计数字出现次数 并排序*/
function countNum(str){
    var array = str.split('');
    var filter = [];
    var result = [];
    var resultArr = [];
    var get = function(str,tar,arr,tmp){    
        if(str.indexOf(tar)>=0){
            tmp = str.slice(str.indexOf(tar)+1);
            arr.push(tar);
            get(tmp,tar,arr,tmp);
        }
        return arr;
    }
    for(i in array){
        var elm = [];
        var tmp;
        var fstr = filter.join();
        if(fstr.indexOf(array[i])>=0)
            continue;
        else{
            var tmp_arr = get(str,array[i],elm,tmp);
            result.push(tmp_arr.length+':'+tmp_arr[0]);
            filter.push(array[i]);
        }
    }
    result.sort();
    result.reverse();
    for(index in result){
        var show = result[index].split(':');
        resultArr.push('<span>'+show[1]+':'+show[0]+'</span>');
        //resultArr.push(index==0?show[1]+':'+show[0] : show[1]+':'+show[0])
    }
    return resultArr;
}

/*大小奇偶分布*/
function bigodd(type){
    $.ajax({
        type: 'get',
        url: '/datalist',
        dataType: 'json',
        headers: {
            Accept: "application/json; charset=utf-8"
        },
        data: {
            num: getQuery('num')
        },
        beforeSend:function (){
            $('.main table.one').html('<tr><td colspan="7" style="line-height:6;">加载中...</td></tr>');
        },
        success: function (data) {
            var newdata = JSON.parse(data).message;
            var dhtml = '<tr><th width="10%">序号</th><th width="20%">期号</th><th>万</th><th>千</th><th>百</th><th>十</th><th>个</th></tr>';
            var wanarr =[],qianarr =[], baiarr =[],shiarr =[],gearr =[];
            var oddClass=['','odd','','odd','','odd','','odd','','odd'];
            var bigClass=['','','','','','big','big','big','big','big'];

            $('.cursor span').html(newdata[newdata.length-1].r)
            for (var i = newdata.length-1; i >-1; i--) {
                var list = newdata[i].r.split(',');
                wanarr.push(list[0]);
                qianarr.push(list[1]);
                baiarr.push(list[2]);
                shiarr.push(list[3]);
                gearr.push(list[4]);

                if(type == ''){
                        dhtml += '<tr>'+
                            '<td>' + (i + 1) + '</td>'+
                            '<td class="num">' + newdata[i].n + '</td>'+
                            '<td>' + list[0] + '</td>'+
                            '<td>' + list[1] + '</td>'+
                            '<td>' + list[2] + '</td>'+
                            '<td>' + list[3] + '</td>'+
                            '<td>' + list[4] + '</td>'+
                        '</tr>';
                }

                if(type == 'jiou'){
                        dhtml += '<tr>'+
                            '<td>' + (i + 1) + '</td>'+
                            '<td class="num">' + newdata[i].n + '</td>'+
                            '<td class="'+oddClass[list[0]]+'">' + list[0] + '</td>'+
                            '<td class="'+oddClass[list[1]]+'">' + list[1] + '</td>'+
                            '<td class="'+oddClass[list[2]]+'">' + list[2] + '</td>'+
                            '<td class="'+oddClass[list[3]]+'">' + list[3] + '</td>'+
                            '<td class="'+oddClass[list[4]]+'">' + list[4] + '</td>'+
                        '</tr>';
                }
                if(type == 'daxiao'){
                        dhtml += '<tr>'+
                            '<td>' + (i + 1) + '</td>'+
                            '<td class="num">' + newdata[i].n + '</td>'+
                            '<td class="'+bigClass[list[0]]+'">' + list[0] + '</td>'+
                            '<td class="'+bigClass[list[1]]+'">' + list[1] + '</td>'+
                            '<td class="'+bigClass[list[2]]+'">' + list[2] + '</td>'+
                            '<td class="'+bigClass[list[3]]+'">' + list[3] + '</td>'+
                            '<td class="'+bigClass[list[4]]+'">' + list[4] + '</td>'+
                        '</tr>';
                }
            }

            $('.main table.one').html(dhtml);

            $('.count .wan span').html(countNum(wanarr.join('')));
            $('.count .qian span').html(countNum(qianarr.join('')));
            $('.count .bai span').html(countNum(baiarr.join('')));
            $('.count .shi span').html(countNum(shiarr.join('')));
            $('.count .ge span').html(countNum(gearr.join('')));

        }
    });
}





$(function () {

    bigodd('');

    $('.main table.one').on('click', 'tr', function () {
        $(this).addClass('on').siblings().removeClass('on');
    })

    $('.backimg ul').on('click', 'li', function () {
        var type = $(this).attr('data-type');
        bigodd(type);

        $(this).addClass('on').siblings().removeClass('on');
    })

})


