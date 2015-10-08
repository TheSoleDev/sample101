$(document).on('pagebeforeshow', '#main', function(){   
	$('#mypanel').html(sideBarContent);   
	var profileData = JSON.parse(localStorage.getItem("profile"));
		var activityListData = JSON.parse(localStorage.getItem("activityList"));

    $('.member_id').html(profileData.member_id);
	$('#menu-profile-img').attr('src',site_url+profileData.profile_photo);
    $('.screen-name').html(profileData.screen_name);

	var arr_str_visitor = [];

	$.ajax({
	    url: api_url + "remote_api.php?controller=retrieveVisitors&member_id="+profileData.member_id,
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
			var ctr = 0;
    		var arr_block = ['a', 'b'];
			$.each( data, function(name,value ) {

				arr_str_visitor.push('<div class="ui-block-'+arr_block[ctr]+'">');
					arr_str_visitor.push('<div class="member-block-container">');
						if(value.isOnline == 'true')
						{
							arr_str_visitor.push('<span class="online-stat-indicator"></span>');
						}
						arr_str_visitor.push('<a href="#" class="lnk-view-profile" returnKey="'+ value.member_id+'" data-ajax="false"><img src="'+site_url + value.profile_photo+'"></a>');
						arr_str_visitor.push('<span class="member-name">'+value.screen_name+'</span>');
						arr_str_visitor.push('<div class="member-details"><span>'+ value.age +'</span><span>'+value.city+'</span><span>'+value.country+'</span></div>');
					arr_str_visitor.push('</div>');
				arr_str_visitor.push('</div>');
				ctr++;
				if(ctr>=2) ctr = 0;	

			});
			$('#visitor-list').html(arr_str_visitor.join(''));
	    },
	    error: function(jqXHR, textStatus, errorThrown) {
	        alert("Error... " + textStatus + "        " + errorThrown);
	    }

	});

	var arr_str_likers = [];

	$.ajax({
	    url: api_url + "remote_api.php?controller=retrieveLikers&member_id="+profileData.member_id,
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
			var ctr = 0;
    		var arr_block = ['a', 'b'];
			$.each( data, function(name,value ) {

				arr_str_likers.push('<div class="ui-block-'+arr_block[ctr]+'">');
					arr_str_likers.push('<div class="member-block-container">');
						if(value.arr_str_likers == 'true')
						{
							arr_str_likers.push('<span class="online-stat-indicator"></span>');
						}
						arr_str_likers.push('<a href="#" class="lnk-view-profile" returnKey="'+ value.member_id+'" data-ajax="false"><img src="'+site_url + value.profile_photo+'"></a>');
						arr_str_likers.push('<span class="member-name">'+value.screen_name+'</span>');
						arr_str_likers.push('<div class="member-details"><span>'+ value.age +'</span><span>'+value.city+'</span><span>'+value.country+'</span></div>');
					arr_str_likers.push('</div>');
				arr_str_likers.push('</div>');
				ctr++;
				if(ctr>=2) ctr = 0;	

			});
			$('#liker-list').html(arr_str_likers.join(''));
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

});	


		