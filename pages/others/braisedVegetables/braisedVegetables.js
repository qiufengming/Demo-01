$(document).ready(function(){
	getData(data.data);
	
});


function getData(data){
	var inner = '';
	for(var i=0; i<data.length; i++){
		var d = data[i];
		inner += '<tr><td class="col1">'+d.month+'</td> <td class="col2">'+d.fruits+'</td> <td class="col3">'+d.vegetables+'</td></tr>';
	}

	$('#content-page tbody').html(inner);
}

