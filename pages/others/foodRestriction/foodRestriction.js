$(document).ready(function(){
	getData(data.data);
	
});


function getData(data){
	var inner = '';
	for(var i=0; i<data.length; i++){
		var d = data[i];
		inner += '<tr><td class="col1">'+d.name+'</td> <td class="col2">'+d.bad+'</td> <td class="col3">'+d.good+'</td></tr>';
	}

	$('#content-page tbody').html(inner);
}

