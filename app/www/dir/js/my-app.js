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
  var map = L.map('map').setView([4.916,-55.042], 5);

   // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
   //   // L.tileLayer('../../../../../../tiles/', {
   //     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
   // }).addTo(map);

   // L.marker([5.7481,-55.0988]).addTo(map)
   //     .bindPopup('Commewijne passie dja.')
   //     .openPopup();
 
  //Custom script for Stack overflow
  L.tileLayer('dir/tiles/{z0}/{x0}/{x1}/{y0}/{y1}.png').addTo(map); //gMapCatcher

  L.tileLayer('dir/tiles/{z}/{x}/{y}.png').addTo(map);
  //other tiles
  L.marker([5.7481,-55.0988]).addTo(map)
       .bindPopup('Commewijne passie dja.')
       .openPopup();

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

  // hiden van beveiliging sectie
  $$('#beveiliging').hide();

  var beveiliging_sectie = false;

  //hide beveiliging sectie
  $$('input[type=checkbox]').on('change', function(){
    // console.log($$(this).prop('checked'));
    if ($$(this).prop('checked') == true) {
       $$('#beveiliging').show();
      beveiliging_sectie = true; 
    }else if($$(this).prop('checked') == false){
      $$('#beveiliging').hide();
      beveiliging_sectie = false;
    }
  })

  if (localStorage.getItem('healthy_userid') != null) {
  	console.log('exists');
    $('.white-overlay, ').hide();
  }else{
  	console.log('go to login');
  	mainView.router.loadPage('views/login.html'); 
  }

  // agon
  function getAccount(){
    $$.getJSON("http://gocodeops.com/healthy_do/api/api.php/user?transform=true&filter=id,eq,1", function(data){
    console.log(data['user']);
    $$.each(data['user'], function(i, value){
      $$("#voornaam").val(value.first_name);
      $$("#achternaam").val(value.last_name);
      $$("#gender").val(value.gender);
      $$("#telefoon").val(value.phone);
    });
  });
  }

  getAccount();

  $$('#form-account').submit(function(e){
    e.preventDefault();

    var formData = myApp.formToJSON('#form-account'),
        data = {};

    if (beveiliging_sectie) {
      console.log("het is er");
      data = formData;
    }else{
      console.log("het is er niet");
      data = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        gender: formData.gender,
        phone: formData.phone
      }
    }

    console.log(data);

    $$.ajax({
      type: "PUT",
      url: "http://gocodeops.com/healthy_do/api/api.php/user/1",
      dataType: "application/JSON", 
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      data: JSON.stringify(data),
      success: function(data){
      // myApp.alert("success: id:" + data);
      console.log("success");
      getAccount();
      }
    })
  })
});

myApp.onPageInit('login', function (page) {
  console.log('login init');

  $$('#login-form').submit( function(e){
    e.preventDefault();

    var formData = myApp.formToJSON('#login-form');

    $$.getJSON("http://gocodeops.com/healthy_do/api/api.php/user?filter[]=phone,eq,"+ formData.phone +"&filter[]=password,eq," + formData.password + '&transform=true"', function(data){
      console.log(data);

      if (data['user'].length != 0) {
        localStorage.setItem('healthy_userid', data);
        mainView.router.loadPage('views/account.html'); 
      } else {
        myApp.alert("Mobielnummer of password incorrect!");
      }
    });
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
      url: "http://gocodeops.com/healthy_do/api/api.php/user",
      dataType: "application/json",
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      data: JSON.stringify(formData),
      success: function(data){
        // make a localstorage
        localStorage.setItem('healthy_userid', data);
        mainView.router.loadPage('views/account.html'); 
      }
    });
  });
});

myApp.onPageInit('symptomen', function (page) {
  console.log('symptomen init');

  $$.getJSON("http://gocodeops.com/healthy_do/api/api.php/sickness?transform=true", function(data){
    console.log(data['sickness']);
    $$.each(data['sickness'], function(i, value){
      var symptoom = '<li>'+
                        '<a href="views/symptoom_detail.html?id='+value.id+'" class="item-link item-content">'+
                          '<div class="item-inner">'+
                            '<div class="item-title-row">'+
                              '<div class="item-title">'+value.name+'</div>'+
                            '</div>'+
                          '</div>'+
                        '</a>'+
                      '</li>';

      $$('#symptomen').append(symptoom);
    });
  });

});

myApp.onPageInit('symptoom_detail', function (page) {
  console.log('symptoom_detail init');

  // console.log(page.query.id);
  var symptoom_id = page.query.id;

  $$.getJSON("http://gocodeops.com/healthy_do/api/api.php/sickness/"+symptoom_id, function(data){
    console.log(data);

    $$('#symptoom_detail_name').text(data.name);
    $$('#symptoom_detail_img').attr('src', data.picture);
    $$('#description').html(data.description);
    $$('#symptoms').html(data.symptoms);
    $$('#actions').html(data.actions);

  });
});


myApp.onPageInit('faq', function (page) {
  console.log('faq init');
$$.getJSON("http://gocodeops.com/healthy_do/api/api.php/faq?transform=true", function(data){
    console.log(data['faq']);
    $$.each(data['faq'], function(i, value){
      // console.log(value.first_name); 
      var faq_item = '<li class="accordion-item">'+
                        '<a href="#" class="item-content item-link">'+
                          '<div class="item-inner">'+
                           '<div class="item-title">'+value.question+'</div>'+
                          '</div>'+
                        '</a>'+
                        '<div class="accordion-item-content">'+
                          '<div class="content-block">'+
                            '<p>'+value.answer+'</p>'+
                          '</div>'+
                        '</div>'+
                      '</li>';
                    $$('#faq').append(faq_item);
    });
  });
});
