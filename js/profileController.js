$(document).on('pagebeforeshow', '#main', function(){   
	$('#mypanel').html(sideBarContent);   
	var profileData = JSON.parse(localStorage.getItem("profile"));	
	var JsonProfileDetailsFieldsData = JSON.parse(localStorage.getItem("JsonProfileDetailsFields"));
//alert(JsonProfileDetailsFieldsData['ethnicity'][3]['options']);

	$('#menu-profile-img').attr('src',site_url+profileData.profile_photo);
    $('.screen-name').html(profileData.screen_name);
	var fullProfileImage = site_url+profileData.profile_photo;
	$('#profile-img').attr('src',fullProfileImage);
	$('#profile-big-img').attr('src',fullProfileImage.replace('thumbnails','full'));
	$('#ul-details').html('<li>'+profileData.age+'</li><li>'+profileData.gender+'</li><li>'+profileData.city+'</li><li>'+profileData.country+'</li>');


	if(localStorage.getItem("reloadTab") != '' && localStorage.getItem("reloadTab") != null)
	{
		$('li').removeClass('ui-tabs-active ui-state-active');	
		$('li a').removeClass('ui-btn-active');		
		$('#one').hide();

		$('#' + localStorage.getItem("reloadTab")).addClass('ui-tabs-active ui-state-active');
		$('#' + localStorage.getItem("reloadTab") + ' a').addClass('ui-btn-active');
		$('#three').show();
		localStorage.removeItem("reloadTab");
	}

	var orientation					= profileData.orientation== ''? '--' : profileData.orientation;
	
	var str_ethnicity 				= profileData.ethnicity_options;
	var ethnicity_options 			= str_ethnicity == '' ? '--' : str_ethnicity.replace('|',', ');

	var height_cm 				= profileData.height_cm == '' ? '--' : profileData.height_cm;
	var height_feet 				= profileData.height_feet == '' ? '--' : profileData.height_feet;
	var height_inches 				= profileData.height_inches == '' ? '--' : profileData.height_inches;
	var height 						= height_feet == '--' ? '--' : height_feet +'\''+height_inches+'"';
	var body_type_options 			= profileData.body_type_options == '' ? '--' : profileData.body_type_options;
	
	var diet_options				= profileData.diet_options == '' ? '--' : profileData.diet_options;
	var diet_type					= profileData.diet_type == '' ? '--' : profileData.diet_type;
	var diet 						= diet_options == '--'? '--':diet_options+' '+diet_type;

	var smokes_options				= profileData.smokes_options == '' ? '--' : profileData.smokes_options;
	var drinks_options				= profileData.drinks_options == '' ? '--' : profileData.drinks_options;
	var drugs_options				= profileData.drugs_options == '' ? '--' : profileData.drugs_options;
	var religion_options			= profileData.religion_options == '' ? '--' : profileData.religion_options;
	var religion_type				= profileData.religion_type == '' ? '--' : profileData.religion_type;
	var religion 					= religion_options == '--' ?'--':religion_options+', '+religion_type;

	var sign_options				= profileData.sign_options == '' ? '--' : profileData.sign_options;
	var sign_type					= profileData.sign_type == '' ? '--' : profileData.sign_type;
	var sign 	 					= sign_options == '--' ?'--':sign_options+', '+sign_type;

	var education_options			= profileData.education_options == '' ? '--' : profileData.education_options;
	var education_type				= profileData.education_type == '' ? '--' : profileData.education_type;
	var education 					= education_options == '--' ?'--':education_options+' '+education_type;

	var job_options					= profileData.job_options == '' ? '--' : profileData.job_options;
	var income_options				= profileData.income_options == '' ? '--' : profileData.income_options;
	var relationship_status_options	= profileData.relationship_status_options == '' ? '--' : profileData.relationship_status_options;
	var relationship_form_options	= profileData.relationship_form_options == '' ? '--' : profileData.relationship_form_options;
	var relationship_form_type   	= profileData.relationship_form_type == '' ? '--' : profileData.relationship_form_type;
	var relationship_form 			= relationship_form_options == '--' ?'--':relationship_form_options+' '+relationship_form_type;

	var offspring_options  			= profileData.offspring_options == '' ? '--' : profileData.offspring_options;
	var offspring_type     			= profileData.offspring_type == '' ? '--' : profileData.offspring_type;
	var offspring 		 			= offspring_options == '--' ?'--':offspring_options+', but '+offspring_type;

	var pets_dogs					= profileData.pets_dogs == '' ? '--' : profileData.pets_dogs;
	var pets_cats					= profileData.pets_cats == '' ? '--' : profileData.pets_cats;
	var pets 		 				= pets_dogs == '--' ?'--':pets_cats+' and '+pets_cats;

	var speaks_options				= profileData.speaks_options == '' ? '--' : profileData.speaks_options;
	var speaks_type					= profileData.speaks_type == '' ? '--' : profileData.speaks_type;
	var speaks 		 				= speaks_options == '--' ?'--':speaks_options+' ('+speaks_type +')';


    $('#label-orientation').html(orientation);
    $('#label-ethnicity').html(str_ethnicity);    
    $('#label-height_cm').html(height_cm); 
    $('#label-body_type_options').html(body_type_options); 
    $('#label-diet_options').html(diet);  
    $('#label-smokes_options').html(smokes_options);         
    $('#label-drinks_options').html(drinks_options);    
    $('#label-drugs_options').html(drugs_options);      
    $('#label-religion_options').html(religion);      
    $('#label-sign_options').html(sign);    
    $('#label-education_options').html(education);     

    $('#label-job_options').html(job_options);     
    $('#label-income_options').html(income_options);     
    $('#label-relationship_status_options').html(relationship_status_options);     
    $('#label-relationship_form_options').html(relationship_form);     
    $('#label-offspring_options').html(offspring);     
    $('#label-pets_dogs').html(pets);     
    $('#label-speaks_options').html(speaks);     


	// My Details FIELDS
	$('#height_cm').html(height_cm);
    $('#ethnicity-options').html(generateEthnicity(profileData.ethnicity_options)).trigger('create');
	$('#body_type_options').html(generateDropDownFromJson('body_type','options',profileData.body_type_options)).selectmenu('refresh');
	$('#orientation').html(generateDropDownFromJson('orientation','options',orientation)).selectmenu('refresh');	
	$('#diet_options').html(generateDropDownFromJson('diet','options',profileData.diet_options)).selectmenu('refresh');
	$('#diet_type').html(generateDropDownFromJson('diet','type',profileData.diet_type)).selectmenu('refresh');	
	$('#smokes_options').html(generateDropDownFromJson('smokes','options',profileData.smokes_options )).selectmenu('refresh');
	$('#drinks_options').html(generateDropDownFromJson('drinks','options',profileData.drinks_options)).selectmenu('refresh');
	$('#drugs_options').html(generateDropDownFromJson('drugs','options',profileData.drugs_options)).selectmenu('refresh');
	$('#religion_options').html(generateDropDownFromJson('religion','options',profileData.religion_options)).selectmenu('refresh');
	$('#religion_types').html(generateDropDownFromJson('religion','type',profileData.religion_type)).selectmenu('refresh');
	$('#sign_options').html(generateDropDownFromJson('sign','options',profileData.sign_options)).selectmenu('refresh');
	$('#sign_type').html(generateDropDownFromJson('sign','type',profileData.sign_type)).selectmenu('refresh');
	$('#education_options').html(generateDropDownFromJson('education','options',profileData.education_options)).selectmenu('refresh');
	$('#education_type').html(generateDropDownFromJson('education','type',profileData.education_type)).selectmenu('refresh');
	$('#job_options').html(generateDropDownFromJson('job','options',profileData.job_options)).selectmenu('refresh');
	$('#income_options').html(generateDropDownFromJson('income','options',profileData.income_options)).selectmenu('refresh');
	$('#relationship_status_options').html(generateDropDownFromJson('relationship_status','options',profileData.relationship_status_options)).selectmenu('refresh');
	$('#relationship_form_options').html(generateDropDownFromJson('relationship_form','options',profileData.relationship_form_options)).selectmenu('refresh');
	$('#relationship_form_type').html(generateDropDownFromJson('relationship_form','type',profileData.relationship_form_type )).selectmenu('refresh');
	$('#offspring_options').html(generateDropDownFromJson('offspring','options',profileData.offspring_options)).selectmenu('refresh');
	$('#offspring_type').html(generateDropDownFromJson('offspring','type',profileData.offspring_type)).selectmenu('refresh');
	$('#pets_dogs').html(generateDropDownFromJson('pets','dogs',profileData.pets_dogs)).selectmenu('refresh');
	$('#pets_cats').html(generateDropDownFromJson('pets','cats',profileData.pets_cats)).selectmenu('refresh');
	$('#speaks_options').html(generateDropDownFromJson('speaks','options',profileData.speaks_options)).selectmenu('refresh');
	$('#speaks_type').html(generateDropDownFromJson('speaks','type',profileData.speaks_type)).selectmenu('refresh');
	


	var arr_photos = [];
	$.each( profileData.photos, function(name,value ) {
		
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

				arr_essayFields.push('<div class="ui-grid-solo essay-block">');
					arr_essayFields.push('<h3>'+value[0]+'</h3>');
                    arr_essayFields.push('<div class="essay-content">');
	
						if(profileData[name] != null)
						{
							arr_essayFields.push('<p id="'+name+'_label">'+profileData[name]+'</p>');
						}     
						else
						{
							arr_essayFields.push('<p id="'+name+'_label"><em>'+value[1]+'</em></p>');
						}               					
						
						arr_essayFields.push('<a class="edit-link edit-essay" href="#"><span class="edit-btn" href="#"><i class="fa fa-pencil"></i></span>edit</a>');					
					arr_essayFields.push('</div>');   
                    arr_essayFields.push('<div class="essay-form">');
	                    arr_essayFields.push('<form id="frm-'+name+'" class="frm-essay" name="frm-'+name+'" returnKey="'+name+'" method="post">');
							if(profileData[name] != null)
							{
								arr_essayFields.push('<textarea cols="40" rows="8" name="'+name+'_value" id="'+name+'_value" class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset" placeholder="'+value[1]+'">'+profileData[name]+'</textarea>');
							}     
							else
							{
								arr_essayFields.push('<textarea cols="40" rows="8" name="'+name+'_value" id="'+name+'_value" class="ui-input-text ui-body-c ui-corner-all ui-shadow-inset" placeholder="'+value[1]+'"></textarea>');
							}   
	                      
	                      arr_essayFields.push('<button type="submit" class="ui-shadow ui-btn ui-corner-all ctm-btn-green">Submit</button>');
	                      arr_essayFields.push('<button type="button" class="ui-shadow ui-btn ui-corner-all btn-cancel-edit-essay">Cancel</button>');
	                      arr_essayFields.push('<input type="hidden" id="member_id" name="member_id" value="'+profileData.member_id+'">');
	                      arr_essayFields.push('<input type="hidden" id="objKey" name="objKey" value="'+name+'">');
	                    arr_essayFields.push('</form>');
					arr_essayFields.push('</div>');                     				
				arr_essayFields.push('</div>');
			});
			$('#profile-essay').html(arr_essayFields.join(''));
	    },		    

	});	

    $('#main').on('click','.edit-essay',function(e) { 
       $(this)
          .closest('.essay-block')
          .addClass('editing'); 
          return false;
      
    });

   $('#main').on('click','.btn-cancel-edit-essay',function(e) { 
       $(this)
          .closest('.essay-block')
          .removeClass('editing'); 
          return false;
      
    }); 

   $('#main').on('submit','.frm-essay',function(e) { 
	    e.preventDefault();  //prevent form from submitting
	    var returnKey = $(this).attr('returnKey');
	    data = $(this).serialize();
		$.ajax({
		    url: api_url + "remote_api.php?controller=updateEssay",
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
					$('#'+returnKey+'_label').html(value[1]);
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

   $('#main').on('submit','.frm-my-details',function(e) { 
	    e.preventDefault();  //prevent form from submitting
	    data = $(this).serialize();
		$.ajax({
		    url: api_url + "remote_api.php?controller=updateProfileDetails&member_id="+profileData.member_id,
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
			      	localStorage.setItem("reloadTab", 'tab-3'); 
					document.location.href="profile.html";
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
		