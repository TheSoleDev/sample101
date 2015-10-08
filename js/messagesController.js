$(document).on('pagebeforeshow', '#main', function(){   
	$('#mypanel').html(sideBarContent);   
	var profileData = JSON.parse(localStorage.getItem("profile"));
		var activityListData = JSON.parse(localStorage.getItem("activityList"));

    $('.member_id').html(profileData.member_id);
	$('#menu-profile-img').attr('src',site_url+profileData.profile_photo);
    $('.screen-name').html(profileData.screen_name);
	
	$.ajax({
	    url: api_url + "remote_api.php?controller=MessageNotification&member_id=" + profileData.member_id,
	    type: 'post',
		dataType: "json",					    
	    success:function(data){
			$.each( data, function(name,value ) {
				
				if(name == 'ctrUsedMessageStoragePercentage' && value > 0)
				{
					 $('#' + name).css('width',value+"%");
				}
				else if(value > 0)
				{
					$('#' + name).html(value);
				}
			});	
	    },		    
		error: function(xhr, textStatus, errorThrown){
	       alert(xhr.responseText +" "  +textStatus +" "  + errorThrown);
	    }					
	});
	var arr_str = [];

	$.ajax({
	    url: api_url + "remote_api.php?controller=retrieveMessages&member_id="+profileData.member_id,
	    type: 'post',
	    dataType: "json",
		beforeSend: function() {
			$.mobile.loading( 'show', {
					text: 'Please wait..',
					textVisible: true,
					theme: 'a',
					textonly: true
			});
		},
		complete: function() {
		    $.mobile.loading( 'hide' );
		},		    
	    success:function(data){
			$.each( data, function(name,value ) {
					
					var marker = '';
					arr_str.push('<div class="message-box online-member">');
						if(value.isOnline == 'true')
						{
							arr_str.push('<span class="online-stat-indicator"></span>');
						}
						if(value.seen == 'No')
						{
							marker = '<span data-role="none" class="new-message">new</span>';
						}
						arr_str.push('<span class="time-sent">'+ value.date_created+'</span>');
						arr_str.push('<div class="ui-grid-solo">');
							arr_str.push('<div class="avatar-container">');
								arr_str.push('<div class="member-avatar">');
									arr_str.push('<a href="#" class="lnk-view-message" returnKey="'+ value.token+'" returnType="sentInbox" data-ajax="false"><img class="ctm-pull-left" src="'+site_url + value.profile_photo+'"></a>');
								arr_str.push('</div>');
							arr_str.push('</div>');
							arr_str.push('<div class="row-content">');
								arr_str.push('<ul class="member-stat">');
									arr_str.push('<li><a href="#" class="lnk-view-message" returnKey="'+ value.token+'" returnType="sentInbox" data-ajax="false">'+value.screen_name+marker+'</a></li>');
								arr_str.push('</ul>');
								arr_str.push('<br>');
								arr_str.push('<p>'+ value.message_content+'</p>');
							arr_str.push('</div>');
						arr_str.push('</div>');
						arr_str.push('<a href="#" class="message-link lnk-view-message" returnKey="'+ value.token+'" returnType="sentInbox" data-ajax="false" data-role="none"></a>');
					arr_str.push('</div>');

			});
			$('.message-container').html(arr_str.join(''));
	    },
	    error: function(jqXHR, textStatus, errorThrown) {
	        alert("Error... " + textStatus + "        " + errorThrown);
	    }

	});

	var arr_str_sent = [];
	$.ajax({
	    url: api_url + "remote_api.php?controller=retrieveSentMessages&member_id="+profileData.member_id,
	    type: 'post',
	    dataType: "json",
		beforeSend: function() {
			$.mobile.loading( 'show', {
					text: 'Please wait..',
					textVisible: true,
					theme: 'a',
					textonly: true
			});
		},
		complete: function() {
		    $.mobile.loading( 'hide' );
		},		    
	    success:function(data){
			$.each( data, function(name,value ) {


					arr_str_sent.push('<div class="message-box online-member">');
						if(value.isOnline == 'true')
						{
							arr_str_sent.push('<span class="online-stat-indicator"></span>');
						}
						arr_str_sent.push('<span class="time-sent">'+ value.date_created+'</span>');
						arr_str_sent.push('<div class="ui-grid-solo">');
							arr_str_sent.push('<div class="avatar-container">');
								arr_str_sent.push('<div class="member-avatar">');
									arr_str_sent.push('<a href="#" class="lnk-view-message" returnKey="'+ value.token+'" returnType="sentItem" data-ajax="false"><img class="ctm-pull-left" src="'+site_url + value.profile_photo+'"></a>');
								arr_str_sent.push('</div>');
							arr_str_sent.push('</div>');
							arr_str_sent.push('<div class="row-content">');
								arr_str_sent.push('<ul class="member-stat">');
									arr_str_sent.push('<li><a href="#" class="lnk-view-message" returnKey="'+ value.token+'" returnType="sentItem" data-ajax="false">'+value.screen_name+'</a></li>');
								arr_str_sent.push('</ul>');
								arr_str_sent.push('<br>');
								arr_str_sent.push('<p>'+ value.message_content+'</p>');
							arr_str_sent.push('</div>');
						arr_str_sent.push('</div>');
						arr_str_sent.push('<a href="#" class="message-link lnk-view-message" returnKey="'+ value.token+'" returnType="sentItem" data-ajax="false"></a>');
					arr_str_sent.push('</div>');

			});
			$('.sent-message-container').html(arr_str_sent.join(''));
	    },
	    error: function(jqXHR, textStatus, errorThrown) {
	        alert("Error... " + textStatus + "        " + errorThrown);
	    }

	});

    $('#main').on('click','.lnk-view-profile',function(e) { 
       
    	var member_id = $(this).attr('returnKey');
        localStorage.setItem("viewing_member_id", member_id);

		localStorage.removeItem("viewing_profile");
		$.ajax({
		    url: api_url + "remote_api.php?controller=profile&member_id=" + member_id,
		    type: 'post',
			dataType: "json",					    
		    success:function(data){
				viewingProfileData =JSON.stringify(data);
				localStorage.setItem("viewing_profile", viewingProfileData); 
	       		document.location.href="profile-viewer.html";
		    },		    
			error: function(xhr, textStatus, errorThrown){
		       alert(xhr.responseText +" "  +textStatus +" "  + errorThrown);
		    }					
		});
    });

    $('#main').on('click','.lnk-view-message',function(e) { 
       
    	var message_token = $(this).attr('returnKey');
    	var message_type = $(this).attr('returnType');

		localStorage.removeItem("viewing_message_token");
		localStorage.setItem("viewing_message_token", message_token); 
		localStorage.removeItem("viewing_message_type");
		localStorage.setItem("viewing_message_type", message_type); 
   		document.location.href="messages-viewer.html";

    });


});	


		