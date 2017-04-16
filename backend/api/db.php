<?php

	$servername = 'localhost';
	$username 	= 'gocodeop_healthy';
	$password 	= 'healthypassword';
	$db			= 'gocodeop_healthy_do';

	$conn = @new mysqli($servername, $username, $password, $db);

	if($conn->connect_error) {
		echo "Error:" . $conn->connect_error;
	}

?>