<?php
// We need to use sessions, so you should always start sessions using the below code.
session_start();
// If the user is not logged in redirect to the login page...
if (!isset($_SESSION['loggedin'])) {
    header('Location: ../login.html');
    exit();
}
?>
<!DOCTYPE html>
<html>
<title>Consecgroup - Personal page</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" crossorigin="anonymous">
<style>
    html,body,h1,h2,h3,h4,h5 {font-family: "Raleway", sans-serif}
</style>
<body class="w3-light-grey">

<!-- Top container -->
<div class="w3-bar w3-top w3-black w3-large" style="z-index:4">
    <button class="w3-bar-item w3-button w3-hide-large w3-hover-none w3-hover-text-light-grey" onclick="w3_open();"><i class="fa fa-bars"></i>  Menu</button>
    <span class="w3-bar-item w3-left">ConSecGroup</span>
    <a href="../logout.php"><i class="fas fa-sign-out-alt w3-bar-item w3-right"></i>Logout</a>
</div>

<!-- Sidebar/menu -->
<nav class="w3-sidebar w3-collapse w3-white w3-animate-left" style="z-index:3;width:300px;" id="mySidebar"><br>
    <div class="w3-container w3-row">
        <div class="w3-col s2"> &nbsp; </div>
        <div class="w3-col s8 w3-bar">
            <span>Welcome, <strong><?=$_SESSION['name']?></strong></span><br>
            <a href="#" class="w3-bar-item w3-button"><i class="fas fa-envelope"></i></a>
            <a href="#" class="w3-bar-item w3-button"><i class="fas fa-user"></i></a>
            <a href="#" class="w3-bar-item w3-button"><i class="fas fa-cog"></i></a>
        </div>
    </div>
    <hr>
    <div class="w3-container">
        <h5>Dashboard</h5>
    </div>
    <div class="w3-bar-block">
        <a href="#" class="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black" onclick="w3_close()" title="close menu"><i class="fa fa-remove fa-fw"></i>  Close Menu</a>
        <a href="dashboard.php" class="w3-bar-item w3-button w3-padding w3-blue"><i class="fas fa-user fa-fw"></i>  Summary</a>
        <a href="map.php" class="w3-bar-item w3-button w3-padding"><i class="far fa-map fa-fw"></i>  Map Trackers</a>
        <a href="convoy.php" class="w3-bar-item w3-button w3-padding"><i class="fas fa-road fa-fw"></i>  Convoy</a>
        <a href="calendar.php" class="w3-bar-item w3-button w3-padding"><i class="far fa-calendar-alt fa-fw"></i>  Calendar</a>
        <a href="achievements.php" class="w3-bar-item w3-button w3-padding"><i class="fas fa-trophy fa-fw"></i>  Achievements</a>
        <a href="feedback.php" class="w3-bar-item w3-button w3-padding"><i class="fas fa-bell fa-fw"></i>  Feedback</a>
        <a href="reports.php" class="w3-bar-item w3-button w3-padding"><i class="fas fa-flag-checkered fa-fw"></i>  Manage reports</a>
        <a href="logs.php" class="w3-bar-item w3-button w3-padding"><i class="fas fa-history fa-fw"></i>  Logs</a>
        <a href="settings.php" class="w3-bar-item w3-button w3-padding"><i class="fas fa-cog fa-fw"></i>  Settings</a><br><br>
    </div>
</nav>


<!-- Overlay effect when opening sidebar on small screens -->
<div class="w3-overlay w3-hide-large w3-animate-opacity" onclick="w3_close()" style="cursor:pointer" title="close side menu" id="myOverlay"></div>

<!-- !PAGE CONTENT! -->
<div class="w3-main" style="margin-left:300px;margin-top:43px;">

    <!-- Header -->
    <header class="w3-container" style="padding-top:22px">
        <h4><b><i class="fas fa-dashboard"></i> My Dashboard</b></h4>
    </header>
	
<script>
function reqListener () {
console.log(this.responseText);
let res = JSON.parse(this.responseText).response
let players_1 = ""
let players_2 = ""
let players_3 = ""
let players_4 = ""
res.forEach((el) => {
if(el.name == "Simulation 1"){
players_1 = "" + el.players + " / " + el.maxplayers
}
if(el.name == "Simulation 2"){
players_2 = "" + el.players + " / " + el.maxplayers
}
if(el.name == "ProMods 1"){
players_3 = "" + el.players + " / " + el.maxplayers
}
if(el.name == "ProMods 2"){
players_4 = "" + el.players + " / " + el.maxplayers
}
})
document.getElementById("players_1").innerHTML = players_1
document.getElementById("players_2").innerHTML = players_2
document.getElementById("players_3").innerHTML = players_3
document.getElementById("players_4").innerHTML = players_4
}

var url = "https://api.truckersmp.com/v2/servers";
var oReq = new XMLHttpRequest();
oReq.addEventListener('load', reqListener);
oReq.open("get", url, true);
oReq.send();
</script>


	<div class="w3-row-padding w3-margin-bottom">
		<div class="w3-quarter">
			<div class="w3-container w3-red w3-padding-16">
				<div class="w3-left w3-large"><b>Simulation #1</b></div>
				<div class="w3-right">
					<h3 id="players_1">API NOT FOUND</h3>
				</div>
                <div class="w3-clear"></div>
                <h4><i class="fas fa-circle w3-text-green"></i> online</h4>
            </div>
        </div>
        <div class="w3-quarter">
            <div class="w3-container w3-blue w3-padding-16">
                <div class="w3-left w3-large"><b>Simulation #2</b></div>
                <div class="w3-right">
                    <h3 id="players_2">API NOT FOUND</h3>
                </div>
                <div class="w3-clear"></div>
                <h4><i class="fas fa-circle w3-text-green"></i> online</h4>
            </div>
        </div>
        <div class="w3-quarter">
            <div class="w3-container w3-teal w3-padding-16">
                <div class="w3-left w3-large"><b>ProMods #1</b></div>
                <div class="w3-right">
                    <h3 id="players_3">API NOT FOUND</h3>
                </div>
                <div class="w3-clear"></div>
                <h4><i class="fas fa-circle w3-text-green"></i> online</h4>
            </div>
        </div>
        <div class="w3-quarter">
            <div class="w3-container w3-orange w3-padding-16">
                <div class="w3-left w3-large"><b>ProMods #2</b></div>
                <div class="w3-right">
                    <h3 id="players_4">API NOT FOUND</h3>
                </div>
                <div class="w3-clear"></div>
                <h4><i class="fas fa-circle w3-text-green"></i> online</h4>
            </div>
        </div>
    </div>

    <div class="w3-panel">
        <div class="w3-row-padding" style="margin:0 -16px">
                <h5>Next Events</h5>
                <ul class="w3-ul">
                    <li><i class="far fa-calendar-alt"></i> 30/09 - Convoy</li>
                    <li><i class="far fa-calendar-alt"></i> 01/10 - Convoy</li>
                    <li><i class="far fa-calendar-alt"></i> 05/10 - Public meeting</li>
                    <li><i class="far fa-calendar-alt"></i> 31/10 - Halloween event</li>
                </ul>
        </div>
    </div>

    <br>
    <div class="w3-container w3-dark-grey w3-padding-32">
        <div class="w3-row">
            <div class="w3-container w3-third">
                <h5 class="w3-bottombar w3-border-blue">ConSecGroup</h5>
                <p>Main Page</p>
                <p>Discord</p>
                <p>contact@consecgroup</p>
            </div>
            <div class="w3-container w3-third">
                <h5 class="w3-bottombar w3-border-green">Truckers.mp</h5>
                <p>Home</p>
                <p>Status</p>
                <p>Traffic</p>
            </div>
            <div class="w3-container w3-third">
                <h5 class="w3-bottombar w3-border-red">SCS Software</h5>
                <p>Home</p>
                <p>Buy ETS 2</p>
                <p>Buy ATS</p>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="w3-container w3-padding-16 w3-light-grey">
        <h4 class="w3-right">Copyright &copy; ConSecGroup - 2019</h4>
    </footer>

    <!-- End page content -->
</div>

<script>
    // Get the Sidebar
    var mySidebar = document.getElementById("mySidebar");

    // Get the DIV with overlay effect
    var overlayBg = document.getElementById("myOverlay");

    // Toggle between showing and hiding the sidebar, and add overlay effect
    function w3_open() {
        if (mySidebar.style.display === 'block') {
            mySidebar.style.display = 'none';
            overlayBg.style.display = "none";
        } else {
            mySidebar.style.display = 'block';
            overlayBg.style.display = "block";
        }
    }

    // Close the sidebar with the close button
    function w3_close() {
        mySidebar.style.display = "none";
        overlayBg.style.display = "none";
    }
	
</script>

</body>
</html>

