<!-- Content Header (Page header) -->
<section class="content-header">
  <h1>
    FaQ
    <small>Control panel</small>
  </h1>
  <ol class="breadcrumb">
    <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
    <li class="active">FaQ</li>
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
                  <th>Question</th>
                  <th>Answer</th>
                  <th></th>
                </tr>
                </thead>
                <tbody id="containerDiv">

                </tbody>
                <tfoot>
                <tr>
                  <th>Question</th>
                  <th>Answer</th>
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
        <h4 class="modal-title" id="modalLabel"></h4>
      </div>
      <form id="modalForm">
      <div class="modal-body">
	      <div class="form-group">
	        <label for="question" class="control-label">Question:</label>
	        <input type="text" class="form-control" name="question" id="question" placeholder="Question ..." >
	      </div>
	      <div class="form-group">
	        <label for="answer" class="control-label">Answer:</label>
	        <textarea class="form-control" name="answer" id="answer" placeholder="Answer ..." ></textarea>
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