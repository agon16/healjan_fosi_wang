$(document).ajaxStart(function() {
    Pace.restart(); 
});

var app = {
	init: function(){
		this.loadPage('dashboard');
	},

	key: 'healthy',

	loadPage: function(page){

		function doPage () {
		  document.title = "Healthy.Do | "+ app.capitalize(page);

		  	var pageFunction = "page"+ app.capitalize(page);

		    app.checkUser();

		    var pageObj = {
		    	query: {

		    	}
		    }

		    try {
		    	$.getScript('dist/js/pages/'+page+'.js')
		    		.done( function(){
			    		var defaultInit = function(){
			    			console.log("This is a default init function for current page ("+page+"). Create your own by defining a init function in the current page object");
			    		}

			    		if(window[page].init != undefined){ 
			    			window[page].init(pageObj) 
			    		}else{
			    			window[page].init = function(page){defaultInit()};
			    			window[page].init(pageObj);
			    		}
					})
					.fail( function(){
						console.error("create "+page+".js file in dist/js/pages/ and create "+page+" {} object in file.");
					})
		    }
		    catch(err) {
		    	console.error(err);

		        var f = new Function('pageFunction', 'return console.error("please create function for " + page + " page!");');
				f(pageFunction);
		    } 
		}

	    var xmlhttp = new XMLHttpRequest();
	    xmlhttp.onreadystatechange = function() {
	        if (this.readyState == 4 && this.status == 200) {
	            document.getElementById("content").innerHTML = this.responseText;
	        }
	    };
	    xmlhttp.addEventListener("load", doPage);
	    xmlhttp.open("GET", page + '.php', true);
	    xmlhttp.send();
   
	},

	showError: function(element, err){
		var error = '<p class="app_error" style="color:#f44336; font-size:14px; padding: 15px 0; text-align: center;">'+err+'</p>';
		element.after(error);

		setTimeout(function() {
			element.next('.app_error').remove();
		}, 2000);
	},

	checkLoggedIn: function(){
		if (localStorage.getItem('healthy_user') != undefined) {
			location.replace('home.php');
		}
	},

	login: function(data){
		$.post(app.serverFolder+"api/index.php/cms/login", data, function(data){
			var data = JSON.parse(data);
	      	// console.log(data);

	      	if (data.result == 'false') {
	      		// console.log('failed');
	      		// alert('login failed, credentials incorrect');
	      		app.showError($('#submit'), 'credentials incorrect');
	      	}else if (data[0].id){
	      		// console.log('success');

	          var user = {
		            id: data[0].id,
		            first_name: data[0].first_name,
		            last_name: data[0].last_name,
		            profile_picture: data[0].profile_picture,
		            email: data[0].email,
		            address: data[0].address,
		            specialist_type: data[0].specialist_type,
		            user_type: data[0].user_type
		          }

	      		localStorage.healthy_user =  app.encrypt(JSON.stringify(user), app.key);

	      		location.replace('home.php');
	     	}
	    });
	},

	signOut: function(){
	    console.log('sign me out!');

	    localStorage.removeItem('healthy_user');
	    location.replace('index.php');
	},

	sendAway: function(message){
			alert(message);
			localStorage.clear();
			location.replace('index.php');
	},

	checkUser: function(){
		if (localStorage.getItem('healthy_user') == undefined) {
			app.sendAway('So, ... who are you exactly?')
		}
		// else{
		// 	// console.log('valid user');
		// }
	},

	getUser: function(){
		var user =  JSON.parse(app.decrypt(localStorage.getItem('healthy_user'), 'healthy'));
		app.updateUser(user);
	},

	updateUser: function(user_object) {
		// console.log(user_object);
		
		var name = user_object.first_name + ' '+ user_object.last_name;

		$('.user').find('span').text(name);
		$('.user, .user-header, .user-panel').find('img').attr('src', user_object.profile_picture);
		$('.user-panel').find('p').text(name);
		$('.user-header').find('p').html(name + '<small style="text-transform: capitalize">'+user_object.specialist_type+'</small>');

		switch(user_object.user_type){
			case 'admin':
				$('.panel-item').show();
				break;
			case 'doctor':
				var arr = ['dashboard']; //welke item te zien mogen komen

				for (var i = 0; i < arr.length; i++) {
					arr[i]
					var item = $('.panel-item a[data-page='+arr[i]+']');
					item.parent('.panel-item').show();
				}

				$('.panel-item:hidden').remove();

				break;
			default:
				app.sendAway('You should download the app instead of being here :)');

		}
	},

	capitalize: function(string){
		return string.substr(0,1).toUpperCase()+string.substr(1);
	},

	encrypt: function(string, key){
		return CryptoJS.AES.encrypt(string, key);
	},

	decrypt: function(encrypted, key){
		var a = CryptoJS.AES.decrypt(encrypted, key);
		return a.toString(CryptoJS.enc.Utf8);
	},

	objectifyForm: function (formArray) {
	  var returnArray = {};
	  for (var i = 0; i < formArray.length; i++){
	    returnArray[formArray[i]['name']] = formArray[i]['value'];
	  }
	  return returnArray;
	}, 

	serverFolder: '../',
	// serverFolder: 'http://localhost/e-go/E-Go%20Studios/healjan_fosi_wang/backend/',
	// serverFolder: 'http://gocodeops.com/healthy_do/',
}

$('.nav-item').click( function(){
    if ($(this).hasClass('left-nav-item')) {
        $(this).closest('li').addClass('active').siblings().removeClass('active');
        $('.sidebar-mini').removeClass('sidebar-open');
    }else{
        $('.sidebar-menu li.active').removeClass('active');
    }
	
    app.loadPage(this.getAttribute('data-page'));
});

var dbconnection = {
	create: function(type, data){
		var field = "";

		switch(type){
			case "faq":
				field = "faq";
			break;

			case "symptomen":
				field = "sickness";
			break;

			case "specialisten":
				field = "specialist";
			break;
		}

		return $.post(app.serverFolder+'/api/index.php/'+field+'/add', data);
	},

	read: function(type, id){
		var field = "";

		switch(type){
			case "faq":
				field = "faq";
			break;

			case "symptomen":
				field = "sickness";
			break;

			case "specialisten":
				field = "specialist";
			break;

			case "specialist_type":
				field = "specialist_type";
			break;
		}

		var target = "api/index.php/"+field+"/get";

		var method = id != null && id > 0 ? $.getJSON( app.serverFolder + target +"/"+id) :  $.getJSON( app.serverFolder + target);

		return method;
	},

	update: function(type, id, data){
		var field = "";

		switch(type){
			case "faq":
				field = "faq";
			break;

			case "symptomen":
				field = "sickness";
			break;

			case "specialisten":
				field = "specialist";
			break;
		}

		return $.post(app.serverFolder+'/api/index.php/'+field+'/modify/'+id, data);
	},

	delete: function(type, id){
		var confirm = window.confirm('Are you sure you want to delete this?');

		if (confirm) {

			var field = "";

			switch(type){
				case "faq":
					field = "faq";
				break;

				case "symptomen":
					field = "sickness";
				break;

				case "specialisten":
					field = "specialist";
				break;
			}

		    return $.post(app.serverFolder + '/api/index.php/'+field+'/remove/' + id);
		}
	} 
}