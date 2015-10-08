function generateGender(selectedItem){
	var arrObj = ['Female','Male'];

	var arr_str = [];
	for(var ctr=0; ctr<arrObj.length;ctr++ )
	{
		selected = '';
		if(arrObj[ctr] == selectedItem)
		{
			selected = 'selected="selected"';
		}			
		arr_str.push('<option value="'+arrObj[ctr]+'" '+selected+'>'+arrObj[ctr]+'</option>');
	}

	
	return arr_str.join('');
}

function generateOrientation(selectedItem){
	var arrObj = ['Straight','Gay','Bisexual'];	
	var arr_str = [];
	for(var ctr=0; ctr<arrObj.length;ctr++ )
	{
		selected = '';
		if(arrObj[ctr] == selectedItem)
		{
			selected = 'selected="selected"';
		}			
		arr_str.push('<option value="'+arrObj[ctr]+'" '+selected+'>'+arrObj[ctr]+'</option>');
	}	
	
	return arr_str.join('');
}

function generateEthnicity(selectedItem)
{
	var arr_str = [];
	var ctr = 0;
	var arr_block = ['a', 'b', 'c'];	
	var dataJson = JSON.parse(localStorage.getItem("JsonProfileDetailsFields"));
	var index= 0;
	arr_Item = selectedItem.split('|');

	$.each(dataJson['ethnicity'][3]['options'], function(i,item){
		selected = '';
		if(arr_Item.indexOf(item) != '-1')
		{
			selected = 'checked="checked"';
		}			
		// arr_str.push('<div class="ui-block-'+arr_block[ctr]+'">');
		// 	arr_str.push('<div class="ui-checkbox ui-mini">');
		// 		arr_str.push('<label for="checkbox-mini-'+index+'" class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-checkbox-off">'+item+'</label>');
		// 		arr_str.push('<input type="checkbox" name="checkbox-mini-'+index+'" id="checkbox-mini-'+index+'" data-mini="true" value="'+item+'" '+selected+'>');
		// 	arr_str.push('</div>');
		// arr_str.push('</div>');
		arr_str.push('<div class="ui-block-'+arr_block[ctr]+'">');
			arr_str.push('<input type="checkbox" name="ethnicity_options[]" id="checkbox-mini-'+index+'" data-mini="true" '+selected+' value="'+item+'">');
			arr_str.push('<label for="checkbox-mini-'+index+'">'+item+'</label>');
		arr_str.push('</div>');
		ctr++;
		index++;
		if(ctr>=3) ctr = 0;			

	});
	return arr_str.join('');
}

function generateDropDownFromJson(itemKey,itemOption,selectedItem)
{
	var arr_str = [];
	var dataJson = JSON.parse(localStorage.getItem("JsonProfileDetailsFields"));	
	
	arr_str.push('<option value="">--</option>');
	$.each(dataJson[itemKey][3][itemOption], function(i,item){
		selected = '';
		if(item == selectedItem)
		{
			selected = 'selected="selected"';
		}			
	 	arr_str.push('<option value="'+item+'" '+selected+'>'+item+'</option>');
	});
	return arr_str.join('');
}

function generateCountry(dataJson,selectedItem)
{
	var arr_str = [];
	$.each(dataJson, function(i,item){
		selected = '';
		if(item.id == selectedItem)
		{
			selected = 'selected="selected"';
		}			
	 	arr_str.push('<option value="'+item.id+'" '+selected+'>'+item.name+'</option>');
	});
	return arr_str.join('');
}

function retrieveCountryJson(){
 	return $.ajax({
	    url: api_url + "model_api.php?model=getCountry",
	    type: 'get',
	    dataType: "json"
	
	});
}

function generateCountry(dataJson,selectedItem)
{
	var arr_str = [];
	$.each(dataJson, function(i,item){
		selected = '';
		if(item.id == selectedItem)
		{
			selected = 'selected="selected"';
		}			
	 	arr_str.push('<option value="'+item.id+'" '+selected+'>'+item.name+'</option>');
	});
	return arr_str.join('');
}

function generateYear(selectedYear){
	var arr_str = [];
	var currentYear = new Date().getFullYear();
	var selected = '';
	for(var year= currentYear; year>=currentYear - 75;year--)
	{
		selected = '';
		if(year == selectedYear)
		{
			selected = 'selected="selected"';
		}		
		arr_str.push('<option value="'+year+'"'+selected+'>'+year+'</option>');

	}
	return arr_str.join('');
}

function generateMonth(selectedMonth){
	var monthName = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ]; 
	var arr_str = [];
	var selected = '';
	for(var month = 1; month<=12;month++)
	{
		selected = '';
		if(month == selectedMonth)
		{
			selected = 'selected="selected"';
		}		
		arr_str.push('<option value="'+month+'"'+selected+'>'+monthName[month-1]+'</option>');

	}
	return arr_str.join('');
}              
           
function generateDay(selectedDay){
	var arr_str = [];
	var selected = '';
	for(var day= 1; day<=31;day++)
	{
		selected = '';
		if(day == selectedDay)
		{
			selected = 'selected="selected"';
		}		
		arr_str.push('<option value="'+day+'"'+selected+'>'+day+'</option>');

	}
	return arr_str.join('');
}

function daysInMonth(month, year) {
      return new Date(year, month, 0).getDate();
} 

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};
