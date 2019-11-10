<?php
$servername = "localhost";
$username = "convoy";
$password = "testtableCSGCoder2015";
$dbname = "convoy";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// sql to create table
$sql = "CREATE TABLE convoys (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
date VARCHAR(15) NOT NULL,
name VARCHAR(50) NOT NULL,
truck VARCHAR(15) NOT NULL,
ets2map VARCHAR(150) NOT NULL,
reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "Table MyGuests created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();
?>