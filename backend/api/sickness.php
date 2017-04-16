<?php

$app->group('/sickness', function() {

	$this->get('/get', function() {

		require 'db.php'; //DB connection

		$sql = "SELECT * FROM sickness";
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
		$sickness_id = $args['id'];

		$sql = "SELECT * FROM sickness WHERE id = '$sickness_id'";
		$query = $conn->query($sql);
		$array = array(); //Create array

		while ($result = $query->fetch_assoc()) {
			$array[] = $result;
		}

		//JSON encode
		$array = json_encode($array);
		print_r($array);

	});

	$this->post('/add', function() { //Add sickness

		require 'db.php'; //DB connection

		//Params
		$name 			= $_POST['name'];
		$picture 		= $_POST['picture'];
		$description 	= $_POST['description'];
		$symptoms 		= $_POST['symptoms'];
		$actions 		= $_POST['actions'];
		$get_help 		= $_POST['get_help'];

		$sql = "INSERT INTO sickness (name, picture, description, symptoms, actions, get_help created_at) VALUES ('$name', '$picture', '$description', '$symptoms', '$actions', '$get_help', NOW())";
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
		$id = $_POST['id'];

		$sql = "DELETE FROM sickness WHERE id = '$id'";
		$query = $conn->query($sql);

		if($query) {
			echo 1;
		} else {
			echo 0;
		}

	});

	$this->post('/modify', function() { //Modify sickness

		require 'db.php'; //DB connection

		//Params
		$id				= $_POST['id'];
		$name 			= $_POST['name'];
		$picture 		= $_POST['picture'];
		$description 	= $_POST['description'];
		$symptoms 		= $_POST['symptoms'];
		$actions 		= $_POST['actions'];
		$get_help 		= $_POST['get_help'];

		$sql = "UPDATE sickness SET name = '$name', picture = '$picture', description = '$description', symptoms = '$symptoms', actions = $actions', get_help = '$get_help', updated_at = NOW() WHERE id = '$id')";
		$query = $conn->query($sql);

		if($query) {
			echo 1;
		} else {
			echo 0;
		}

	});

});

?>