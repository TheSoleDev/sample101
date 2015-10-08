// CHECK IF USER IS ALREADY LOGGED
if (localStorage.getItem("profile") !== null) {
	document.location.href="dashboard.html";
}	


$(document).on('pagebeforeshow', '#signin-page', function(){      

//queuehistory = 'Bwahaha';
//localStorage.setItem("queuehistory", queuehistory); 
//
//if (localStorage.getItem("queuehistory"))
//{
//  alert(localStorage.getItem("queuehistory"));
//} 

	$('#form-signin').on('submit', function(e) { //use on if jQuery 1.7+
	    e.preventDefault();  //prevent form from submitting
	    data = $(this).serialize();
		$.ajax({
		    url: api_url + "remote_api.php?controller=home&action=login",
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
					$.ajax({
					    url: api_url + "remote_api.php?controller=profile&member_id=" + value[1],
					    type: 'post',
						dataType: "json",					    
					    success:function(data){

							profileData =JSON.stringify(data);
							localStorage.setItem("profile", profileData); 
							
//							$.each( JSON.parse(localStorage.getItem("profile")), function(name,value ) {
//							  alert(value);
//							});
							document.location.href="dashboard.html";
					    },		    
						error: function(xhr, textStatus, errorThrown){
					       alert(xhr +" "  +textStatus +" "  + errorThrown);
					    }					
					});
			      	//document.location.href="dashboard.html";
			      }
			      else {
			      	alert( "Failed: " + value[1] );
			      }
			    });
            },		    
			error: function(xhr, textStatus, errorThrown){
		       alert('Login failed');
		    }
		});
	
		//document.location.href="dashboard.html";
	 });

});

