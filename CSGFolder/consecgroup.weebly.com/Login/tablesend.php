<?php
$con=mysqli_connect("localhost","testtable","testtableCSGCoder2015","testtable");
// Check connection
if (mysqli_connect_errno())
{
echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$result = mysqli_query($con,"SELECT * FROM MyGuests");

echo "<table border='1'>
<tr>
<th>firstname</th>
<th>lastname</th>
</tr>";

while($row = mysqli_fetch_array($result))
{
echo "<tr>";
echo "<td>" . $row['firstname'] . "</td>";
echo "<td>" . $row['lastname'] . "</td>";
echo "</tr>";
}
echo "</table>";

mysqli_close($con);
?>