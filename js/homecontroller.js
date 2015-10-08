// CHECK IF USER IS ALREADY LOGGED
if (localStorage.getItem("profile") !== null) {
	document.location.href="dashboard.html";
}	


$(document).on('pagebeforeshow', '#home', function(){      

	$('#gender').html(generateGender('')).selectmenu('refresh');
	$('#orientation').html(generateOrientation('')).selectmenu('refresh');


	var arr_featuredPhotos = [];
	$.ajax({
	    url: api_url + "model_api.php?model=getJsonHomePageFeaturedPhotos",
	    type: 'post',
	    success:function(data)
	    {
    		var arr_block = ['a', 'b','c'];
    		var ctr = 0;
			$.each(data, function(name,value ) {
				arr_featuredPhotos.push('<div class="ui-block-'+arr_block[ctr]+'">');
					arr_featuredPhotos.push('<div class="ui-body ui-body-d ctm-no-border ctm-no-padding">');
						arr_featuredPhotos.push('<a href="#"><img class="ctm-full-width ctm-block" src="'+site_url+value.featured_photo+'"></a>');
					arr_featuredPhotos.push('</div>');
				arr_featuredPhotos.push('</div>');	
				ctr++;
				if(ctr>=3) ctr = 0;		
			});
	
			arr_featuredPhotos.push('<div class="welcome-overlay-box">');	
				arr_featuredPhotos.push('<h2>An easier way to make new friends</h2>');	
				arr_featuredPhotos.push('<h4>Start meeting people now!</h4>');	
			arr_featuredPhotos.push('</div>');			  
			
			$('#featured-photo').html(arr_featuredPhotos.join(''));
	    },		    

	});	
	


	$('#frm-register').on('submit', function(e) { //use on if jQuery 1.7+
	    e.preventDefault();  //prevent form from submitting
	    data = $(this).serialize();
		$.ajax({
		    url: api_url + "remote_api.php?controller=home&action=register",
		    type: 'post',
			data: data,
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

			      if(value == 'Success')
			      {
					$.ajax({
					    url: api_url + "remote_api.php?controller=home&action=login",
					    type: 'post',
						data: data,
						beforeSend: function() {
							$.mobile.loading( 'show', {
									text: 'Please wait while we log you in...',
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
						      if(value == 'Success')
						      {
						      	document.location.href="dashboard.html";
						      }
						      else {
						      	alert( "Failed: " + value[1] );
						      }
						    });
			            },		    
					
					});
			      }
			      else {
			      	alert( "Failed: " + value[1] );
			      }
			    });
            },		    
		
		});
		//document.location.href="dashboard.html";
	 });
});

$(document).on('pagebeforeshow', '#register-page', function(){ 

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

	$('#dd_bday_month').html(generateMonth(defaultMonth)).selectmenu('refresh');
	$('#dd_bday_day').html(generateDay(defaultDay)).selectmenu('refresh');
	$('#dd_bday_year').html(generateYear(defaultYear)).selectmenu('refresh');	

	//WAIT FOR THE JSON TO LOAD BEFORE RENDEREING
	$.when(retrieveCountryJson()).then(function (dataJson) {
        $('#country').html(generateCountry(dataJson,'')).selectmenu('refresh');
    });
    
	$('#btn-next').on('click', function(e) { 
		var error = [];
		$('.required').each(function() {
			var objDesc = {city:'City',email_address:'Email address', cemail_address:'Confirm Email address'}
			if($(this).val() == '')
			{
				error.push(objDesc[$(this).attr('name')] + ' is required. \n');
			}
		});
		
		if( !isValidEmailAddress( $('#email_address').val()) ) 
		{
			error.push('Please provide valid email address. \n');
		}
		else if($('#email_address').val() != $('#cemail_address').val())
		{
			error.push('Please confirm your email address. \n');
		}
		
		if(error.length > 0)
		{
			alert(error.join(''));
			return false;
		}
		else 
		{
			document.location.href="index.html#register-end";
		}
	});    

});

$(document).on('pagebeforeshow', '#register-end', function(){ 
	$('#btn-register').on('click', function(e) { 	
		var error = [];

		if($('#reg-username').val() == '')
		{
			error.push('Username is required. \n');
		}
		else if($('#reg-password').val() == '')
		{
			error.push('Password is required. \n');
		}
		else if(  $('#reg-username').lenght < 6 || $('#reg-username').lenght > 30 ) 
		{
			error.push('The username must be more than 6 and less than 30 characters long \n');
		}
		else if(  $('#reg-password').lenght < 6 || $('#reg-password').lenght > 30 ) 
		{
			error.push('The password must be more than 6 characters long \n');
		}
		else if(!$('#agree_to_toc').is(':checked'))
		{
			error.push('You must agree to our Terms and Conditions. \n');
		}
		if(error.length > 0)
		{
			alert(error.join(''));
			return false;
		}
		else 
		{
			
		}
		
	});
});	

