$(document).ready(function(){
	getData();
	$('#book01 .title').click(function(e){
		$(this).siblings('.cont').toggle();
	});

	
});


function getData(){
	var zhszData = [data1, data2, data3, data4, data5];
	var zhszInner = '';

	for(var i=0; i<zhszData.length; i++){
		 var d = zhszData[i];
		 // 小节
		 var subsection = '';
		 if(d.subsection && d.subsection.length){
        	subsection = eachSubsection(d.subsection);
        }
        zhszInner += '<div class="modal-wrap chapter-wrap chapter-'+(i+1)+'">'
        				+'<h1 class="title chapter-title">'+d.chapterTitle+'</h1>'
        				+'<div class="cont subsection" style="display: none;">'+subsection+'</div>'              
            			+'</div>';
	}
	document.getElementById('book01').innerHTML = zhszInner;
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
        				+'<h3 class="title subsection-title subsection-t-'+(i+1)+'">'+d.subsectionTitle+'</h3>'
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
        		+'<li><p>'+d.name+'</p></li>'
        		+'</ul>';
        }else{
        	inner += '<ul>'
        		+'<li><p class="title">'+d.name+'</p><div class="cont" style="display: none;">'+childCont+'</div></li>'
        		+'</ul>';
        }

        // inner += '<ul>'
        // 		+'<li><p class="title">'+d.name+'</p><div class="cont">'+childCont+'</div></li>'
        // 		+'</ul>';
    }
    return inner;
}





