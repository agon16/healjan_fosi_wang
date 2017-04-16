<?php

$app->group('/speclialist', function() {

	$this->get('/get', function() {

		require 'db.php'; //DB connection

		$sql = "SELECT * FROM v_specialists";
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
		$speclialist_id = $args['id'];

		$sql = "SELECT * FROM v_specialists WHERE user_id = '$speclialist_id'";
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
		$name 			= $_POST['name'];
		$description 	= $_POST['description'];
		$picture 		= $_POST['picture'];
		$address		= $_POST['address'];
		$latitude 		= $_POST['latitude'];
		$longitude		= $_POST['longitude'];

		$sql_type = "INSERT INTO specialist_type (name, description) VALUES ('$name', '$description')";
		$query_type = $conn->query($sql_type);

		$sql_read = "SELECT id FROM specialist_type WHERE name = '$name' AND description = '$description'";
		$query_read = $conn->query($sql_read);

		if($query_type) {
			$specialist_id = $query_read->fetch_assoc();
			$specialist_id = $specialist_id['id'];
			$conn->query("INSERT INTO specialist (specialist_type_id, profile_picture, latitude, longitude, created_at) VALUES ('$specialist_id', '$picture', '$latitude', '$longitude', NOW()");
		} else {
			echo 0;
		}

	});

	$this->post('/remove', function() { //Remove user by specified ID

		require 'db.php'; //DB connection

		//Params
		$id = $_POST['id'];

		$sql = "DELETE FROM specialist WHERE id = '$id'";
		$query = $conn->query($sql);

		if($query) {
			echo 1;
		} else {
			echo 0;
		}

	});

});

?>