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
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ETS2Map</title>
    <script src="a1st.js"></script>
    <link rel="shortcut icon" href="favicon.ico">
    <link rel="stylesheet" type="text/css" href="app.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.2/css/all.css" integrity="sha384-/rXc/GQVaYpyDdyxK+ecHPVYJSN9bmVFBvjA/9eOB+pb3F2w2N6fc5qB9Ew5yIns" crossorigin="anonymous">
</head>
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
        <a href="map.php" class="w3-bar-item w3-button w3-padding w3-blue"><i class="far fa-map fa-fw"></i>  Map Trackers</a>
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

    <div style="position: absolute;top: 45%;width: 100%;text-align: center;color: #FFFFFF;font-size: 1.5em;z-index: 10000;">
        <noscript>
            For ETS2Map to function correctly you must enable JavaScript.<br>
            =^-^=
            <style>.leftSidebar{display: none;opacity: 0;}</style>
        </noscript>
    </div>
    <div class="leftSidebar" style="display: block;max-width: 220px;">
        <div class="sidebarBox">
            <div>
                <span class="text-muted">Game Time:</span> <span class="text-white float-right" id="game-time">-</span>
                <div class="clearfix"></div>
            </div>
        </div>
        <div id="playerView" style="display: none;">
            <a class="btn btn-info btn-info-toggle" role="button" data-toggle="collapse" href="#playerInfo" aria-expanded="true" aria-controls="playerInfo">
                <span class="float-left"><i class="fas fa-user"></i> User Details</span> <i class="fas fa-chevron-up"></i>
                <div class="clearfix"></div>
            </a>
            <div id="playerInfo" class="collapse show">
                <div class="sidebarBox" id="playerDetails">
                    <div id="playerClicked"></div>
                    </div>
                </div>
            </div>
            <div id="serverView" style="display: block;">
                <a class="btn btn-info btn-info-toggle" role="button" data-toggle="collapse" href="#serverListing" aria-expanded="true" aria-controls="serverListing">
                    <span class="float-left"><i class="fas fa-server"></i> Servers List</span> <i class="fas fa-chevron-up"></i>
                    <div class="clearfix"></div>
                </a>
                <div id="serverListing" class="collapse show">
                    <div class="sidebarBox" id="serversList">
                        <div class="server" id="server_2"><a href="javascript:setServer(2)">ETS2 - Simulation 1</a><span id="server_players_2" class="server-players">-</span></div>
                        <div class="server" id="server_3"><a href="javascript:setServer(3)">ETS2 - Simulation 2</a><span id="server_players_3" class="server-players">-</span></div>
                        <div class="server" id="server_15"><a href="javascript:setServer(15)">ETS2 - [US] Simulation</a><span id="server_players_15" class="server-players">-</span></div>
                        <div class="server" id="server_7"><a href="javascript:setServer(7)">ETS2 - Arcade</a><span id="server_players_7" class="server-players">-</span></div>

                        <div class="server-break"></div>
                        <div class="server" id="server_50"><a href="javascript:setServer(50)">ETS2 - ProMods 1</a><span id="server_players_50" class="server-players">-</span></div>
                        <div class="server" id="server_51"><a href="javascript:setServer(51)">ETS2 - ProMods 2</a><span id="server_players_51" class="server-players">-</span></div>
                        <div class="server" id="server_52"><a href="javascript:setServer(52)">ETS2 - [US] ProMods</a><span id="server_players_52" class="server-players">-</span></div>
                        <div class="server-break"></div>
                        <div class="server" id="server_10"><a href="javascript:setServer(10)">ATS - [US] Simulation</a><span id="server_players_10" class="server-players">-</span></div>
                        <div class="server" id="server_8"><a href="javascript:setServer(8)">ATS - Simulation</a><span id="server_players_8" class="server-players">-</span></div>
                        <div class="server-break"></div>
                        <div class="server" id="server_99"><a href="javascript:void(0)">All Servers</a><span id="server_players_99" class="server-players">-</span></div>
                        <div style="display:none;opacity:0;" id="server">1</div>
                    </div>
                </div>
            </div>
            <div id="searchView" style="display: block;">
                <a class="btn btn-info btn-info-toggle" role="button" data-toggle="collapse" href="#searching" aria-expanded="false" aria-controls="searching">
                    <span class="float-left"><i class="fas fa-users"></i> Convoy roles</span> <i class="fas fa-chevron-down"></i>
                    <div class="clearfix"></div>
                </a>
                <div id="searching" class="collapse">
                    <div class="sidebarBox" id="searchList">
                        <input type="text" class="form-control input-sm" id="TID_1" onkeyup="UpdateCSG_ID()" placeholder="Convoy Leader" maxlength="60"><br>
                        <input type="text" class="form-control input-sm" id="TID_2" onkeyup="UpdateCSG_ID()" placeholder="Convoy Pilot 1" maxlength="60"><br>
                        <input type="text" class="form-control input-sm" id="TID_3" onkeyup="UpdateCSG_ID()" placeholder="Convoy Pilot 2" maxlength="60"><br>
                        <input type="text" class="form-control input-sm" id="TID_4" onkeyup="UpdateCSG_ID()" placeholder="Convoy Pilot 3" maxlength="60"><br>
                        <input type="text" class="form-control input-sm" id="TID_5" onkeyup="UpdateCSG_ID()" placeholder="Convoy Pilot 4" maxlength="60"><br>
                        <input type="text" class="form-control input-sm" id="TID_6" onkeyup="UpdateCSG_ID()" placeholder="Convoy Pilot 5" maxlength="60"><br>
                        <input type="text" class="form-control input-sm" id="TID_7" onkeyup="UpdateCSG_ID()" placeholder="Convoy Pilot 6" maxlength="60"><br>
                        <input type="text" class="form-control input-sm" id="TID_8" onkeyup="UpdateCSG_ID()" placeholder="Convoy Tail" maxlength="60"><br>
                        <input type="text" class="form-control input-sm" id="TID_9" onkeyup="UpdateCSG_ID()" placeholder="Convoy RRU 1" maxlength="60"><br>
                        <input type="text" class="form-control input-sm" id="TID_10" onkeyup="UpdateCSG_ID()" placeholder="Convoy RRU 2" maxlength="60"><br>
                        <input type="text" class="form-control input-sm" id="TID_11" onkeyup="UpdateCSG_ID()" placeholder="Convoy RRU 3" maxlength="60"><br>
                    </div>
                </div>
            </div>
            <div id="settingsView" style="display:block;">
                <a class="btn btn-info btn-info-toggle" role="button" data-toggle="collapse" href="#toggleSettings" aria-expanded="false" aria-controls="toggleSettings">
                    <span class="float-left"><i class="fas fa-cogs"></i> Settings</span> <i class="fas fa-chevron-down"></i>
                    <div class="clearfix"></div>
                </a>
                <div id="toggleSettings" class="collapse">
                    <div class="sidebarBox" id="settingsList">
                        <div class="settings-color">
                            <div class="color"><label><input type="Color" name="map_color" title="map_color" id="map_color" value="#e2e2e2">&nbsp; Background</label></div>
                            <div class="color"><label><input type="Color" name="truck_color" title="truck_color" id="truck_color" value="#444444">&nbsp; Trucks</label></div>
                            <div class="color"><label><input type="Color" name="player_name_color" title="player_name_color" id="player_name_color" value="#000000">&nbsp; Player Names</label></div>
                            <div class="color"><label><input type="Color" name="city_name_color" title="city_name_color" id="city_name_color" value="#000000">&nbsp; City Names</label></div>
                            <div class="color"><label><input type="Color" name="country_name_color" title="country_name_color" id="country_name_color" value="#000000">&nbsp; Country Names</label></div>
                            </div>
                            <div class="settings-display">
                            <div class="checkbox"><label><input type="checkbox" name="heatmap" title="heatmap" id="heatmap">&nbsp; Hide Heatmap</label></div>
                            <div class="checkbox"><label><input type="checkbox" name="truck_face" title="truck_face" id="truck_face">&nbsp; Show Direction</label></div>
                            <div class="checkbox"><label><input type="checkbox" name="truck_box" title="truck_box" id="truck_box">&nbsp; Show Box</label></div>
                            <div class="checkbox"><label><input type="checkbox" name="name_show" title="name_show" id="name_show">&nbsp; Show Name</label></div>
                            <div class="checkbox"><label><input type="checkbox" name="name_show_id" title="name_show_id" id="name_show_id">&nbsp; Show (ID)</label></div>
                            <div class="settings-slider">
                                <div class="slider-name">Display Names</div>
                                    <div class="slider-desc">
                                        <span class="float-left">Far</span>
                                        <span class="float-right">Near</span>
                                    </div>
                                    <div class="clearfix"></div>
                                    <div class="range-slider">
                                    <input type="range" min="-1" max="3" value="1.25" class="range-slider_range" id="truck_vis_range" title="truck_vis_range">
                                </div>
                            </div>
                        </div>
                        <div class="settings-reset">
                            <button class="btn btn-sm btn-warning btn-block" id="settings_reset"><i class="fas fa-sync-alt"></i> Reset</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="aboutView" style="display: block;">
                <a class="btn btn-info btn-info-toggle" role="button" href="javascript:void(0);">
                    <span class="float-left"><i class="fas fa-info-circle"></i> About</span>
                    <div class="clearfix"></div>
                </a>
                <div id="aboutUs">
                    <div class="sidebarBox" id="aboutList">
                        <div><a target="_blank" href="https://www.twitch.tv/Kat_pw">Kat_pw</a></div>
                        <div><a target="_blank" href="https://krashnz.com">Krashnz</a></div>
                        <div><a target="_blank" href="https://traffic.krashnz.com">TruckersMP Traffic</a></div>
                        <br><br>
                        <div>
                            <p>This website is a modified version of <a href="https://ets2map.com">ets2map.com</a> created by Krashnz.</p>
                            <p>This version can't be used for a public usage due to copyright.</p>
                            <p>This custom version was made by @loulou123546, and are only allowed for ConSecGroup members.</p>
                            <p>If you give the link of this modified version in public, website will be closed in respect of Krashnz work's.</p>
                            <p>Thank's you for reading</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    <!-- end of left side bar -->





    <div class="search_back"></div>
    <div id="search_overlay">
        <div id="search_box">
            <label for="player_search" style="display: none;"></label>
            <input type="text" name="player_search" class="form-control input-sm" id="player_search" placeholder="Player Search (TMP ID, Player ID or Username)" maxlength="32">
        </div>
        <div id="search_results" style="display: none;">
            <ul id="search_list" class="search-list"></ul>
        </div>
    </div>



    <div id="offline_msg" style="display: none;">
        <div class="alert alert-warning">
            <span id="offline_msg_text"></span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true"><i class="fas fa-times"></i></span>
            </button>
        </div>
    </div>




    <div id="zoom_overlay">
        <div class="btn-group-vertical" role="group" aria-label="Zoom Controls">
            <button type="button" class="btn btn-success" id="zoom_in" onclick="if (!window.__cfRLUnblockHandlers) return false; zoomIn()" data-cf-modified-637f2423ddec9bfe37a3b23b-=""><i class="fas fa-plus"></i></button>
            <button type="button" class="btn btn-success" id="zoom_out" onclick="if (!window.__cfRLUnblockHandlers) return false; zoomOut()" data-cf-modified-637f2423ddec9bfe37a3b23b-=""><i class="fas fa-minus"></i></button>
        </div>
    </div>




    <div id="box" style="width:100%;float:left;">
        <div id="canvascontainer" style="float:left;">
            <canvas id="myCanvas"></canvas>
        </div>
    </div>




    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" integrity="sha384-tsQFqpEReu7ZLhBV2VZlAu7zcOV+rXbYlF2cqB8txI/8aZajjp4Bqd+V6D5IgvKT" crossorigin="anonymous" type="637f2423ddec9bfe37a3b23b-text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.js" integrity="sha384-JPbtLYL10d/Z1crlc6GGGGM3PavCzzoUJ1UxH0bXHOfguWHQ6XAWrIzW+MBGGXe5" crossorigin="anonymous" type="637f2423ddec9bfe37a3b23b-text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous" type="637f2423ddec9bfe37a3b23b-text/javascript"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous" type="637f2423ddec9bfe37a3b23b-text/javascript"></script>
    <script src="a2nd.js" type="637f2423ddec9bfe37a3b23b-text/javascript"></script>
    <script src="https://ajax.cloudflare.com/cdn-cgi/scripts/95c75768/cloudflare-static/rocket-loader.min.js" data-cf-settings="637f2423ddec9bfe37a3b23b-|49" defer=""></script>

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

