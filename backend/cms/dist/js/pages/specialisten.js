var specialisten = {};

specialisten.returnElement = function(id, picture, firstname, lastname, speciality, email){
	return '<tr>\
				<td class="table-image"><img src="'+picture+'"></td>\
				<td>'+firstname+'</td>\
				<td>'+lastname+'</td>\
				<td>'+speciality+'</td>\
				<td>'+email+'</td>\
				<td>\
					<div class="pull-right">\
						<button type="button" class="btn btn-default" data-toggle="modal" data-target="#modal" data-type="edit" data-id="'+id+'"><i class="fa fa-pencil text-green"></i></button>\
						<button type="button" class="btn btn-default delete" data-id="'+ id +'"><i class="fa fa-trash text-red"></i></button>\
					</div>\
				</td>\
			</tr>';
}

specialisten.showAll = function(){
	var containerDiv = "#containerDiv",
		dataTable = "#dataTable";

	dbconnection.read("specialisten", null).then( function(data){
		$(containerDiv).empty();

		$.each( data, function(key, val){
			$(containerDiv).append(specialisten.returnElement(val.user_id, val.profile_picture, val.firstname, val.lastname, app.capitalize(val.speciality), val.email));
		});

		$(dataTable).DataTable();
	});
}

specialisten.delete = function(id){
	var result = dbconnection.delete("specialisten", id);

	if (result != null) {
			result.then( function(data){
			if(data == 1) {
		        specialisten.showAll();
		    } else if(data == 0) {
		        alert('something went wrong, try again later');
		    }else{
		    	console.log("unidentified error");
		    	console.log(data);
		    }
		})
	}
}

specialisten.setModal = function(el, modal){

	modal.find('#specialist_type').select2({
		minimumResultsForSearch: 20 
	});

	modal.find('#gender').select2({
		minimumResultsForSearch: Infinity

	});

	var sendId = null;

	// modal triggers zonder id zijn afkomstig van voeg toe, die geven we null als sendID
	if (el.data('id') > 0 && el.data('id') != undefined) {
		sendId  = el.data('id');
	}

	var uploader = new qq.FileUploader({
	    element: document.getElementById('specialist-img-file-uploader'),
	    action: app.serverFolder+'/api/specialist_img_upload.php',
	    params: {
	    	id: sendId
	    },
	    allowedExtensions: ['jpg', 'jpeg', 'png'],        
	    // sizeLimit: 0, // max size   
	    // minSizeLimit: 0, // min size
	    // debug: false,
	    onSubmit: function(id, fileName){},
	    onProgress: function(id, fileName, loaded, total){},
	    onComplete: function(id, fileName, responseJSON){
	    	// console.log(responseJSON);
	    	modal.find('.modal-image').html('<img src="'+responseJSON.fileUrl+'" alt="profile+image">');
	         $(".qq-upload-list").hide();
	        template: '<ul class="qq-upload-list">\
	                    <li class=" qq-upload-success">\
	                    <span class="qq-progress-bar" style="width: 100%;"></span>\
	                    <span class="qq-upload-file">Upload complete</span>\
	                    <span class="qq-upload-size" style="display: inline;"></span>\
	                    <span class="qq-upload-failed-text">Upload failed</span>\
	                    </li>\
	                    </ul>'
	    },
	    onCancel: function(id, fileName){},
	    onError: function(id, fileName, xhr){}
	}); 

	switch(el.data('type')){
	  	case 'edit':
			dbconnection.read("specialisten", el.data('id')).then( function(data){

				console.log(data);

				var title = app.capitalize(data[0].speciality)+ ", "+data[0].firstname+" "+data[0].lastname;

				modal.find('.modal-title').text(title);
				modal.find('.modal-image').html('<img src="'+data[0].profile_picture+'" alt="specialist+image">');
				modal.find('input#firstname').val(data[0].firstname);
				modal.find('input#lastname').val(data[0].lastname);
				modal.find('select#gender').val(data[0].gender);
				modal.find('select#gender').trigger('change.select2');
				modal.find('select#specialist_type').val(data[0].specialist_type_id);
				modal.find('select#specialist_type').trigger('change.select2');

				modal.find('input#phone').val(data[0].phone);
				modal.find('input#email').val(data[0].email);

				modal.find('input#address').val(data[0].address);
				modal.find('input#longitude').val(data[0].longitude);
				modal.find('input#latitude').val(data[0].latitude);
				
			});
	  	break;

	  	case 'add':

	  	break;
	}

}

specialisten.submitModal = function(el, modal, data){
	var err_el = modal.find('.modal-footer'); //error element

	console.log(data);

	if (data.picture == undefined || data.picture == "") {
		app.showError(err_el, "please provide specialist with fitting image");
	}else if (data.firstname == "") {
		app.showError(err_el, "no firstname for specialist?");
	}else if (data.lastname == "") {
		app.showError(err_el, "no lastname for specialist?");
	}else if (data.gender == "") {
		app.showError(err_el, "select gender for specialist");
	}else if (data.specialist_type == "") {
		app.showError(err_el, "specialist must be provided with a speciality");
	}else if (data.email == "") {
		app.showError(err_el, "no email for specialist?");
	}else if (data.phone == "") {
		app.showError(err_el, "no phone for specialist?");
	}else if (data.address == "") {
		app.showError(err_el, "no address for specialist?");
	}else if (data.latitude == "") {
		app.showError(err_el, "no latitude, please make sure users can find specialist");
	}else if (data.longitude == "") {
		app.showError(err_el, "no longitude, please make sure users can find specialist");
	}else{

		var result = el.data('type') == 'add' ? 
	  		dbconnection.create("specialisten", data) : dbconnection.update("specialisten", el.data('id'), data);

		if (result != null) {
				result.then( function(data){

				if(data == 1) {
			        specialisten.showAll();
	  				modal.modal('hide');
			    } else if(data == 0) {
			        alert('something went wrong, try again later');
			    }else{
			    	console.log("unidentified error");
			    	console.log(data);
			    }
			})
		}

	}

}

specialisten.getModalData = function(modal){
	var data = {};

	data.picture = modal.find('.modal-image').find('img').attr('src');
	data.firstname = modal.find('input#firstname').val();
	data.lastname = modal.find('input#lastname').val();
	data.gender = modal.find('select#gender').val();
	data.specialist_type = modal.find('select#specialist_type').val();
	data.email = modal.find('input#email').val();
	data.phone = modal.find('input#phone').val();
	data.address = modal.find('input#address').val();
	data.latitude = modal.find('input#latitude').val();
	data.longitude = modal.find('input#longitude').val();

	return data;
}

specialisten.hideModal = function(el, modal){
	modal.find('.modal-title').text('Add new Specialist');
	// modal.find('input#name').val('');
	// modal.find('.modal-image').html('<strong>No Symptom Image</strong>');
	modal.find('a:first').tab('show');
}


specialisten.init =  function(){
	console.log('init specialisten');

	var modal = "#modal";
	var modalForm = "#modalForm";

	specialisten.showAll();

	// $(document).on('click', '.delete', function(){
	// 	var id = $(this).data('id');
	// 	specialisten.delete(id);	
	// });

	$(modal).on('show.bs.modal', function (event) {
	  var 	el = $(event.relatedTarget),
	  		currentModal = $(this);

	  specialisten.setModal(el, $(this));

	  $(this).find(modalForm).off('submit').on('submit', function(e){
	  	e.preventDefault();

	  	specialisten.submitModal($(event.relatedTarget), currentModal, specialisten.getModalData(currentModal));
	  })
	});

	$(modal).on('hidden.bs.modal', function (event) {
	  	specialisten.hideModal($(event.relatedTarget), $(this));
	});

	dbconnection.read("specialist_type", null).then( function(data){
		$.each(data, function(key, val){
			var option = '<option value="'+val.id+'">'+app.capitalize(val.name)+'</option>';
			$('select#specialist_type').append(option);
		});
	});
}