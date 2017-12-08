<!-- Content Header (Page header) -->
<section class="content-header">
  <h1>
    Symptomen
    <small>Control panel</small>
  </h1>
  <ol class="breadcrumb">
    <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
    <li class="active">Symptomen</li>
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
                  <th>Name</th>
                  <th></th>
                </tr>
                </thead>
                <tbody id="containerDiv">

                </tbody>
                <tfoot>
                <tr>
                  <th>Picture</th>
                  <th>Name</th>
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
        <h4 class="modal-title" id="faqModalLabel"></h4>
      </div>
      <form id="modalForm">
      <div class="modal-body">

        <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">Detail</a></li>
              <li class=""><a href="#tab_2" data-toggle="tab" aria-expanded="false">Omschrijving</a></li>
              <li class=""><a href="#tab_3" data-toggle="tab" aria-expanded="false">Symptomen</a></li>
              <li class=""><a href="#tab_4" data-toggle="tab" aria-expanded="false">Te doen</a></li>
              <li class=""><a href="#tab_5" data-toggle="tab" aria-expanded="false">Bezoek huisarts</a></li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="tab_1">
                <div class="form-group">
                  <label for="name" class="control-label">Name:</label>
                  <input type="text" class="form-control" name="name" id="name" placeholder="Name ..." >
                </div>
            
                <div class="row">
                  <div class="col-xs-12">
                    <div class="modal-image">
                        <!-- <img src="" id="symptom_img" alt="symptom image"> -->
                        <strong>No Symptom Image</strong>
                    </div>
                  </div>
                  <div class="col-xs-12 form">
                    <div id="symptom-img-file-uploader">       
                      <noscript>          
                          <p>Please enable JavaScript to use file uploader.</p>
                          <!-- or put a simple form for upload here -->
                      </noscript>         
                      </div>
                  </div>
                </div>
              </div>
              <!-- /.tab-pane -->
              <div class="tab-pane" id="tab_2">
                <textarea name="editor-omschrijving" id="editor-omschrijving" cols="30" rows="10"></textarea>
              </div>
              <!-- /.tab-pane -->
              <div class="tab-pane" id="tab_3">
                <textarea name="editor-symptomen" id="editor-symptomen" cols="30" rows="10"></textarea>
              </div>
              <!-- /.tab-pane -->
              <div class="tab-pane" id="tab_4">
                <textarea name="editor-doen" id="editor-doen" cols="30" rows="10"></textarea>
              </div>
              <!-- /.tab-pane -->
              <div class="tab-pane" id="tab_5">
                <textarea name="editor-bezoek" id="editor-bezoek" cols="30" rows="10"></textarea>
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

</section><!-- /.content