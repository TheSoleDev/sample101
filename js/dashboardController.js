//localStorage.removeItem("profile")
$(document).on('pagebeforeshow', '#main', function(){      
	var profileData = JSON.parse(localStorage.getItem("profile"));
	$('#profile-img').attr('src',site_url+profileData.profile_photo);

		$.ajax({
		    url: api_url + "model_api.php?model=getNotification&member_id=" + profileData.member_id,
		    type: 'post',
			dataType: "json",					    
		    success:function(data){
				$.each( data, function(name,value ) {
					if(value > 0)
					{
						$('#ctr' + name).html('<span class="message-notifier-ctr">'+value+'</span>');
					}
				});	
		    },		    
			error: function(xhr, textStatus, errorThrown){
		       alert(xhr.responseText +" "  +textStatus +" "  + errorThrown);
		    }					
		});
});

		