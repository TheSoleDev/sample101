$(document).on('pagebeforeshow', '#main', function(){   
	$('#mypanel').html(sideBarContent);   
	var profileData = JSON.parse(localStorage.getItem("profile"));
		var activityListData = JSON.parse(localStorage.getItem("activityList"));

    $('.member_id').html(profileData.member_id);
	$('#menu-profile-img').attr('src',site_url+profileData.profile_photo);
    $('.screen-name').html(profileData.screen_name);

	var arr_str = [];

	$.ajax({
	    url: api_url + "remote_api.php?controller=retrieveRecentlyvisited&member_id="+profileData.member_id,
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

        	
			arr_str.push('<div class="block-level-holder collapse">');
			var dateViewed = '';
			$.each( data, function(name,value ) {
                
                if(dateViewed != value.date_viewed && dateViewed != '' )
                {
					arr_str.push('</div>');
					arr_str.push('<div class="block-level-holder collapse">');
					
                }


                arr_str.push('<div class="block-level">');    	
                            arr_str.push('<div class="avatar-member">');
                                arr_str.push('<a href="#">');
                                    arr_str.push('<img src="'+site_url+value.profile_photo+'">');
                                arr_str.push('</a>');
                                arr_str.push('<div class="avatar-details">');
									arr_str.push('<a href="#" class="lnk-view-profile" returnKey="'+ value.id+'" data-ajax="false">');                                
	                                    arr_str.push('<span>'+value.screen_name+'</span>');
	                                    arr_str.push('<ul>');
	                                        arr_str.push('<li>'+ value.age +' '+value.city+' '+value.country+'</li>');
	                                    arr_str.push('</ul>');
									arr_str.push('</a>');                                    
                                arr_str.push('</div>');
                            arr_str.push('</div>');
                arr_str.push('</div>');

 				if(dateViewed == '' )
                {

					dateViewed = value.date_viewed;
					arr_str.push('<span class="date-visited">'+dateViewed+'</span>');
                }

                if(dateViewed != value.date_viewed && dateViewed != '' )
                {

                	dateViewed = value.date_viewed;
                	arr_str.push('<span class="date-visited">'+dateViewed+'</span>');
                }                

			});


                
        	arr_str.push('</div>');

			$('#historyList').html(arr_str.join(''));
	    },
	    error: function(jqXHR, textStatus, errorThrown) {
	        alert("Error... " + textStatus + "        " + errorThrown);
	    }

	});

   $('#main').on('click','.block-level-holder .avatar-member',function(e) { 
		$(this).closest(".block-level-holder").toggleClass('collapse', 'expand');
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


		