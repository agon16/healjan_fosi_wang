// app params
var myApp = new Framework7({
    material: true,
    fastClicks: true
});
 
// dom title change
var $$ = Dom7;
 
// initialize mainview 
var mainView = myApp.addView('.view-main');


//go to page on start
myApp.onPageInit('index', function (page) {
  console.log('index initialized');
  mainView.router.loadPage('views/home.html'); 
}).trigger();


// onPageInit
myApp.onPageInit('home', function (page) {
  	console.log('home initialized');

  	//Init map

  	var map = L.map('map').setView([5.7481,-55.0988], 11);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([5.7481,-55.0988]).addTo(map)
    .bindPopup('Commewijne passie dja.')
    .openPopup();

	// var coolPlaces = new L.LayerGroup();
 //    L.marker([-41.29042, 174.78219])
 //        .bindPopup('Te Papa').addTo(coolPlaces),
 //    L.marker([-41.29437, 174.78405])
 //        .bindPopup('Embassy Theatre').addTo(coolPlaces),
 //    L.marker([-41.2895, 174.77803])
 //        .bindPopup('Michael Fowler Centre').addTo(coolPlaces),
 //    L.marker([-41.28313, 174.77736])
 //        .bindPopup('Leuven Belgin Beer Cafe').addTo(coolPlaces),
 //    L.polyline([
 //        [-41.28313, 174.77736],
 //        [-41.2895, 174.77803],
 //        [-41.29042, 174.78219],
 //        [-41.29437, 174.78405]
 //        ]
 //        ).addTo(coolPlaces);
 //    var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>',
 //        thunLink = '<a href="http://thunderforest.com/">Thunderforest</a>';
    
 //    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
 //        osmAttrib = '&copy; ' + osmLink + ' Contributors',
 //        landUrl = 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
 //        thunAttrib = '&copy; '+osmLink+' Contributors & '+thunLink;
 //    var osmMap = L.tileLayer(osmUrl, {attribution: osmAttrib}),
 //        landMap = L.tileLayer(landUrl, {attribution: thunAttrib});
 //    var map = L.map('map', {
	// 	    layers: [osmMap] // only add one!
	//     })
	//     .setView([-41.2858, 174.78682], 14);
	// var baseLayers = {
	// 	"OSM Mapnik": osmMap,
	// 	"Landscape": landMap
	// };
	// var overlays = {
	// 	"Interesting places": coolPlaces
	// };
	// L.control.layers(baseLayers,overlays).addTo(map);

});

// AfterPageAnimation
myApp.onPageAfterAnimation('home', function (page) {
  console.log('home after animation');

  $$('.head .right, .overlay').on('click', function(){
    $$('.page-content').toggleClass('legende-open');
  })
});



myApp.onPageAfterAnimation('account', function (page) {
  console.log('account before animation');

  if (localStorage.getItem('htd-user-id') != null) {
  	console.log('exists');
  	$$('.white-overlay').hide();
  }else{
  	console.log('go to login');
  	mainView.router.loadPage('views/login.html'); 
  }
});

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

    $$.ajax({
      type: "POST",
      url: "http://testtmil.sr/healthy_do/api/api.php/user",
      dataType: "application/json",
      contentType: "'application/x-www-form-urlencoded'; charset=utf-8",
      data: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        gender: formData.gender,
        phone: formData.phone,
        password: formData.password,
        status: 'active'
      },
      success: function(data){
        console.log(data);
      }
    });

  });
});

