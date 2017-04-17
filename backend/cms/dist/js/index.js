$('#form-login').submit(function(e){
	e.preventDefault();
	console.log('submitted');

	var data = {};
	$($(this).serializeArray() ).each(function(index, obj){
	    data[obj.name] = obj.value;
	});

	// console.log(data);

	$.post("http://gocodeops.com/healthy_do/api/index.php/cms/login", data, function(data){
      console.log(data);
    });
});
