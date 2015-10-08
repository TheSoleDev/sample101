$(document).on('pagebeforeshow', '#main', function(){   
														
	$('#mypanel').html(sideBarContent);   
	var profileData = JSON.parse(localStorage.getItem("profile"));	  

	$.ajax({
	    url: api_url + "model_api.php?model=generatePaypalFields",
	    type: 'post',
		dataType: "json",					    
	    success:function(data){

			//paypalData =JSON.stringify(data);
			$('#frmSubscription').attr('action',data[0]['paypal_form_url']);
			$('#member_id').val(profileData.member_id);
			$('#invoice').val(data[0]['invoice']);
			$('#product_quantity').val(data[0]['product_quantity']);
			$('#product_amount').val('');
			$('#payer_fname').val('');
			$('#payer_lname').val('');
			$('#payer_address').val('');
			$('#payer_city').val(profileData.city);
			$('#payer_state').val(profileData.city);
			$('#payer_zip').val('');
			$('#payer_country').val(profileData.country);
			$('#payer_email').val(profileData.email_address);						
	    },		    
		error: function(xhr, textStatus, errorThrown){
	       alert(xhr +" "  +textStatus +" "  + errorThrown);
	    }					
	});

	var paypalDetails = JSON.parse(localStorage.getItem("paypalData"));	





	$.ajax({
	    url:  api_url + "model_api.php?model=getMembershipBanner",
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

			var arr_str = [];	

			arr_str.push('<div id="carousel-slide" class="owl-carousel">');
				$.each(data, function(name,value ) {
					arr_str.push(value.banner_content);				
				});
			arr_str.push('</div>');

			$('#membership-banner').html(arr_str.join(''));
			$("#carousel-slide").owlCarousel({
				singleItem : true,
				transitionStyle : "fade",
				autoPlay : true
			});
	    },
	    error: function(jqXHR, textStatus, errorThrown) {
	        alert("Error... " + textStatus + "        " + errorThrown);
	    }

	});


	$.ajax({
	    url:  api_url + "model_api.php?model=getPremiumPackageOption",
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

			var arr_str = [];		

			arr_str.push('<fieldset class="price-option" data-role="controlgroup">');
				arr_str.push('<legend>Get more with Premium Account</legend>');
				var checked = ' checked="checked"';
				$.each( data, function(name,value ) {
					arr_str.push('<input type="radio" name="package_plan" class="packages" id="package_'+value.id+'" value="'+value.membership_fee+'" returnId="'+value.id+'" returnName="'+value.membership_package+'"'+checked+'>');
					arr_str.push('<label for="package_'+value.id+'"><span>S$'+value.membership_fee+'</span> | '+value.membership_package+' package</label>');				
					checked = '';
				});

			arr_str.push('</fieldset>');

			$('#subscription-packages').html(arr_str.join(''));
			$('#subscription-packages').trigger("create");

			$('#product_amount').val($(".packages:checked").val());
			$('#product_id').val($(".packages:checked").attr('returnId'));		
			$('#product_name').val($(".packages:checked").attr('returnName'));
				
	    },
	    error: function(jqXHR, textStatus, errorThrown) {
	        alert("Error... " + textStatus + "        " + errorThrown);
	    }

	});


    $('#frmSubscription').on('submit',function(e) { 
    	//setTimeout(function(){document.location.href = "dashboard.html";},500);
    });

    $('#main').on('change','.packages',function(e) { 
		$('#product_amount').val($(this).val());
		$('#product_id').val($(this).attr('returnId'));		
		$('#product_name').val($(this).attr('returnName'));				
    });
});


