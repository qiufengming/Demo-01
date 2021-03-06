$(document).ready(function(){
	getOutboundTourData();
	getStepmomTeaParty();
	$('#english-page .title').click(function(e){
		$(this).siblings('.cont').toggle();
	});

	
});

function getOutboundTourData(){
	var data = outboundTour.data;
	let inner = '<div style="border-bottom: 1px solid #999;"><h3 class="title" style="text-align: center;">十大场景英语带你玩转外国</h3><div class="cont" style="display: none;"><ul>';

	for(var i=0; i<data.length; i++){
		var d = data[i];
		inner += '<li><h4 class="title">'+d.title+'</h4><div class="cont" style="display: none;">'+eachChildren(d.content);+'</div></li>';
	}
	inner += '</ul></div></div>';

	$('#outboundTour').html(inner);
}


function eachChildren(data){
	var inner = '<ul style="padding-left: 20px;">';

	for(var i=0; i<data.length; i++){
		var d = data[i];
        inner += '<li style="padding: 3px 0;"><p class="en">'+d.en+'</p><p class="cn">'+d.cn+'</p></li>';        	
    }
    inner += '</ul>';
    return inner;
}


// 后妈茶话会歌词
function getStepmomTeaParty(){
	var data = stepmomTeaParty.data;
	let inner = '<div style="border-bottom: 1px solid #999;"><h3 class="title" style="text-align: center;">迪士尼-后妈茶话会</h3><div class="cont" style="display: none;"><ul>';
	for(var i=0; i<data.length; i++){
		var d = data[i];
		inner += '<li style="padding: 3px 0;"><p class="en">'+d.en+'</p><p class="cn">'+d.cn+'</p></li>';
	}
	inner += '</ul></div></div>';

	$('#stepmomTeaParty').html(inner);
}


