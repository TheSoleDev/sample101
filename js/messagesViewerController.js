$(document).on('pagebeforeshow', '#main', function(){   
	$('#mypanel').html(sideBarContent);   
	var profileData = JSON.parse(localStorage.getItem("profile"));
	var activityListData = JSON.parse(localStorage.getItem("activityList"));
	var viewing_message_token = localStorage.getItem("viewing_message_token");	
	var viewing_message_type = localStorage.getItem("viewing_message_type");		

	var recipient_member_id = '';

	var recipient_photo ='';

	var msgApiUrl = api_url + "remote_api.php?controller=retrieveMessages&member_id="+profileData.member_id;
	if(viewing_message_type == 'sentItem')
	{
		msgApiUrl = api_url + "remote_api.php?controller=retrieveSentMessages&member_id="+profileData.member_id;
	}
	else
	{

	}

	$.ajax({
	    url: msgApiUrl,
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
				if(value.token == viewing_message_token)
				{
    				$('.recipient_photo').attr('src',site_url+value.profile_photo);
    				$('.recipient_name').html(value.screen_name);
    				$('.recipient_details').html('<li>'+value.age+'</li><li>'+value.gender+'</li><li>'+value.city+'</li><li>'+value.country+'</li>');
					$('.gendernized').html(value.gendernized);

					recipient_member_id = value.member_id;

					$.ajax({
					    url: api_url + "remote_api.php?controller=checkIfUserIsBlocked&member_id="+profileData.member_id+"&blocked_member_id="+ recipient_member_id,
					    type: 'post',
					    success:function(data){
							$.each( data, function(name,value ) {
								if(value[0] == 'True')
								{
								      	$('.lnk-block-user').hide();
								      	$('.lnk-unblock-user').show();
								}	
								else
								{
								      	$('.lnk-block-user').show();
								      	$('.lnk-unblock-user').hide();
								}			
							});
					
					    },		    

					});	

					$.ajax({
					    url: api_url + "remote_api.php?controller=checkIfUserIsReported&member_id="+profileData.member_id+"&blocked_member_id="+ recipient_member_id,
					    type: 'post',
					    success:function(data){
							$.each( data, function(name,value ) {
								if(value[0] == 'True')
								{
								      	$('.lnk-report-violation').hide();
								      	$('#report-user').show();
								}	
								else
								{
								      	$('.lnk-report-violation').show();
								      	$('#report-user').hide();
								}			
							});
					
					    },		    

					});	

    				var arr_str = [];
    				$.each( value.conversation, function(msg_name,msg_value ) {

    					var flagStyle = 'sender';
    					var avatarPhoto = site_url+value.profile_photo;
    					if(profileData.member_id == msg_value.sender_member_id)
    					{
							flagStyle = 'receiver';
							avatarPhoto = site_url+profileData.profile_photo;
    					}


	                	arr_str.push('<div class="ui-grid-solo '+flagStyle+'">');
	                        arr_str.push('<div class="avatar-container">');
	                            arr_str.push('<div class="member-avatar">');
	                                arr_str.push('<a href="messages-viewer.html" data-ajax="false"><img class="ctm-pull-left" src="'+avatarPhoto+'"></a>');
	                            arr_str.push('</div>');
	                        arr_str.push('</div>');
	                        arr_str.push('<div class="row-content">');
	                            arr_str.push('<ul class="member-stat">');
	                                arr_str.push('<li><a href="messages-viewer.html" data-ajax="false">'+msg_value.screen_name+'</a></li>');
	                            arr_str.push('</ul>');
	                            arr_str.push('<br>');
	                            arr_str.push('<p>'+msg_value.message_content+'</p>');
	                            arr_str.push('<span class="msg-delivery">'+msg_value.date_created+'</span>');
		    					
		    					if(profileData.member_id != msg_value.sender_member_id)
		    					{	                            
		                            arr_str.push('<ul class="action-to-membr">');
		                                arr_str.push('<li><a href="#" class="lnk-report-message-violation" returnType="Message" returnItemId="'+msg_value.id+'" returnAbuserMemberId="'+msg_value.sender_member_id+'" data-ajax="false">Report Message</a></li>');
		                            arr_str.push('</ul>');
	                        	}

	                        arr_str.push('</div>');
				        arr_str.push('</div>');

					});	
					$('.conversation-list').html(arr_str.join(''));
					return false;
				}
					
			});
			
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

    $('#main').on('click','.lnk-report-violation',function(e) { 
		localStorage.removeItem("report_details");
		var arrayObj = [];
		arrayObj.push({
    		reportType : $(this).attr('returnType'),
    		itemId : recipient_member_id,
    		abuserMemberId : recipient_member_id,  
    		reporterMemberId : profileData.member_id
	    });
		var jsonString = JSON.stringify(arrayObj);
		localStorage.setItem("report_details", jsonString);     	
        document.location.href="report-violation.html";

    });    

    $('#main').on('click','.lnk-report-message-violation',function(e) { 
		localStorage.removeItem("report_details");
		var arrayObj = [];
		arrayObj.push({
    		reportType : $(this).attr('returnType'),
    		itemId : $(this).attr('returnItemId'),
    		abuserMemberId : $(this).attr('returnAbuserMemberId'),  
    		reporterMemberId : profileData.member_id
	    });
		var jsonString = JSON.stringify(arrayObj);
		localStorage.setItem("report_details", jsonString);     	
        document.location.href="report-violation.html";
    });  


    $('#main').on('click','.lnk-block-user',function(e) { 

		if(confirm('Are you sure you want to block this person?'))
		{
			$.ajax({
			    url: api_url + "remote_api.php?controller=blockUser&member_id="+profileData.member_id+"&blocked_member_id="+ recipient_member_id,
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
	            success:function(msg){
					$.each( msg, function(name,value ) {
				      if(value[0] == 'Success')
				      {
				      	alert("You have successfully blocked this person.");
				      	$('.lnk-block-user').hide();
				      	$('.lnk-unblock-user').show();
						//document.location.reload();
					
				      }
				      else 
				      {
				      	alert( "Failed: " + value[1] );
				      }
				    });
	            },		    
				error: function(xhr, textStatus, errorThrown){
			       alert(xhr.responseText +" "  +textStatus +" "  + errorThrown);
			    }	
			});
		}

    }); 


    $('#main').on('click','.lnk-unblock-user',function(e) { 

		if(confirm('Are you sure you want to unblock this person?'))
		{    	
			$.ajax({
			    url: api_url + "remote_api.php?controller=unblockUser&member_id="+profileData.member_id+"&blocked_member_id="+ recipient_member_id,
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
	            success:function(msg){
					$.each( msg, function(name,value ) {
				      if(value[0] == 'Success')
				      {
				      	alert("You have successfully unblocked this person.");
				      	$('.lnk-unblock-user').hide();
				      	$('.lnk-block-user').show();
						//document.location.reload();
					
				      }
				      else 
				      {
				      	alert( "Failed: " + value[1] );
				      }
				    });
	            },		    
				error: function(xhr, textStatus, errorThrown){
			       alert(xhr.responseText +" "  +textStatus +" "  + errorThrown);
			    }	
			});
		}
    }); 

});	


		