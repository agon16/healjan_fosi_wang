<?php

$app->post('/login', function() {

	require 'db.php'; //DB connection

	//Params
	$phone 		= $_POST['phone'];
	$password 	= sha1($_POST['password']);
	// $password 	= $_POST['password'];

	$sql = "SELECT * FROM user WHERE phone = '$phone' AND password = '$password'";
	$query = $conn->query($sql);
	
	if($query->num_rows == 1) {
		$array = array(); //Create array

		while ($result = $query->fetch_assoc()) {
			$array[] = $result;
		}

		//JSON encode
		$array = json_encode($array);
		print_r($array);
	} else {
		print_r(json_encode(array("result" => "false")));
	}

});

$app->group('/users', function() {

	$this->get('/get', function() {

		require 'db.php'; //DB connection

		$sql = "SELECT * FROM user";
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
		$user_id = $args['id'];

		$sql = "SELECT * FROM user WHERE id = '$user_id'";
		$query = $conn->query($sql);
		$array = array(); //Create array

		while ($result = $query->fetch_assoc()) {
			$array[] = $result;
		}

		//JSON encode
		$array = json_encode($array);
		print_r($array);

	});

	$this->post('/add', function() { //Add user

		require 'db.php'; //DB connection

		//Params
		$id 		= $_POST['id'];
		// $user_type 	= $_POST['user_type'];
		$user_type 	= 1;
		$first_name = $_POST['first_name'];
		$last_name 	= $_POST['last_name'];
		$gender 	= $_POST['gender'];
		$phone 		= $_POST['phone'];
		$email 		= $_POST['email'];
		$password 	= sha1($_POST['password']);
		// $status 	= $_POST['status'];

		$sql = "INSERT INTO user (user_type_id, first_name, last_name, gender, phone, email, password, status, created_at) VALUES ('$user_type', '$first_name', '$last_name', '$gender', '$phone', '$email', '$password', '$status', NOW() )";

		if($conn->query($sql)) {
			echo 1;
		} else {
			echo 0;
		}

	});

	$this->post('/remove', function() { //Remove user by specified ID

		require 'db.php'; //DB connection

		//Params
		$user_id = $_POST['user_id'];

		$sql = "DELETE FROM user WHERE id = '$user_id'";
		$query = $conn->query($sql);

		if($query) {
			echo 1;
		} else {
			echo 0;
		}

	});

	$this->post('/modify', function() { //Modify user

		require 'db.php'; //DB connection

		//Params
		$id 		= $_POST['id'];
		$user_type 	= $_POST['user_type'];
		$firstname 	= $_POST['firstname'];
		$lastname 	= $_POST['lastname'];
		$gender 	= $_POST['gender'];
		$phone 		= $_POST['phone'];
		$email 		= $_POST['email'];
		$password 	= $_POST['password'];
		$status 	= $_POST['status'];

		$sql = "UPDATE users SET user_type = '$user_type', firstname = '$firstname', lastname = '$lastname', gender = '$gender', phone = '$phone', email = '$email', password = '$password', status = '$status', created_at = NOW() WHERE id = '$id'";
		$query = $conn->query($sql);

		if($query) {
			echo 1;
		} else {
			echo 0;
		}

	});

});



$app->group('/cms', function() { // cms user api's

	$this->post('/login', function() { //login for cms users

	require 'db.php'; //DB connection

	//Params
	$email 		= $_POST['email'];
	$password 	= sha1($_POST['password']);
	// $password 	= $_POST['password'];

	$sql = "SELECT * FROM user WHERE email = '$email' AND password = '$password'";
	$query = $conn->query($sql);
	
	if($query->num_rows == 1) {
		$array = array(); //Create array

		while ($result = $query->fetch_assoc()) {
			$array[] = $result;
		}

		//JSON encode
		$array = json_encode($array);
		print_r($array);
	} else {
		print_r(json_encode(array("result" => "false")));
	}

});
});

?>