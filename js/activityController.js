$(document).on('pagebeforeshow', '#main', function(){   
	$('#mypanel').html(sideBarContent);   
	var profileData = JSON.parse(localStorage.getItem("profile"));
		var activityListData = JSON.parse(localStorage.getItem("activityList"));

    $('.member_id').html(profileData.member_id);
	$('#menu-profile-img').attr('src',site_url+profileData.profile_photo);
    $('.screen-name').html(profileData.screen_name);

	var arr_str = [];
	$.ajax({
	    url: api_url + "remote_api.php?controller=retrieveActivities&member_id="+profileData.member_id,
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



				arr_str.push('<div class="ui-grid-solo">');
					arr_str.push('<div class="avatar-container">');
						arr_str.push('<div class="member-avatar">');
							arr_str.push('<a href="#" class="lnk-view-profile" returnKey="'+ value.member_id+'" data-ajax="false"><img class="ctm-pull-left" src="'+site_url + value.profile_photo+'"></a>');
						arr_str.push('</div>');
					arr_str.push('</div>');
					arr_str.push('<div class="row-content">');
						arr_str.push('<ul class="member-stat">');
							arr_str.push('<li><a href="#">'+value.screen_name+'</a></li>');
							arr_str.push('<li><div class="member-details"><span>'+ value.age +'</span><span>'+value.city+'</span><span>'+value.country+'</span></div></li>');
						arr_str.push('</ul>');
						
						arr_str.push('<br>');
						arr_str.push('<p>'+value.activity_content+'</p>');
						arr_str.push('<span class="square-heart"><i class="fa fa-heart"></i></span>');
						arr_str.push('<br /><div class="pull-right message-header"><a href="#" class="lnk-report-violation" returnType="Activity Post" returnItemId="'+value.id+'" returnAbuserMemberId="'+value.member_id+'"  data-ajax="false">Report Post</a><span id="report-user" style="display:none;">Report is pending for review</span></div>');
					arr_str.push('</div>');
				arr_str.push('</div>');


			});
			$('#activity-list').html(arr_str.join(''));
	    },
	    error: function(jqXHR, textStatus, errorThrown) {
	        alert("Error... " + textStatus + "        " + errorThrown);
	    }

	});

	$('#main').on('submit','#frm-activity',function(e) { 
	    e.preventDefault();  //prevent form from submitting
	    var returnKey = $(this).attr('returnKey');
	    data = $(this).serialize();
		$.ajax({
		    url: api_url + "remote_api.php?controller=postActivity",
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
					$('#activity_content').val('');
					document.location.href="activities.html";
			      }
			      else {
			      	alert( "Failed: " + value[1] );
			      }
			    });
            },		    
			error: function(xhr, textStatus, errorThrown){
		       alert(xhr.responseText +" "  +textStatus +" "  + errorThrown);
		    }	
		});
		$(this)
          .closest('.essay-block')
          .removeClass('editing'); 

	 });  

    $('#main').on('click','.lnk-report-violation',function(e) { 
		localStorage.removeItem("report_details");
		var arrayObj = [];
		arrayObj.push({
    		reportType : $(this).attr('returnType'),
    		itemId : localStorage.getItem("viewing_member_id"),
    		abuserMemberId : localStorage.getItem("viewing_member_id"),  
    		reporterMemberId : profileData.member_id
	    });
		var jsonString = JSON.stringify(arrayObj);
		localStorage.setItem("report_details", jsonString);     	
        document.location.href="report-violation.html";

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


		