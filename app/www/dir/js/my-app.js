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
  mainView.router.loadPage('views/ziek1.html'); 
}).trigger();

// onPageInit
myApp.onPageInit('home', function (page) {
  console.log('home initialized');

});

// AfterPageAnimation
myApp.onPageAfterAnimation('home', function (page) {
  console.log('home after animation');

  $$('.floating-button, .overlay').on('click', function(){
    $$('.page-content').toggleClass('legende-open');
  })
});

// calender
