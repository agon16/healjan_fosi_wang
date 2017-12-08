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
myApp.onPageInit('index', function(page) {
  console.log('index initialized');
  mainView.router.loadPage('views/home.html');
}).trigger();


// onPageInit
myApp.onPageInit('home', function(page) {
  console.log('home initialized');

  // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  //   // L.tileLayer('../../../../../../tiles/', {
  //     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  // }).addTo(map);

  // L.marker([5.7481,-55.0988]).addTo(map)
  //     .bindPopup('Commewijne passie dja.')
  //     .openPopup();

  // Init map
  var map = L.map('map').setView([4.916, -55.042], 5);

  // Custom script from Stack overflow
  L.tileLayer('dir/tiles/{z0}/{x0}/{x1}/{y0}/{y1}.png').addTo(map); //gMapCatcher
  L.tileLayer('dir/tiles/{z}/{x}/{y}.png').addTo(map);

  $$.getJSON("../../backend/api/index.php/specialists/get", function(data) {
    console.log(data);
    $$.each(data, function(i, value) {
      var greenIcon = L.icon.glyph({
        prefix: 'mdi',
        glyph: 'domain',
        glyphAnchor: [6, 100],
        bgSize: [150, 150]
      });

      // Load local tiles
      L.marker([data[i].latitude, data[i].longitude], {
          icon: greenIcon
        }).addTo(map)
        .bindPopup(data[i].firstname + " " + data[i].lastname + " <div align='center'><br><button class='button button-round active' onclick='goToSpecialist(\"" + data[i].id + "\")'>Details</button></div>");
    });
  });

});

// AfterPageAnimation
myApp.onPageAfterAnimation('home', function(page) {
  console.log('home after animation');

  $$('.head .right, .overlay').on('click', function() {
    $$('.page-content').toggleClass('legende-open');
  });

});

myApp.onPageAfterAnimation('account', function(page) {
  console.log('account after animation');

  // hiden van beveiliging sectie
  $$('#beveiliging').hide();

  var beveiliging_sectie = false,
    user_id;

  //hide beveiliging sectie
  $$('input[type=checkbox]').on('change', function() {
    // console.log($$(this).prop('checked'));
    if ($$(this).prop('checked') == true) {
      $$('#beveiliging').show();
      beveiliging_sectie = true;
    } else if ($$(this).prop('checked') == false) {
      $$('#beveiliging').hide();
      beveiliging_sectie = false;
    }
  });

  // if (localStorage.getItem('healthy_userid') != null) {
  //  console.log('exists');
  //   $('.white-overlay, ').hide();
  // }else{
  //  console.log('go to login');
  //  mainView.router.loadPage('views/login.html'); 
  // }

  // agon
  function getAccount(user_id) {
    $$.getJSON("../../backend/api/index.php/users/patients/get/" + user_id, function(data) {

      $$.each(data, function(i, value) {
        $$("#voornaam").val(value.first_name);
        $$("#achternaam").val(value.last_name);
        $$("#gender").val(value.gender);
        $$("#telefoon").val(value.phone);
      });
    });
  }

  if (localStorage.getItem('healthy_userid') != undefined) {
    user_id = localStorage.getItem('healthy_userid');
    getAccount(user_id); // Get user details
    $$('.white-overlay').remove();
  } else {
    mainView.router.loadPage('views/login.html');
  }


  $$('#form-account').submit(function(e) {
    e.preventDefault();

    var formData = myApp.formToJSON('#form-account'),
      data = {};

    if (beveiliging_sectie) {
      console.log("het is er");
      data = formData;
    } else {
      console.log("het is er niet");
      data = {
        id: user_id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        gender: formData.gender,
        phone: formData.phone
      };
    }

    $$.post('http://gocodeops.com/healthy_do/api/index.php/users/modify', {
      id: user_id,
      first_name: formData.first_name,
      last_name: formData.last_name,
      gender: formData.gender,
      phone: formData.phone
    }, function(data) {
      if (data == 1) {
        mainView.router.loadPage('views/account.html');
      } else {
        myApp.alert("Error occurred.");
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
  });
});

myApp.onPageInit('login', function(page) {
  console.log('login init');

  $$('#login-form').submit(function(e) {
    e.preventDefault();

    var formData = myApp.formToJSON('#login-form');

    $$.post("../../backend/api/index.php/login", {
      phone: formData.phone,
      password: formData.password
    }, function(data) {
      data = JSON.parse(data);

      if (data.result == 'false') {
        myApp.alert("Mobielnummer of password incorrect!");
      } else if (data[0].id) {
        localStorage.setItem('healthy_userid', data[0].patient_id);
        mainView.router.loadPage('views/account.html');
      }
    });
  });
});


myApp.onPageInit('aanmelden', function(page) {
  console.log('aanmelden init');

  $$('#aanmelden_error, #password_error, #password_conf_error').hide();

  var pass = $$('#password'),
    pass_conf = $$('#password_conf'),
    name = $$('.name'),
    sub = $$('input[type=submit');

  // allow only letters
  name.on('keyup', function() {
    var transformedInput = $$(this).val().replace(/[^a-zA-Z\s]/g, '');

    if (transformedInput !== $$(this).val()) {
      $$(this).val(transformedInput);
    }
  });

  // password longer than 6 chars
  pass.on('keyup change', function() {
    if (pass.val().length < 6) {
      $$('#password_error').show();
      sub.addClass('disabled');
    } else {
      $$('#password_error').hide();
      sub.removeClass('disabled');
    }
  });

  // check if same as password
  pass_conf.on('keyup change', function() {
    if (pass.val() != pass_conf.val()) {
      $$('#password_conf_error').show();
      sub.addClass('disabled');
    } else {
      $$('#password_conf_error').hide();
      sub.removeClass('disabled');
    }
  });

  $$('#aanmelden-form').submit(function(e) {
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

    $$.post('http://gocodeops.com/healthy_do/api/index.php/users/add', {
      first_name: formData.first_name,
      last_name: formData.last_name,
      gender: formData.gender,
      password: formData.password,
      phone: formData.phone
    }, function(data) {
      if (data == 1) {
        myApp.alert("Fout opgetreden!");
      }
    });

  });
});

myApp.onPageInit('symptomen', function(page) {
  console.log('symptomen init');

  $$.getJSON("../../backend/api/index.php/sickness/get", function(data) {
    console.log(data);
    $$.each(data, function(i, value) {
      var symptoom = '<li>' +
        '<a href="views/symptoom_detail.html?id=' + value.id + '" class="item-link item-content">' +
        '<div class="item-inner">' +
        '<div class="item-title-row">' +
        '<div class="item-title">' + value.name + '</div>' +
        '</div>' +
        '</div>' +
        '</a>' +
        '</li>';

      $$('#symptomen').append(symptoom);
    });
  });

});

myApp.onPageInit('symptoom_detail', function(page) {
  console.log('symptoom_detail init');

  // console.log(page.query.id);
  var symptoom_id = page.query.id;

  console.log(symptoom_id);

  $$.getJSON("../../backend/api/index.php/sickness/get/" + symptoom_id, function(data) {
    console.log(data);

    $$('#symptoom_detail_name').text(data[0].name);
    $$('#symptoom_detail_img').attr('src', data[0].picture);
    $$('#description').html(data[0].description);
    $$('#symptoms').html(data[0].symptoms);
    $$('#actions').html(data[0].actions);

  });
});


myApp.onPageInit('faq', function(page) {
  console.log('faq init');
  $$.getJSON("../../backend/api/index.php/faq/get", function(data) {
    console.log(data);
    $$.each(data, function(i, value) {
      // console.log(value.first_name); 
      var faq_item = '<li class="accordion-item">' +
        '<a href="#" class="item-content item-link">' +
        '<div class="item-inner">' +
        '<div class="item-title">' + value.question + '</div>' +
        '</div>' +
        '</a>' +
        '<div class="accordion-item-content">' +
        '<div class="content-block">' +
        '<p>' + value.answer + '</p>' +
        '</div>' +
        '</div>' +
        '</li>';
      $$('#faq').append(faq_item);
    });
  });
});

myApp.onPageInit('specialisten', function(page) {

  console.log('specialisten');
  var user_id = page.query.id;

  $$.getJSON("../../backend/api/index.php/specialists/get/" + user_id, function(data) {
    console.log(data);

    localStorage.setItem('healthy_specialistid', data[0].user_id);
    $$('#full_name').html(data[0].firstname + ' ' + data[0].lastname);
    $$('#email').html(data[0].email);
    $$('#adress').html(data[0].adress);
    $$('#website').html(data[0].website);
    $$('#name').html(data[0].name);
    $$('#phone').html(data[0].phone);
    $$('#profile_picture').attr('src', data[0].profile_picture);
  });
});

function goToSpecialist(id) {
  mainView.router.loadPage('views/specialisten.html?id=' + id);
}

myApp.onPageInit('afspraak', function(page) {
  console.log('afspraak init');

  var today = new Date(),
    period = null,
    weekLater = new Date().setDate(today.getDate() + 7),

    calendarDisabled = myApp.calendar({
      input: '#calendar-disabled',
      dateFormat: 'yyyy-mm-dd',
      disabled: {
        from: today,
        to: weekLater
      }
    });

  /* Set periode AM or PM */
  $$('#am').click(function() {
    console.log("Period clicked");
    $$(this).attr('class', 'button bg-teal color-white');
    $$('#pm').attr('class', 'button bg-white color-teal');
    period = 'am';
  });

  $$('#pm').click(function() {
    console.log("Period clicked");
    $$(this).attr('class', 'button bg-teal color-white');
    $$('#am').attr('class', 'button bg-white color-teal');
    period = 'pm';
  });
  /* End period */

  $$('#add_appointment').click(function() {

    var user_id = localStorage.getItem('healthy_userid'),
      specialist_id = localStorage.getItem('healthy_specialistid'),
      date = $$('#calendar-disabled').val(),
      period = period;
    $$.post('../../backend/api/index.php/appointments/add', {
      specialist_id: specialist_id,
      patient_id: user_id,
      date: date,
      period: period
    }, function(data) {
      data = JSON.parse(data);
      if (data.result == 'success') {
        myApp.alert("Afspraak gemaakt");
      } else if (data.result == 'failed') {
        myApp.alert("Fout opgetreden!");
      }
    });

  });

});


myApp.onPageInit('afsprakenverzoek', function(page) {

  var user_id = localStorage.getItem('healthy_userid');

  var load_appointments = function() {

    myApp.showIndicator();

    // Show appointments waiting counter
    $$.getJSON('../../backend/api/index.php/appointments/waiting/' + user_id, function(data) {
      $$('.afspraak_badge').html(data.count);
    });

    // Get waiting/pending appointments
    $$.post('../../backend/api/index.php/appointments/pending', {
      id: user_id,
      user_type: 'patient'
    }, function(data) {
      data = JSON.parse(data);
      $$.each(data, function(i, value) {

        $$('#appointments').html(''); // Clear page

        var name = data[i].firstname + ' ' + data[i].lastname,
          id = data[i].id;

        switch (data[i].fully_booked) {
          case '0':
            content = '<div class="card verzoek_open">' +
              '<div class="card-header"><div class="links"><i class="ion-eye color-blue"></i></div>Jonathan</div>' +
              '<div class="card-content">' +
              '<div class="card-content-inner">Beste Emanuel, U had een verzoek gedaan om een afspraak te maken naar de specialist ' + name + ' te gaan op 2017-04-30 16:00 komen voor uw behandeling.</div>' +
              '</div>' +
              '<div class="row card-content-inner" id="knoppen_verzoek">' +
              '<div class="col-50">' +
              '<a href="#" id="accept_knop" onclick="appointment_respond(\'' + id + '\', 0);" class="button button-big bg-teal color-white">Accept</a>' +
              '</div>' +
              '<div class="col-50">' +
              '<a href="#" id="cancel_knop" onclick="appointment_respond(\'' + id + '\', 1);" class="button button-big bg-red color-white">Cancel</a>' +
              '</div>' +
              '</div>' +
              '</div>';
            break;

          case '1':
            content = '<div class="card verzoek_open">' +
              '<div class="card-header"><div class="links"><i class="ion-eye color-blue"></i></div>Jonathan</div>' +
              '<div class="card-content">' +
              '<div class="card-content-inner">Beste Emanuel, U had een verzoek gedaan om een afspraak te maken naar de specialist ' + name + ' te gaan. Uw verzoek kan niet geaccepteerd worden omdat het al volggeboekt is maar als u wilt kunt u dan op 2017-04-30 16:00 komen voor uw behandeling.</div>' +
              '</div>' +
              '<div class="row card-content-inner" id="knoppen_verzoek">' +
              '<div class="col-50">' +
              '<a href="#" id="accept_knop" onclick="appointment_respond(\'' + id + '\', 0);" class="button button-big bg-teal color-white">Accept</a>' +
              '</div>' +
              '<div class="col-50">' +
              '<a href="#" id="cancel_knop" onclick="appointment_respond(\'' + id + '\', 1);" class="button button-big bg-red color-white">Cancel</a>' +
              '</div>' +
              '</div>' +
              '</div>';
            break;
        }

        $$('#appointments').prepend(content);
      });
    });

    // Get other appointments. Active and inactive
    $$.getJSON('../../backend/api/index.php/appointments/get/patient/' + user_id, function(data) {

      $$.each(data, function(i, value) {

        var name = data[i].firstname + ' ' + data[i].lastname,
          id = data[i].id;

        if (data[i].state == 'accepted') {
          content = '<div class="card verzoek_accept">' +
            '<div class="card-header"><div class="links"><i class="ion-eye color-blue"></i></div>Jonathan</div>' +
            '<div class="card-content">' +
            '<div class="card-content-inner">Beste Emanuel, uw verzoek is geaccepteerd en uw afspraak is 25-4-2017 11:45AM</div>' +
            '</div>' +
            '</div>';
        } else if (data[i].state == 'cancelled') {
          content = '<div class="card verzoek_weigeren">' +
            '<div class="card-header"><div class="links"><i class="ion-eye color-blue"></i></div>Jonathan</div>' +
            '<div class="card-content">' +
            '<div class="card-content-inner">Beste Emanuel, uw verzoek is geannuleerd</div>' +
            '</div>' +
            '</div>';
        }

        $$('#appointments').append(content);

      });
      myApp.hideIndicator();
      myApp.pullToRefreshDone();
    });
  };

  load_appointments();

  $$("#accept_knop").click(function() { // Accept button
    load_appointments();
    // $$(".verzoek_open").addClass("verzoek_accept");
    // $$("#knoppen_verzoek").hide();
  });

  $$("#cancel_knop").click(function() { // Cancel button
    load_appointments();
    // $$(".verzoek_open").addClass("verzoek_weigeren");
    // $$("#knoppen_verzoek").hide();
  });

  var ptrContent = $$('.pull-to-refresh-content');

  // Add 'refresh' listener on it
  ptrContent.on('refresh', function(e) {
    load_appointments();
  });

});

function appointment_respond(id, cancelled) {
  // Respond to an appointment
  $$.post('../../backend/api/index.php/appointments/respond', {
    id: id,
    cancelled: cancelled,
    fully_booked: 0,
    user_type: 'patient'
  }, function(data) {
    data = JSON.parse(data);
    if (data.result == 'success') {

      if (data.cancelled == '1') {
        myApp.alert("Afspraak geannulleerd");
      }
      // else {
      //   myApp.alert("Afspraak gemaakt");
      // }
      // mainView.router.loadPage('views/home.html');
      load_appointments();

    } else if (data.result == 'failed') {
      myApp.alert("Fout opgetreden!");
    }

  });
}