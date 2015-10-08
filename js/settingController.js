$(document).on('pagebeforeshow', '#main-account', function(){   
														
	$('#mypanel').html(sideBarContent);   
	var profileData = JSON.parse(localStorage.getItem("profile"));	

	$('#email_address').val(profileData.email_address);
   $('#main-account').on('submit','#frm-email-password',function(e) { 				 	
													
	    e.preventDefault();  //prevent form from submitting
	    data = $(this).serialize();
		$.ajax({
		    url: api_url + "remote_api.php?controller=updateMyAccount&member_id="+profileData.member_id,
		    type: 'post',
			data: data,
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
					alert('success');
					document.location.href="setting.html";
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


	 });
});

$(document).on('pagebeforeshow', '#main-notification', function(){   
														
	$('#mypanel').html(sideBarContent);   
	var profileData = JSON.parse(localStorage.getItem("profile"));	  
	var email_notification = profileData.email_notification;
 
	$(".notification-value").each(function() {
		if(email_notification.search($(this).val()) > -1)
		{
			$(this).prop('checked', true).checkboxradio('refresh');
		}

	});

    $('#main-notification').on('submit','#frm-notifications',function(e) { 				 	
	    e.preventDefault();  //prevent form from submitting
	    data = $(this).serialize();
		$.ajax({
		    url: api_url + "remote_api.php?controller=updateNotification&member_id="+profileData.member_id,
		    type: 'post',
			data: data,
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
					alert('success');
					document.location.href="setting.html";
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
	 });

});

$(document).on('pagebeforeshow', '#main-privacy', function(){   
														
	$('#mypanel').html(sideBarContent);   
	var profileData = JSON.parse(localStorage.getItem("profile"));	  

	if(profileData.only_allow_privacy_members_only == 'Y')
	{
		$('#only_allow_privacy_members_only').prop('checked', true).checkboxradio('refresh');
	}
 
	if(profileData.privacy_turn_off_visitors == 'Y')
	{
		$('#privacy_turn_off_visitors').prop('checked', true).checkboxradio('refresh');
	}


	 $('#main-privacy').on('submit','#frm-privacy',function(e) { 				 	
													
	    e.preventDefault();  //prevent form from submitting
	    data = $(this).serialize();
		$.ajax({
		    url: api_url + "remote_api.php?controller=updatePrivacy&member_id="+profileData.member_id,
		    type: 'post',
			data: data,
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
					alert('success');
					document.location.href="setting.html";
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


	 });








//	<img class="ctm-full-width" src="images/thumb-3.jpg">
});

