$(document).on('pagebeforeshow', '#main', function(){   
	$('#mypanel').html(sideBarContent);   
	var profileData = JSON.parse(localStorage.getItem("profile"));	  
	var reportData = JSON.parse(localStorage.getItem("report_details"));	

	$('#reportType').val(reportData[0].reportType);
	$('#itemId').val(reportData[0].itemId);
	$('#abuserMemberId').val(reportData[0].abuserMemberId);
	$('#reporterMemberId').val(reportData[0].reporterMemberId);


	 $('#main').on('submit','#frm-report',function(e) { 				 	
	    e.preventDefault();  //prevent form from submitting
	    data = $(this).serialize();
	    if(!$("input[name='violation']:checked").val())
	    {
	    	alert('Please select what kind of violation is commited.');
	    }
	    else if($("#description_value").val() == '')
	    {
	    	alert('Please provide short description about the violation.');
	    }
	    else
	    {
			$.ajax({
			    url: api_url + "remote_api.php?controller=reportAbuse",
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
						if(reportData[0].reportType == 'Message')
						{
							document.location.href="messages.html";
						}
						else if(reportData[0].reportType == 'Activity Post')
						{
							document.location.href="activities.html";
						}						
						else
						{
							document.location.href="matches.html";
						}
						
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








//	<img class="ctm-full-width" src="images/thumb-3.jpg">
});

