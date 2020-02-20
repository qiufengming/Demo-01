getData();



function clickNav(e, className){
    // 导航
    var li = e.parentNode;
    var ul = li.parentNode;
    var allLi = ul.children;
    for(var i = 0; i < allLi.length; i++){
        allLi[i].classList.remove('active');
    } 
    li.classList.add('active');

    // 内容
    var wrap = document.querySelectorAll('.content-wrap>.table-wrap');
    for(var i = 0; i < wrap.length; i++){
        wrap[i].classList.remove('active');
    } 
    document.querySelectorAll('.content-wrap>.'+className)[0].classList.add('active');
}

function getData(){
    var learnUrl = data.learnUrl;
    var note = data.note;
    var demo = data.demo;
    
    // 1.
    var learnUrlInner = '';
    for(var i=0;i<learnUrl.length;i++){
        var d = learnUrl[i];
        learnUrlInner += '<tr><td>'+d.name+'</td><td><a href="'+d.url+'" target="_blank">'+d.url+'</a></td></tr>';       
    }
    // 3.
    var demoInner = '';
    for(var i=0;i<demo.length;i++){
        var d = demo[i];
        demoInner += '<tr><td>'+d.name+'</td><td><a href="'+d.url+'" target="_blank">'+d.url+'</a></td></tr>';       
    }
    
    document.querySelectorAll('#learn-url>tbody')[0].innerHTML = learnUrlInner;
    document.querySelectorAll('#demo>tbody')[0].innerHTML = demoInner;
}