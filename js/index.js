showData();

function showData(){
    var workData = data.work;
    var hobbyData = data.hobby;
    var otherData = data.other;
    // 1
    var workDataInner = '';
    for(var i=0;i<workData.length;i++){
        var d = workData[i];
        workDataInner += '<label><a href="'+d.url+'" class="font">'+d.name+'</a></label>';
    }
    // 2
    var hobbyDataInner = '';
    for(var i=0;i<hobbyData.length;i++){
        var d = hobbyData[i];
        hobbyDataInner += '<label><a href="'+d.url+'" class="font">'+d.name+'</a></label>';
    }
    // 3
    var otherDataInner = '';
    for(var i=0;i<otherData.length;i++){
        var d = otherData[i];
        otherDataInner += '<label><a href="'+d.url+'" class="font">'+d.name+'</a></label>';
    }

    document.getElementById('row1').innerHTML = workDataInner;
    document.getElementById('row2').innerHTML = hobbyDataInner;
    document.getElementById('row3').innerHTML = otherDataInner;
}

/* 
var paramObj = {
        httpUrl: './data/index.json',
        type: 'get',
        data: {}
    }
    function callback(){
        if (request.status == 200){
            var json = JSON.parse(request.responseText);
            console.log(json);
        }        
    }
    httpRequest('./data/index.json',callback);
*/


