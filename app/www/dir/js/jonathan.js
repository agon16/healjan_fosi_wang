myApp.onPageInit('login', function (page) {
  console.log('login init');

  $$('#login-form').submit( function(e){
  	e.preventDefault();

  	var formData = myApp.formToJSON('#login-form');
  	// console.log(JSON.stringify(formData));

  	
  });
});


myApp.onPageInit('aanmelden', function (page) {
  console.log('aanmelden init');

  $$('#aanmelden_error, #password_error, #password_conf_error').hide();

  	var pass = $$('#password'), 
		pass_conf = $$('#password_conf'), 
		name = $$('.name');
		sub = $$('input[type=submit');

	// allow only letters
	name.on('keyup', function(){
		var transformedInput = $$(this).val().replace(/[^a-zA-Z\s]/g, '');	

		if (transformedInput !== $$(this).val()) {
			$$(this).val(transformedInput);
		}	
	});

	// password longer than 6 chars
	pass.on('keyup change', function(){
		if (pass.val().length < 6) {
			console.log(pass.val().length);
			$$('#password_error').show();
			sub.addClass('disabled');
		}else{
			$$('#password_error').hide();
			sub.removeClass('disabled');
		}		
	});	

	// check if same as password
	pass_conf.on('keyup change', function(){
		if (pass.val() != pass_conf.val()) {
			$$('#password_conf_error').show();
			sub.addClass('disabled');
		}else{
			$$('#password_conf_error').hide();
			sub.removeClass('disabled');
		}	
	});

  $$('#aanmelden-form').submit( function(e){
  	e.preventDefault();

  	var formData = myApp.formToJSON('#aanmelden-form');
  	console.log(JSON.stringify(formData));


  });
});