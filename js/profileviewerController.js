$(document).on('pagebeforeshow', '#main', function(){   
	$('#mypanel').html(sideBarContent);   
	var profileData = JSON.parse(localStorage.getItem("profile"));

	$('#menu-profile-img').attr('src',site_url+profileData.profile_photo);
    $('.screen-name').html(profileData.screen_name);
	var fullProfileImage = site_url+profileData.profile_photo;
	$('#profile-img').attr('src',fullProfileImage);
	$('#profile-big-img').attr('src',fullProfileImage.replace('thumbnails','full'));
	

	var view_member_id = localStorage.getItem("viewing_member_id");
	var viewingProfileData = JSON.parse(localStorage.getItem("viewing_profile"));
	var fullViewingProfileImage = site_url+viewingProfileData.profile_photo;	
	$('#profile-img').attr('src',fullViewingProfileImage);
	$('#profile-big-img').attr('src',fullViewingProfileImage.replace('thumbnails','full'));
	$('#ul-details').html('<li>'+viewingProfileData.age+'</li><li>'+viewingProfileData.gender+'</li><li>'+viewingProfileData.city+'</li><li>'+viewingProfileData.country+'</li>');
    $('.viewing-screen-name').html(viewingProfileData.screen_name);


	$('.gendernized').html(viewingProfileData.gendernized);
    var arr_member_details = [];

	var orientation			= viewingProfileData.orientation== ''? '--' : viewingProfileData.orientation;
	var str_ethnicity = viewingProfileData.ethnicity_options;


	var ethnicity_options 			= str_ethnicity == '' || 'null'? '--' : str_ethnicity.replace('|',', ');
	var height_feet 				= viewingProfileData.height_feet == '' || 'null'? '--' : viewingProfileData.height_feet;
	var height_inches 				= viewingProfileData.height_inches == '' || 'null'? '--' : viewingProfileData.height_inches;
	var height 						= height_feet == '--' ? '--' : height_feet +'\''+height_inches+'"';
	var body_type_options 			= viewingProfileData.body_type_options == '' || 'null'? '--' : viewingProfileData.body_type_options;
	
	var diet_options				= viewingProfileData.diet_options == '' || 'null'? '--' : viewingProfileData.diet_options;
	var diet_type					= viewingProfileData.diet_type == '' || 'null'? '--' : viewingProfileData.diet_type;
	var diet 						= diet_options == '--'? '--':diet_options+' '.diet_type;

	var smokes_options				= viewingProfileData.smokes_options == '' || 'null'? '--' : viewingProfileData.smokes_options;
	var drinks_options				= viewingProfileData.drinks_options == '' || 'null'? '--' : viewingProfileData.drinks_options;
	var drugs_options				= viewingProfileData.drugs_options == '' || 'null'? '--' : viewingProfileData.drugs_options;
	var religion_options			= viewingProfileData.religion_options == '' || 'null'? '--' : viewingProfileData.religion_options;
	var religion_type				= viewingProfileData.religion_type == '' || 'null'? '--' : viewingProfileData.religion_type;
	var religion 					= religion_options == '--' ?'--':religion_options+', '+religion_type;

	var sign_options				= viewingProfileData.sign_options == '' || 'null'? '--' : viewingProfileData.sign_options;
	var sign_type					= viewingProfileData.sign_type == '' || 'null'? '--' : viewingProfileData.sign_type;
	var sign 	 					= sign_options == '--' ?'--':sign_options+', '+sign_type;

	var education_options			= viewingProfileData.education_options == '' || 'null'? '--' : viewingProfileData.education_options;
	var education_type				= viewingProfileData.education_type == '' || 'null'? '--' : viewingProfileData.education_type;
	var education 					= education_options == '--' ?'--':education_options+' '+education_type;

	var job_options					= viewingProfileData.job_options == '' || 'null'? '--' : viewingProfileData.job_options;
	var income_options				= viewingProfileData.income_options == '' || 'null'? '--' : viewingProfileData.income_options;
	var relationship_status_options	= viewingProfileData.relationship_status_options == '' || 'null'? '--' : viewingProfileData.relationship_status_options;
	var relationship_form_options	= viewingProfileData.relationship_form_options == '' || 'null'? '--' : viewingProfileData.relationship_form_options;
	var relationship_form_type   	= viewingProfileData.relationship_form_type == '' || 'null'? '--' : viewingProfileData.relationship_form_type;
	var relationship_form 			= relationship_form_options == '--' ?'--':relationship_form_options+' '+relationship_form_type;

	var offspring_options  			= viewingProfileData.offspring_options == '' || 'null'? '--' : viewingProfileData.offspring_options;
	var offspring_type     			= viewingProfileData.offspring_type == '' || 'null'? '--' : viewingProfileData.offspring_type;
	var offspring 		 			= offspring_options == '--' ?'--':offspring_options+', but '+offspring_type;

	var pets_dogs					= viewingProfileData.pets_dogs == '' || 'null'? '--' : viewingProfileData.pets_dogs;
	var pets_cats					= viewingProfileData.pets_cats == '' || 'null'? '--' : viewingProfileData.pets_cats;
	var pets 		 				= pets_dogs == '--' ?'--':pets_cats+' and '+pets_cats;

	var speaks_options				= viewingProfileData.speaks_options == '' || 'null'? '--' : viewingProfileData.speaks_options;
	var speaks_type					= viewingProfileData.speaks_type == '' || 'null'? '--' : viewingProfileData.speaks_type;
	var speaks 		 				= speaks_options == '--' ?'--':speaks_options+' ('+speaks_type +')';

	arr_member_details.push('<li><h4>Orientation<div class="fetched-value-list ctm-pull-right">'+orientation+'</div></h4></li>');
	arr_member_details.push('<li><h4>Ethnicity<div class="fetched-value-list ctm-pull-right">'+ethnicity_options+'</div></h4></li>');	
	arr_member_details.push('<li><h4>Height<div class="fetched-value-list ctm-pull-right">'+height+'</div></h4></li> ');
	arr_member_details.push('<li><h4>Body Type<div class="fetched-value-list ctm-pull-right">'+body_type_options+'</div></h4></li> ');
	arr_member_details.push('<li><h4>Diet<div class="fetched-value-list ctm-pull-right">'+diet+'</div></h4></li> ');
	arr_member_details.push('<li><h4>Smokes<div class="fetched-value-list ctm-pull-right">'+smokes_options+'</div></h4></li>'); 
	arr_member_details.push('<li><h4>Drinks<div class="fetched-value-list ctm-pull-right">'+drinks_options+'</div></h4></li> ');
	arr_member_details.push('<li><h4>Drugs<div class="fetched-value-list ctm-pull-right">'+drugs_options+'</div></h4></li>'); 
	arr_member_details.push('<li><h4>Religion<div class="fetched-value-list ctm-pull-right">'+religion+'</div></h4></li>'); 
	arr_member_details.push('<li><h4>Sign<div class="fetched-value-list ctm-pull-right">'+sign+'</div></h4></li> ');
	arr_member_details.push('<li><h4>Education<div class="fetched-value-list ctm-pull-right">'+education+'</div></h4></li> ');
	arr_member_details.push('<li><h4>Job<div class="fetched-value-list ctm-pull-right">'+job_options+'</div></h4></li> ');
	arr_member_details.push('<li><h4>Income<div class="fetched-value-list ctm-pull-right">'+income_options+'</div></h4></li> ');
	arr_member_details.push('<li><h4>Relationship Status<div class="fetched-value-list ctm-pull-right">'+relationship_status_options+'</div></h4></li>');
	arr_member_details.push('<li><h4>Relationship Type<div class="fetched-value-list ctm-pull-right">'+relationship_form+'</div></h4></li> ');
	arr_member_details.push('<li><h4>Offspring<div class="fetched-value-list ctm-pull-right">'+offspring+'</div></h4></li> ');
	arr_member_details.push('<li><h4>Pets<div class="fetched-value-list ctm-pull-right">'+pets+'</div></h4></li> ');
	arr_member_details.push('<li><h4>Speaks<div class="fetched-value-list ctm-pull-right">'+speaks+'</div></h4></li>');                                    
	
	$('#member-detials').html(arr_member_details.join('')).listview('refresh');



	var arr_photos = [];
	$.each( viewingProfileData.photos, function(name,value ) {
		
		arr_photos.push('<img class="ctm-full-width" src="'+site_url+value.photoFile+'">');
		//alert(value.photoFile);
	});
	$('#profile-photos').html(arr_photos.join(''));

	var arr_essayFields = [];
	$.ajax({
	    url: api_url + "model_api.php?model=getEssayField",
	    type: 'post',
	    success:function(data){
			$.each( data, function(name,value ) {
				if(viewingProfileData[name] != null)
				{
				arr_essayFields.push('<div class="ui-grid-solo essay-block">');
					arr_essayFields.push('<h3>'+value[0]+'</h3>');
                    arr_essayFields.push('<div class="essay-content">');

							arr_essayFields.push('<p id="'+name+'_label">'+viewingProfileData[name]+'</p>');

					arr_essayFields.push('</div>');   
				arr_essayFields.push('</div>');
				}  				
			});
			$('#profile-essay').html(arr_essayFields.join(''));
	    },		    

	});	

	$.ajax({
	    url: api_url + "remote_api.php?controller=checkIfUserIsBlocked&member_id="+profileData.member_id+"&blocked_member_id="+ localStorage.getItem("viewing_member_id"),
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
	    url: api_url + "remote_api.php?controller=checkIfUserIsReported&member_id="+profileData.member_id+"&blocked_member_id="+ localStorage.getItem("viewing_member_id"),
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


    $('#main').on('click','.lnk-block-user',function(e) { 
		
		if(confirm('Are you sure you want to block this person?'))
		{
			$.ajax({
			    url: api_url + "remote_api.php?controller=blockUser&member_id="+profileData.member_id+"&blocked_member_id="+ localStorage.getItem("viewing_member_id"),
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
			    url: api_url + "remote_api.php?controller=unblockUser&member_id="+profileData.member_id+"&blocked_member_id="+ localStorage.getItem("viewing_member_id"),
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

$(document).on('pagebeforeshow', '#main-short-profile', function(){   
	var profileData = JSON.parse(localStorage.getItem("profile"));


	$('#member_id').val(profileData.member_id);
	$('#username').val(profileData.screen_name);
	
	var birthday = profileData.birthday;
	var arr_birthday = birthday.split('-');

	var defaultYear = new Date().getFullYear() - 18;
	var defaultMonth = new Date().getMonth();
	var defaultDay = new Date().getDate() - 1;

	$('#dd_bday_month').on('change', function () {
	      var days = daysInMonth($('#dd_bday_month').val(), $('#dd_bday_year').val());
	      var option = '';
	      // var option = '<option selected="selected" value="">Day</option>';
	      var selected ='';
	      for (var i = 1; i <= days; i++) {
	      	  selected = '';
	      	  if(i == defaultDay)
	      	  {
	      	  	selected = 'selected="selected"';
	      	  }	
	          option += '<option value="' + i + '" '+ selected +'>' + i + '</option>';
	      }
	
	      $('#dd_bday_day').html(option);
	      $("#dd_bday_day").selectmenu('refresh');
	});

	$('#dd_bday_month').html(generateMonth(arr_birthday[1])).selectmenu('refresh');
	$('#dd_bday_day').html(generateDay(arr_birthday[2])).selectmenu('refresh');
	$('#dd_bday_year').html(generateYear(arr_birthday[0])).selectmenu('refresh');	
	
	$('#gender').html(generateGender(profileData.gender)).selectmenu('refresh');
	//WAIT FOR THE JSON TO LOAD BEFORE RENDEREING
	$.when(retrieveCountryJson()).then(function (dataJson) {
        $('#country').html(generateCountry(dataJson,profileData.country)).selectmenu('refresh');
    });		
	$('#city').val(profileData.city);  
	
  	$('#main-short-profile').on('submit','#form-short-profile',function(e) { 
	    e.preventDefault();  //prevent form from submitting
	    data = $(this).serialize();
		$.ajax({
		    url: api_url + "remote_api.php?controller=updateShortProfile",
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
					document.location.href="profile.html";
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


	 });	  
});
		