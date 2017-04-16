function loadPage(page){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("content").innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET", page + '.php', true);
    xmlhttp.send();

    try {
        window[page]();
    }
    catch(err) {
        var f = new Function('page', 'return console.log("please create function for " + page + " page!");');
		f(page);
    }
//     
}

loadPage('dashboard');

$('.left-nav-item').click(function(){
	var pageName = this.getAttribute('data-page');
	$(this).closest('li').addClass('active').siblings().removeClass('active');

	$('.sidebar-mini').removeClass('sidebar-open');
	loadPage(pageName);
});

$('.nav-item').click(function(){
	var pageName = this.getAttribute('data-page');
	$('.sidebar-menu li.active').removeClass('active');
	loadPage(pageName);
});



