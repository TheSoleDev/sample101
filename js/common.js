var sideBarArr = [] ;

sideBarArr.push('<div class="ui-panel-inner">');
	sideBarArr.push('<div class="member-thumbnail-container">');
		sideBarArr.push('<a class="thumbnail-member" href="profile.html" data-ajax="false"><img  id="menu-profile-img" src=""></a>');
		sideBarArr.push('<a class="member-name ctm-pink-text screen-name" href="#"></a>');
	sideBarArr.push('</div>');
	sideBarArr.push('<ul data-role="listview" class="ui-listview nav-block">');
		///sideBarArr.push('<a id="close-mypanel" href="#" data-rel="close"><i class="fa fa-times"></i></a>');
		sideBarArr.push('<a href="#mypanel" id="close-mypanel" data-rel="close"><i class="fa fa-times"></i></a>');
		
		sideBarArr.push('<li><a href="profile.html" class="ui-btn" data-ajax="false"><i class="fa fa-user"></i> Profile</a></li>');		
		sideBarArr.push('<li><a href="matches.html" class="ui-btn" data-ajax="false"><i class="fa fa-heart"></i> Matches</a></li>');
		sideBarArr.push('<li><a href="activities.html" class="ui-btn" data-ajax="false"><i class="fa fa-tasks"></i> Activities</a></li>');
		sideBarArr.push('<li><a href="messages.html" class="ui-btn" data-ajax="false"><i class="fa fa-envelope"></i> Messages <!--<span class="counter-container">159</span>--></a></li>');
		sideBarArr.push('<li><a href="visitors.html" class="ui-btn" data-ajax="false"><i class="fa fa-users"></i> Visitors <!--<span class="counter-container">128</span>--></a></li>');
		sideBarArr.push('<li><a href="history.html" class="ui-btn" data-ajax="false"><i class="fa fa-users"></i> History</a></li>');		
	sideBarArr.push('</ul>');
	sideBarArr.push('<span class="nav-divider"></span>');
	sideBarArr.push('<ul data-role="listview" class="ui-listview nav-block">');

		sideBarArr.push('<li><a href="setting.html" class="ui-btn" data-ajax="false"><i class="fa fa-cog"></i> Settings</a></li>');
		sideBarArr.push('<li><a href="notification.html" class="ui-btn" data-ajax="false"><i class="fa fa-bell"></i> Notification</a></li>');
		sideBarArr.push('<li><a href="privacy.html" class="ui-btn" data-ajax="false"><i class="fa fa-key"></i> Privacy</a></li>');
		// sideBarArr.push('<li><a href="send-feedback.html" class="ui-btn"  data-ajax="false"><i class="fa fa-share"></i> Send us feedback</a></li>');
		// sideBarArr.push('<li><a href="disable-account.html" class="ui-btn"  data-ajax="false"><i class="fa fa-ban"></i> Disable account</a></li>');
		// sideBarArr.push('<li><a href="#" class="ui-btn"  data-ajax="false"><i class="fa fa-repeat"></i> Restores purchases</a></li>');
		sideBarArr.push('<li><a href="#" class="ui-btn"  data-ajax="false"><i class="fa fa-building-o"></i> About</a></li>');
		sideBarArr.push('<li><a href="logout.html" data-ajax="false" class="ui-btn"><i class="fa fa-sign-out"></i>Signout</a></li>');
	sideBarArr.push('</ul>');
sideBarArr.push('</div>');

var sideBarContent = sideBarArr.join('');
var profileData = JSON.parse(localStorage.getItem("profile"));

$.ajax({
    url: api_url + "remote_api.php?controller=profile&member_id=" + profileData.member_id,
    type: 'post',
    success:function(data){
		profileData =JSON.stringify(data);
		localStorage.setItem("profile", profileData); 
    },		    
});

$.ajax({
    url: api_url + "model_api.php?model=getJsonProfileDetailsFields",
    type: 'post',
    success:function(data){
		JsonProfileDetailsFields =JSON.stringify(data);
		localStorage.setItem("JsonProfileDetailsFields", JsonProfileDetailsFields); 
    },		    
});