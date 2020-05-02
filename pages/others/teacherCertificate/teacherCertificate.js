$(document).ready(function(){
	getData('01');
	$('#book01 .title').click(function(e){
		$(this).siblings('.cont').toggle();
	});
    getData('02');
    $('#book02 .title').click(function(e){
        $(this).siblings('.cont').toggle();
    });

    $('#book01').show();

	
});
// 点击导航
function clickNav(el, type){
    var id = 'book'+type;
    var li = $(el).parent();
    $('#'+id).show().siblings().hide();
    li.addClass('active').siblings().removeClass('active');
}

// 数据
function getData(type){
    var data = [];
    var dataInner = '';
    var id = 'book'+type;

    if(type == '01'){
        data = [data1, data2, data3, data4, data5];
    }else if(type == '02'){
        data = [jyzsynl1, jyzsynl2, jyzsynl3, jyzsynl4, jyzsynl5, jyzsynl6, jyzsynl7, jyzsynl8];
    }

    for(var i=0; i<data.length; i++){
         var d = data[i];
         // 小节
         var subsection = '';
         if(d.subsection && d.subsection.length){
            subsection = eachSubsection(d.subsection);
        }
        dataInner += '<div class="modal-wrap chapter-wrap chapter-'+(i+1)+'">'
                        +'<h1 class="title chapter-title">'+strFilter(d.chapterTitle)+'</h1>'
                        +'<div class="cont subsection" style="display: none;">'+subsection+'</div>'              
                        +'</div>';
    }

    $('#'+id).html(dataInner);

}

// 遍历小节
function eachSubsection(data){
	var subsectionInner = '';

	for(var i=0;i<data.length;i++){
        var d = data[i];
        // 遍历小节内容
        var subsectionCon = '';
        if(d.children && d.children.length){
        	subsectionCon = eachChildren(d.children);
        }

        subsectionInner += '<div class="one-subsection">'
        				+'<h3 class="title subsection-title subsection-t-'+(i+1)+'">'+strFilter(d.subsectionTitle)+'</h3>'
        				+'<div class="cont subsection-content subsection-c-'+(i+1)+'"  style="display: none;">'+subsectionCon+'</div>'
        				+'</div>';
    }
    return subsectionInner;
}

// 遍历子集 children
function eachChildren(data){
	var inner = '';

	for(var i=0; i<data.length; i++){
        var d = data[i];
        var childCont = '';
        if(d.children && d.children.length){
        	childCont = eachChildren(d.children);
        }

        if(childCont == ''){
        	inner += '<ul>'
        		+'<li style="list-style-type: square;"><p>'+strFilter(d.name)+'</p></li>'
        		+'</ul>';
        }else{
        	inner += '<ul>'
        		+'<li><p class="title">'+strFilter(d.name)+'</p><div class="cont" style="display: none;">'+childCont+'</div></li>'
        		+'</ul>';
        }

        // inner += '<ul>'
        // 		+'<li><p class="title">'+d.name+'</p><div class="cont">'+childCont+'</div></li>'
        // 		+'</ul>';
    }
    return inner;
}





