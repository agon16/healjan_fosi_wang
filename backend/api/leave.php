<?php

$app->group('/leave', function() {

	$this->get('/get', function() {

		require 'db.php'; //DB connection

		$sql = "SELECT * FROM v_leave";
		$query = $conn->query($sql);
		$array = array(); //Create array

		while ($result = $query->fetch_assoc()) {
			$array[] = $result;
		}

		//JSON encode
		$array = json_encode($array);
		print_r($array);

	});

	$this->get('/get/{id}', function($request, $response, $args) { //Get user by specified ID

		require 'db.php'; //DB connection

		//Arguments
		$leave_id = $args['id'];

		$sql = "SELECT * FROM v_leave WHERE id = '$leave_id'";
		$query = $conn->query($sql);
		$array = array(); //Create array

		while ($result = $query->fetch_assoc()) {
			$array[] = $result;
		}

		//JSON encode
		$array = json_encode($array);
		print_r($array);

	});

	$this->post('/add', function() { //Add leave

		require 'db.php'; //DB connection

		//Params
		$name 		= $_POST['name'];
		$date_from 	= $_POST['date_from'];
		$date_to 	= $_POST['date_to'];

		$sql_type = "INSERT INTO leave_type (name) VALUES ('$name')";
		$query_type = $conn->query($sql_type);

		$sql_read = "SELECT id FROM leave_type WHERE name = '$name'";
		$query_read = $conn->query($sql_read);

		if($query_type) {
			$leave_id = $query_read->fetch_assoc();
			$leave_id = $leave_id['id'];
			$conn->query("INSERT INTO leave (leave_type_id, date_from, date_to , created_at) VALUES ('$leave_id', '$date_from', '$date_to', NOW())";
		} else {
			echo 0;
		}

	});

	$this->post('/remove', function() { //Remove user by specified ID

		require 'db.php'; //DB connection

		//Params
		$id = $_POST['id'];

		$sql = "DELETE FROM leave WHERE id = '$id'";
		$query = $conn->query($sql);

		if($query) {
			echo 1;
		} else {
			echo 0;
		}

	});

	$this->post('/modify', function() { //Modify leave

		require 'db.php'; //DB connection

		//Params
		$id 		= $_POST['id'];
		$name 		= $_POST['name'];
		$date_from 	= $_POST['date_from'];
		$date_to 	= $_POST['date_to'];

		$sql_type = "UPDATE leave_type SET name = '$name' WHERE id = '$id'";
		$query_type = $conn->query($sql_type);

		$sql_read = "SELECT id FROM leave_type WHERE name = '$name'";
		$query_read = $conn->query($sql_read);

		if($query_type) {
			$leave_id = $query_read->fetch_assoc();
			$leave_id = $leave_id['id'];
			$conn->query("UPDATE leave SET leave_type_id = '$leave_id', date_from = '$date_from', date_to = '$date_to' , created_at = NOW() WHERE id = '$id'";
		} else {
			echo 0;
		}

	});

});

?>