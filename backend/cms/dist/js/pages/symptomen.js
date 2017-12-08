var symptomen = {};


symptomen.returnElement = function(id, name, picture){
	return '<tr>\
				<td class="table-image"><img src="'+picture+'"></td>\
				<td>'+name+'</td>\
				<td>\
					<div class="pull-right">\
						<button type="button" class="btn btn-default" data-toggle="modal" data-target="#modal" data-type="edit" data-id="'+id+'"><i class="fa fa-pencil text-green"></i></button>\
						<button type="button" class="btn btn-default delete" data-id="'+ id +'"><i class="fa fa-trash text-red"></i></button>\
					</div>\
				</td>\
			</tr>';
}


symptomen.showAll = function(){
	var containerDiv = "#containerDiv",
		dataTable = "#dataTable";

	dbconnection.read("symptomen", null).then( function(data){
		$(containerDiv).empty();

		$.each( data, function(key, val){
			$(containerDiv).append(symptomen.returnElement(val.id, val.name, val.picture));
		});

		$(dataTable).DataTable();
	});
}

symptomen.delete = function(id){
	var result = dbconnection.delete("symptomen", id);

	if (result != null) {
			result.then( function(data){
			if(data == 1) {
		        symptomen.showAll();
		    } else if(data == 0) {
		        alert('something went wrong, try again later');
		    }else{
		    	console.log("unidentified error");
		    	console.log(data);
		    }
		})
	}
}

symptomen.setModal = function(el, modal){
	var sendId = null;

	// modal triggers zonder id zijn afkomstig van voeg toe, die geven we null als sendID
	if (el.data('id') > 0 && el.data('id') != undefined) {
		sendId  = el.data('id');
	}

	var uploader = new qq.FileUploader({
	    element: document.getElementById('symptom-img-file-uploader'),
	    action: app.serverFolder+'/api/symptom_img_upload.php',
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
	    	modal.find('.modal-image').html('<img src="'+responseJSON.fileUrl+'" alt="symptom+image">');
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


	// console.log(el.data('type'));

	switch(el.data('type')){
	  	case 'edit':
			dbconnection.read("symptomen", el.data('id')).then( function(data){
				// console.log(data);
				modal.find('.modal-title').text(data[0].name);
				modal.find('input#name').val(data[0].name);
				modal.find('.modal-image').html('<img src="'+data[0].picture+'" alt="symptom+image">');

				for (var i = 0; i < symptomen.editors.length; i++) {
					var o = CKEDITOR.instances[symptomen.editors[i].editor];
					var setData = data[0][symptomen.editors[i].data];
					var	instanceName = symptomen.editors[i].editor;

					if (o == undefined) {
						// console.log('replacing editor ' + instanceName);

						var instance = CKEDITOR.replace( instanceName);
						instance.setData(setData);
					}
					
				}
			});
	  	break;

	  	case 'add':
	  		// in case er iets moet gebeuren als men een symptom add
	  		// set modal editor instances
			for (var i = 0; i < symptomen.editors.length; i++) {
				var o = CKEDITOR.instances[symptomen.editors[i].editor];

				if (o == undefined) {
					// console.log('replacing editor '+ symptomen.editors[i].editor);
					CKEDITOR.replace( symptomen.editors[i].editor );
				}
			}
	  	break;
	}
}

symptomen.submitModal = function(el, modal, data){
	var err_el = modal.find('.modal-footer'); //error element

	// console.log(data);

	// check if name provided
	if (data.name == "") {
		app.showError(err_el, "name cannot be empty for symptom! please provide a name for symptom");
	}
	// check if picture provided
	else if(data.picture == undefined || data.picture == ""){
		app.showError(err_el, "picture must be provided for symptom!");
	}
	// check if description provided
	else if (data.description == "") {
		app.showError(err_el, "description cannot be empty for symptom! please provide a description for symptom");
	}
	// check if symtpoms given
	else if (data.symptoms == "") {
		app.showError(err_el, "symptoms cannot be empty for symptom! please provide symptoms for symptom");
	}
	// check if actions provided
	else if (data.actions == "") {
		app.showError(err_el, "actions cannot be empty for symptom! please provide actions for symptom");
	}
	// check if help provided
	else if (data.get_help == "") {
		app.showError(err_el, "when to get help cannot be empty for symptom! please give information about when to get help");
	}
	//now send data
	else{

	  	var result = el.data('type') == 'add' ? 
	  		dbconnection.create("symptomen", data) : dbconnection.update("symptomen", el.data('id'), data);

		if (result != null) {
				result.then( function(data){

				if(data == 1) {
			        symptomen.showAll();
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

symptomen.getModalData = function(modal){
	var data = {};

	data.name = modal.find('#name').val();
	data.picture = modal.find('.modal-image').find('img').attr('src');

	for (var i = 0; i < symptomen.editors.length; i++) {
		data[symptomen.editors[i].data] = CKEDITOR.instances[symptomen.editors[i].editor].getData();
	}

	return data;
}

symptomen.hideModal = function(el, modal){

	//remove editor instances
	for (var i = 0; i < symptomen.editors.length; i++) {
		var o = CKEDITOR.instances[symptomen.editors[i].editor];
		if (o) {
			// console.log('setting data empty');
			o.setData('');
			// console.log('destroying insatnce');
			o.destroy(true);
     	}
	}

	modal.find('.modal-title').text('Add new Symptom');
	modal.find('input#name').val('');
	modal.find('.modal-image').html('<strong>No Symptom Image</strong>');
	modal.find('a:first').tab('show');
}

// ckeditors from symptomen modal
symptomen.editors = [{editor: 'editor-omschrijving', data: 'description'}, {editor: 'editor-symptomen', data: 'symptoms'}, {editor: 'editor-doen', data: 'actions'}, {editor: 'editor-bezoek', data: 'get_help'}];



symptomen.init = function(){
	console.log('init symptomen');

	var modal = "#modal";
	var modalForm = "#modalForm";

	symptomen.showAll();

	$(document).off('click', '.delete').on('click', '.delete', function(){
		var id = $(this).data('id');
		symptomen.delete(id);	
	});

	$(modal).on('shown.bs.modal', function (event) {
	  symptomen.setModal($(event.relatedTarget), $(this));

	  var currentModal = $(this);

	  $(this).find(modalForm).off('submit').on('submit', function(e){
	  	e.preventDefault();
	  	
	  	symptomen.submitModal($(event.relatedTarget), currentModal, symptomen.getModalData(currentModal));
	  })
	});

	$(modal).on('hidden.bs.modal', function (event) {
	  	symptomen.hideModal($(event.relatedTarget), $(this));
	});
}