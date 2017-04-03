<?php

$app->post('/login', function() {

	require 'db.php'; //DB connection

	//Params
	$email = $_POST['email'];
	$password = sha1($_POST['password']);

	$sql = "SELECT * FROM users";
	$query = $conn->query($sql);
	$array = array(); //Create array

	while ($result = $query->fetch_assoc()) {
		$array[] = $result;
	}

	//JSON encode
	$array = json_encode($array);
	print_r($array);

});

$app->group('/users', function() {

	$this->get('/get', function() {

		require 'db.php'; //DB connection

		$sql = "SELECT * FROM users";
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

		$sql = "SELECT * FROM users WHERE id = '$user_id'";
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
		$user_type 	= $_POST['user_type'];
		$firstname 	= $_POST['firstname'];
		$lastname 	= $_POST['lastname'];
		$gender 	= $_POST['gender'];
		$phone 		= $_POST['phone'];
		$email 		= $_POST['email'];
		$password 	= $_POST['password'];
		$status 	= $_POST['status'];

		$sql = "INSERT INTO users (user_type, firstname, lastname, gender, phone, email, password, status, created_at) VALUES ('$user_type', '$firstname', '$lastname', '$gender', '$phone', '$email', '$password', '$status', NOW())";
		$query = $conn->query($sql);

		if($query) {
			echo 1;
		} else {
			echo 0;
		}

	});

	$this->post('/remove', function() { //Remove user by specified ID

		require 'db.php'; //DB connection

		//Params
		$user_id = $_POST['user_id'];

		$sql = "DELETE FROM users WHERE id = '$user_id'";
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

?>