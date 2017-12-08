<!-- Content Header (Page header) -->
<section class="content-header">
  <h1>
    Specialisten
    <small>Control panel</small>
  </h1>
  <ol class="breadcrumb">
    <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
    <li class="active">Specialisten</li>
  </ol>
</section>

<!-- Main content -->
<section class="content">

<div class="row">
	<div class="col-xs-12">
		

 		<div class="box">
            <!-- /.box-header -->
            <div class="box-header">
            	<a href="" data-toggle="modal" data-target="#modal" data-type="add" class="btn btn-flat btn-success pull-right"><i class="fa fa-plus"></i> Voeg toe</a>	
            </div>

            <div class="box-body">
              <table id="dataTable" class="table table-hover">
                <thead>
                <tr>
                  <th>Picture</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Speciality</th>
                  <th>Email</th>
                  <th></th>
                </tr>
                </thead>
                <tbody id="containerDiv">

                </tbody>
                <tfoot>
                <tr>
                  <th>Picture</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Speciality</th>
                  <th>Email</th>
                  <th></th>
                </tr>
                </tfoot>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->

	</div>
</div>

<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><i class="fa fa-close"></i></span></button>
        <h4 class="modal-title" id="modalLabel">Add new Specialist</h4>
      </div>
      <form id="modalForm">
      <div class="modal-body">
      	<div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">Detail</a></li>
              <li class=""><a href="#tab_2" data-toggle="tab" aria-expanded="false">Contact</a></li>
              <li class=""><a href="#tab_3" data-toggle="tab" aria-expanded="false">Location</a></li>
            </ul>
            <div class="tab-content">
            	<div class="tab-pane active" id="tab_1">
            		<div class="row mb-20">
  			      		<div class="col-lg-4 col-sm-6">
                    <div class="modal-image">
                      <strong>No Image</strong>
                    </div>
  			      		</div>
  			      		<div class="col-lg-8 col-sm-6">
  			      			<div id="specialist-img-file-uploader">       
  			                  <noscript>          
  			                      <p>Please enable JavaScript to use file uploader.</p>
  			                      <!-- or put a simple form for upload here -->
  			                  </noscript>         
  			                  </div>
  			      		</div>
			      	</div>

				      <div class="row">
				      	<div class="col-lg-6 col-sm-12">
				      		<div class="form-group">
						        <label for="firstname" class="control-label">Firstname:</label>
						        <input type="text" class="form-control" name="firstname" id="firstname" placeholder="Firstname ..." >
						      </div>
				      	</div>

				      	<div class="col-lg-6 col-sm-12">
				      		<div class="form-group">
						        <label for="lastname" class="control-label">Lastname:</label>
						        <input type="text" class="form-control" name="lastname" id="lastname" placeholder="Lastname ..." >
						      </div>
				      	</div>
				      </div>

              <div class="form-group">
                <label for="gender" class="control-label">Gender:</label>

                <select name="gender" id="gender" class="form-control" style="width: 100%;" tabindex="-1" aria-hidden="true">
                  <option selected value="">Select gender ...</option>
                  <option value="m">M</option>
                  <option value="v">V</option>
                </select>
              </div>

				      <div class="form-group">
				        <label for="specialist_type" class="control-label">Specialist type:</label>

				       	<select name="specialist_type" id="specialist_type" class="form-control" style="width: 100%;" tabindex="-1" aria-hidden="true">
				       		<option selected value="">Select type ...</option>
				       	</select>
				      </div>
            	</div>

            	<div class="tab-pane" id="tab_2">
            		<div class="form-group">
				        <label for="email" class="control-label">Email:</label>
				        <input type="email" class="form-control" name="email" id="email" placeholder="Email ..." >
				      </div>

				      <div class="form-group">
				        <label for="phone" class="control-label">Phone:</label>
				        <input type="number" class="form-control" name="phone" id="phone" placeholder="Phone ..." >
				      </div>
            	</div>

            	<div class="tab-pane" id="tab_3">
                <div class="form-group">
                  <label for="address" class="control-label">Address:</label>
                  <input type="text" class="form-control" name="address" id="address" placeholder="Address ..." >
                </div>

            		<div class="row">
				      	<div class="col-lg-6 col-sm-12">
				      		<div class="form-group">
						        <label for="latitude" class="control-label">Latitude:</label>
						        <input type="number" class="form-control" name="latitude" id="latitude" step="0.000001" placeholder="Latitude ..." >
						      </div>
				      	</div>

				      	<div class="col-lg-6 col-sm-12">
				      		<div class="form-group">
						        <label for="longitude" class="control-label">Longtitude:</label>
						        <input type="number" class="form-control" name="longitude" id="longitude" step="0.000001" placeholder="Longitude ..." >
						      </div>
				      	</div>
				      	<div class="col-lg-12">
				      		<h3>Pak de coordinaten van een plek</h3>
					      	<ol>
					      		<li>Ga naar <a href="https://www.google.com/maps/" target="_blank">Google maps</a></li>
					      		<li>rechterklik op de plek en vervolgens op "Wat is hier?"</li>
					      		<li>Pak de coordinaten van de kaart die onderaan de scherm verschijnen</li>
					      		<li>Vul die hier in</li>
					      	</ol>
				      	</div>
				      </div>
            	</div>
            </div>
        </div>
	    
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-success">Save</button>
      </div>
      </form>
    </div>
  </div>
</div>

</section><!-- /.content -->