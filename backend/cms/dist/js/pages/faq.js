var faq = {};

faq.returnElement =  function(id, question, answer){

	return '<tr>\
				<td>'+question+'</td>\
				<td>'+answer+'</td>\
				<td>\
					<div class="pull-right">\
						<button type="button" class="btn btn-default" data-toggle="modal" data-target="#modal" data-type="edit" data-id="'+id+'"><i class="fa fa-pencil text-green"></i></button>\
						<button type="button" class="btn btn-default delete" data-id="'+ id +'"><i class="fa fa-trash text-red"></i></button>\
					</div>\
				</td>\
			</tr>';
}

faq.showAll =  function(){
	var containerDiv = "#containerDiv",
		dataTable = "#dataTable";

	dbconnection.read("faq", null).then( function(data){
		$(containerDiv).empty();

		$.each( data, function(key, val){
			$(containerDiv).append(faq.returnElement(val.id, val.question, val.answer));
		});

		$(dataTable).DataTable();
	});
}

faq.delete =  function(id){
	var result = dbconnection.delete("faq", id);

	if (result != null) {
			result.then( function(data){
			if(data == 1) {
		        faq.showAll();
		    } else if(data == 0) {
		        alert('something went wrong, try again later');
		    }else{
		    	console.log("unidentified error");
		    	console.log(data);
		    }
		})
	}
}

faq.setModal = function(el, modal){

	switch(el.data('type')){
	  	case 'edit':
		  	dbconnection.read("faq", el.data('id')).then( function(data){
		  		$.each( data, function(key, val){
					modal.find('.modal-title').text(data[0].question);
					modal.find('input#question').val(data[0].question);
					modal.find('textarea#answer').val(data[0].answer);
				});
		  	});
	  	break;

	  	case 'add':
	  		modal.find('.modal-title').text('Add new FAQ');
	  		modal.find('input#question').val('');
			modal.find('textarea#answer').val('');
	  	break;
	  }
}

faq.submitModal =  function(el, modal, data){

	var result = el.data('type') == 'add' ? dbconnection.create("faq", data) : dbconnection.update("faq", el.data('id'), data);

	if (result != null) {
			result.then( function(data){

			if(data == 1) {
		        faq.showAll();
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


faq.init = function(page){
	console.log('init faq');

	var modal = "#modal";
	var modalForm = "#modalForm";

	faq.showAll();

	$(document).off('click', '.delete').on('click', '.delete', function(){
		var id = $(this).data('id');
		faq.delete(id);	
	});

	$(modal).on('show.bs.modal', function (event) {
	  var 	el = $(event.relatedTarget),
	  		currentModal = $(this);

	  faq.setModal(el, $(this));

	  $(this).find('#modalForm').off('submit').on('submit', function(e){
	  	e.preventDefault();

	  	var data = app.objectifyForm($(this).serializeArray());

	  	faq.submitModal(el, currentModal, data);
	  })
	});
}