$('#form-login').submit(function(e){
	e.preventDefault();
	console.log('submitted');

	var formdata = $(this).serializeArray();
	var data = {};
	$(formdata ).each(function(index, obj){
	    data[obj.name] = obj.value;
	});
	console.log(data);

	$.getJSON("http://gocodeops.com/healthy_do/api/api.php/user?filter[]=email,eq,"+ data.email +"&filter[]=password,eq," + sha256(data.password) + '&transform=true"', function(data){
      console.log(data);

      console.log(data['user'].id);
      if (data['user'].length != 0) {
        // localStorage.setItem('hlthy-userid', data);
        console.log('success');
      } else {
        myApp.alert("Email of password incorrect!");
      }
    });
});
