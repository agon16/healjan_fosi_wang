app.checkLoggedIn();

$('#form-login').submit(function(e){
	e.preventDefault();
	// console.log('submitted');

	var data = {};

	$($(this).serializeArray() ).each(function(index, obj){
	    data[obj.name] = obj.value;
	});

	// console.log(data);

  app.login(data);
});


