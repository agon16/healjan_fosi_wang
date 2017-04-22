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

  // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  //   // L.tileLayer('../../../../../../tiles/', {
  //     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  // }).addTo(map);

  // L.marker([5.7481,-55.0988]).addTo(map)
  //     .bindPopup('Commewijne passie dja.')
  //     .openPopup();

  // Init map
  var map = L.map('map').setView([4.916,-55.042], 5);

  // Custom script from Stack overflow
  L.tileLayer('dir/tiles/{z0}/{x0}/{x1}/{y0}/{y1}.png').addTo(map); //gMapCatcher
  L.tileLayer('dir/tiles/{z}/{x}/{y}.png').addTo(map);

  $$.getJSON("http://gocodeops.com/healthy_do/api/index.php/speclialist/get", function(data) {
    console.log(data);
    $$.each(data, function(i, value) {
      var greenIcon = L.icon({
        iconUrl: 'dir/js/images/surgeon.png',
        // shadowUrl: 'leaf-shadow.png',

        iconSize:     [32, 32], // size of the icon
        // shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [32, 32], // point of the icon which will correspond to marker's location
        // shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      });

      // Load local tiles
      L.marker([ data[i].latitude, data[i].longitude], {icon: greenIcon} ).addTo(map)
           .bindPopup(data[i].first_name+" "+data[i].last_name+" <div align='center'><br><button class='button button-round active' onclick='goToSpecialist(\""+data[i].user_id+"\")'>Details</button></div>");
    });
  });  

});

// AfterPageAnimation
myApp.onPageAfterAnimation('home', function (page) {
  console.log('home after animation');

  $$('.head .right, .overlay').on('click', function() {
    $$('.page-content').toggleClass('legende-open');
  });
});



myApp.onPageAfterAnimation('account', function (page) {
  console.log('account after animation');

  // hiden van beveiliging sectie
  $$('#beveiliging').hide();

  var beveiliging_sectie = false, user_id;

  //hide beveiliging sectie
  $$('input[type=checkbox]').on('change', function(){
    // console.log($$(this).prop('checked'));
    if ($$(this).prop('checked') == true) {
       $$('#beveiliging').show();
      beveiliging_sectie = true; 
    }else if($$(this).prop('checked') == false){
      $$('#beveiliging').hide();
      beveiliging_sectie = false;
    };
  });

  // if (localStorage.getItem('healthy_userid') != null) {
  //  console.log('exists');
  //   $('.white-overlay, ').hide();
  // }else{
  //  console.log('go to login');
  //  mainView.router.loadPage('views/login.html'); 
  // }

  // agon
  function getAccount(user_id){
    $$.getJSON("http://gocodeops.com/healthy_do/api/index.php/users/get/"+user_id, function(data){
      
      $$.each(data, function(i, value){
        $$("#voornaam").val(value.first_name);
        $$("#achternaam").val(value.last_name);
        $$("#gender").val(value.gender);
        $$("#telefoon").val(value.phone);
      });
    });
  };

  if (localStorage.getItem('healthy_userid') != undefined) {
    user_id = localStorage.getItem('healthy_userid')
    getAccount(user_id); // Get user details
    $$('.white-overlay').remove();
  } else {
    mainView.router.loadPage('views/login.html');
  }


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
        id: user_id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        gender: formData.gender,
        phone: formData.phone
      }
    }

    $$.post('http://gocodeops.com/healthy_do/api/index.php/users/modify', {
        id: user_id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        gender: formData.gender,
        phone: formData.phone
      }, function(data) {
        if(data == 1) {
          mainView.router.loadPage('views/account.html');
        } else {
          myApp.alert("Error occurred.")
        }
      });

    // $$.ajax({
    //   type: "POST",
    //   url: "http://gocodeops.com/healthy_do/api/index.php/users/modify",
    //   dataType: "application/JSON", 
    //   contentType: "application/x-www-form-urlencoded; charset=utf-8",
    //   // data: JSON.stringify(data),
    //   data: {
    //     id: user_id,
    //     first_name: formData.first_name,
    //     last_name: formData.last_name,
    //     gender: formData.gender,
    //     phone: formData.phone
    //   },
    //   success: function(data) {
    //     myApp.alert("Success. ID: " + data);
    //     console.log("success");
    //     getAccount();
    //   }
    // })
  })
});

myApp.onPageInit('login', function (page) {
  console.log('login init');

  $$('#login-form').submit( function(e) {
    e.preventDefault();

    var formData = myApp.formToJSON('#login-form');

    $$.post("http://gocodeops.com/healthy_do/api/index.php/login", {phone: formData.phone, password: formData.password}, function(data){
      data = JSON.parse(data);

      if(data.result == 'false') {
        myApp.alert("Mobielnummer of password incorrect!");
      } else if(data[0].id) {
        localStorage.setItem('healthy_userid', data[0].id);
        mainView.router.loadPage('views/account.html');
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
    // console.log(JSON.stringify(formData));

    // $$.ajax({
    //   type: "POST",
    //   url: "http://gocodeops.com/healthy_do/api/api.php/user",
    //   dataType: "application/json",
    //   contentType: "application/x-www-form-urlencoded; charset=utf-8",
    //   data: JSON.stringify(formData),
    //   success: function(data){
    //     // make a localstorage
    //     localStorage.setItem('healthy_userid', data);
    //     mainView.router.loadPage('views/account.html'); 
    //   }
    // });

    $$.post('http://gocodeops.com/healthy_do/api/index.php/users/add', 
      {
        first_name: formData.first_name,
        last_name: formData.last_name,
        gender: formData.gender,
        password: formData.password,
        phone: formData.phone
      }, function(data) {
        if(data == 1) {
          myApp.alert("Fout opgetreden!");
        }
      });

  });
});

myApp.onPageInit('symptomen', function (page) {
  console.log('symptomen init');

  $$.getJSON("http://gocodeops.com/healthy_do/api/index.php/sickness/get", function(data){
    console.log(data);
    $$.each(data, function(i, value){
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

  console.log(symptoom_id);

  $$.getJSON("http://gocodeops.com/healthy_do/api/index.php/sickness/get/"+symptoom_id, function(data){
    console.log(data);

    $$('#symptoom_detail_name').text(data[0].name);
    $$('#symptoom_detail_img').attr('src', data[0].picture);
    $$('#description').html(data[0].description);
    $$('#symptoms').html(data[0].symptoms);
    $$('#actions').html(data[0].actions);

  });
});


myApp.onPageInit('faq', function (page) {
  console.log('faq init');
$$.getJSON("http://gocodeops.com/healthy_do/api/index.php/faq/get", function(data){
    console.log(data);
    $$.each(data, function(i, value){
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

myApp.onPageInit('specialisten', function (page) {

  console.log('specialisten');
  var user_id = page.query.id;

  $$.getJSON("http://gocodeops.com/healthy_do/api/index.php/speclialist/get/"+user_id, function(data) {
    console.log(data);

    $$('#full_name').html(data[0].first_name);
    $$('#email').html( data[0].email);
    $$('#adress').html(data[0].adress);
    $$('#website').html(data[0].website);
    $$('#name').html(data[0].name);
    $$('#phone').html(data[0].phone);
    $$('#profile_picture').attr('src', data[0].profile_picture);
  });
});

function goToSpecialist(id) {
  mainView.router.loadPage('views/specialisten.html?id='+id);
}

myApp.onPageInit('afspraak', function(page){
  var today = new Date();
  var weekLater = new Date().setDate(today.getDate() + 7);
   
  var calendarDisabled = myApp.calendar({
      input: '#calendar-disabled',
      dateFormat: 'M dd yyyy',
      disabled: {
        from: today,
        to: weekLater
      }
  });
});