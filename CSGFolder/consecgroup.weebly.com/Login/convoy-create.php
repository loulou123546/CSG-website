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
        <a href="dashboard.php" class="w3-bar-item w3-button w3-padding"><i class="fas fa-user fa-fw"></i>  Summary</a>
        <a href="map.php" class="w3-bar-item w3-button w3-padding"><i class="far fa-map fa-fw"></i>  Map Trackers</a>
        <a href="convoy.php" class="w3-bar-item w3-button w3-padding w3-blue"><i class="fas fa-road fa-fw"></i>  Convoy</a>
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
<div class="w3-main" style="margin-left:300px;margin-top:43px;"><!DOCTYPE html>
<html lang="en">
<title>CSG - Create a convoy</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
p, h1 {font-family: "Montserrat", sans-serif}
</style>
<body>

<!-- Header -->
<header class="w3-container w3-blue w3-center" style="padding:64px 16px">
  <h1 class="w3-margin w3-jumbo">CREATE A CONVOY</h1>
</header>


<form style="width: 80vw;margin-left:2vw;margin-top: 64px;" class="w3-container w3-card-4" method="GET" action="/admin/register_convoy">   
    <p>
        <label class="w3-text-blue"><b>Banner</b></label>
        <input class="w3-input w3-border" name="banner" type="text">
    </p>
    <p>      
        <label class="w3-text-blue"><b>Title *</b></label>
        <input class="w3-input w3-border" name="title" required="" type="text">
    </p>
    <p>      
        <label class="w3-text-blue"><b>Date *</b></label>
        <input class="w3-input w3-border" name="date" required="" type="date">
    </p>
    <p>      
        <label class="w3-text-blue"><b>Time [ UTC ] *</b></label>
        <input class="w3-input w3-border" name="time" required="" type="time">
    </p>
    <p>      
        <label class="w3-text-blue"><b>Link to ets2c.com</b></label>
        <input class="w3-input w3-border" name="link_ets2c" type="text">
    </p>
    <p>      
        <label class="w3-text-blue"><b>Link to picture of roadmap</b></label>
        <input class="w3-input w3-border" name="link_roadmap" type="text">
    </p>
    <p>      
        <select class="w3-select w3-border" name="server">
            <option value="unknow" selected>Unknow server</option>
            <option value="[ETS2] Simulation 1">[ETS2] Simulation 1</option>
            <option value="[ETS2] Simulation 2">[ETS2] Simulation 2</option>
            <option value="[ETS2] Simulation US">[ETS2] Simulation US</option>
            <option value="[ETS2] Arcade">[ETS2] Arcade</option>
            <option value="[ETS2] Promods 1">[ETS2] Promods 1</option>
            <option value="[ETS2] Promods 2">[ETS2] Promods 2</option>
            <option value="[ETS2] Promods US">[ETS2] Promods US</option>
            <option value="unknow" disabled="">----------</option>
            <option value="[ATS] Simulation EU">[ATS] Simulation EU</option>
            <option value="[ATS] Simulation US">[ATS] Simulation US</option>
        </select>
    </p>
    <p>      
        <label class="w3-text-blue"><b>Start at</b></label>
        <input class="w3-input w3-border" name="startpoint" type="text">
    </p>
    <p>      
        <label class="w3-text-blue"><b>End at</b></label>
        <input class="w3-input w3-border" name="endpoint" type="text">
    </p>
    <p>
        <input class="w3-radio" type="radio" name="is_staff" value="staff" checked>
        <label>Staff event</label>
    </p>
    <p>
        <input class="w3-radio" type="radio" name="is_staff" value="public">
        <label>Public event</label>
    </p>
    <p>      
        <label class="w3-text-blue"><b>Required Truck</b></label>
        <input class="w3-input w3-border" name="title" type="text">
    </p>
    <p>      
        <label class="w3-text-blue"><b>Description</b></label>
        <textarea class="w3-input w3-border" name="desc" style="width: 100%;" rows="8"></textarea>
    </p>
    <p>      
        <button class="w3-btn w3-blue w3-large w3-right">Add convoy</button>
    </p>
    <br>
    <p>Developed for ConSecGroup by loulou123546</p>
</form>

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



</body>
</html>
