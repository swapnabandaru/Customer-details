user= {"fname":"","lname":"","agee":"","gender":"","occupation":"","image":"","dob":""};
		$( document ).ready(function() {
			$(".alert").hide();
			//console.log("start");
			var fileInput=document.getElementById("fileInput");
				//console.log(fileInput);
		 	fileInput.addEventListener('change',function(e){
		 			//console.log("clicked ");
					var file = fileInput.files[0];				
					var reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = function(e) {	
						 //console.log(reader.result);
						var photo=reader.result; 
						//console.log(photo);
						photo = photo.split(",").pop();
						//console.log(photo);
						user.image=photo;

					}
				});
				
			$(".alert").hide();
    		$('input#date').on('change', function() {
	  			var inputDate=this.value;
	  			
				var splitDate=inputDate.split("/",3);
				var a= new Date();
				var month=a.getMonth();
				var year=a.getFullYear(); 
				var date=a.getDate();
				
				user.dob=inputDate;
				
				if (splitDate[1]>month){
					var age =(year-splitDate[2])-1;
				}
				else if (date==splitDate[0] && month==splitDate[1]){
					var age = year-splitDate[2];
				}

				else if(splitDate[1]<month){
					var age= year-splitDate[2];
				}
				if(age<18 || age>60){
					alert("Age should be between 18 and 60");
					this.value="";
					this.focus();
				}			
				else {
					user.agee=age;
					//alert(age);
				}

			});
			$(".btn").on('click', function() {
				//alert("hey");
				document.getElementById("fname").value= "";
				document.getElementById("lname").value= "";
				document.getElementById("date").value= "";
				document.getElementById("m").checked = false;
				document.getElementById("f").checked = false;
				
			});
    		
		});
		users= [];
		
		
		function validateForm(){
			var x= document.forms["customerForm"]["fname"].value;
			if (x == null || x=="" ) {
        		alert("Please enter a name");
        		return false;
       		 }
        	else {
        		return true;
        	}
        
   		}
   		$('form').on('submit', myFunc);
   	  	function myFunc(event) {
    		event.preventDefault();
    		if (validateForm()){  				
				user.fname=document.getElementById("fname").value;
		 		user.lname=document.getElementById("lname").value;
		 		var selected = document.getElementsByName("occupation")[0].selectedIndex;
		 		user.occupation =  document.getElementsByName("occupation")[0].options[selected].text;	
		 		var chosengender = document.querySelector('input[name="gender"]:checked'); 			 		
		 		user.gender=chosengender.value;		 	
		 		console.log(user);	
		
		 		$.ajax({
		 			type: 'POST',   
	    			contentType: 'application/json',    
	    			data: JSON.stringify(user),    
	    			dataType: 'json',
	    			url: "/customer",
	    			  
	    			
	   		 		success: function (result) {
	   		 			$(".alert").show();
	   		 			$(".alert").html(result.result).fadeIn().delay(1250).fadeOut();
	        			console.log(result.result);
	   		 		},
	   		 		error: function (result) {
	   		 			console.log("AJAX POST error")
	        			$(".alert").show();
	   		 		}
				});
			
		 	}
   		}	