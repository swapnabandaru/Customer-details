$(document).ready(function(){	
	$(".alert").hide();
		$.getJSON("/customerdict", function(data){

	   	 			console.log(data);	
	   	 			  	 			
	   	 			
	   	 			$(".alertnosearchresult").show();
	   	   	 		html="";
	   	   	 		$.each(data,function(i,customer){
	   	   	 			html += `		
								<div class="col-md-4 panel panel-default panel-body content">
									<div class="row">
										<div class="col-md-6">
											<h6>  `+ "<img  src='" + customer.image + "'>" +` </h6>
											<h5> <a href='http://127.0.0.1:5000/edit/`+ customer._id.$oid +`'> Edit </a></h5>
											
											<h5 > <a  data-id="`+ customer._id.$oid +`" id="delete" href="#"> Delete </a></h5>
										</div>
										<div class="col-md-6">
												<h3> Name: `+customer.fname+`</h3>
												<h4> Age: `+customer.agee+` </h4>
												<h4> Gender: `+customer.gender+` </h4>
												<h4> Occupation: `+customer.occupation+` </h4>
										</div>
									</div>																	
								</div>
`;					
									
	   	   	 		});	 
	   	 			$("#content").html(html);	
	   	 			$(document).on('click', "a#delete", function(event){
	   	 									event.preventDefault();
       
	   	 						
	   	 									customerobject=$(this)
													
								   			$.ajax({
									 			type: 'GET',   
								    			//contentType: 'application/json',    
								    			//data: JSON.stringify(html),    
								    			//dataType: 'json',
								    			url: "/delete/"+ customerobject.attr('data-id'),
								    			//$("#id").val()
								    			
								   		 		success: function (result){
								   		 			$(".alert").show();
								   		 			$(".alert").html(result.result).fadeIn().delay(1250).fadeOut();
								        			console.log(result.result);
								        			customerobject.parent().parent().parent().parent().remove();
								   		 		},
								   		 		error: function (result) {
								   		 			console.log("AJAX POST error")
								        			$(".alert").show();
								   		 		}
								});

					   	});
	   	 	

	   	 			 	 			
	   	 		});	
		
   	 	$("#search").click(function(){
   	 		var person=document.getElementById("user").value;
    	    if (person) {
    	    	
  				$.getJSON("/customerdict/"+person,function(data){
		  			if (jQuery.isEmptyObject(data)){
		  					console.log("No customer"); 
		  					$(".alertnosearchresult").show();	
		  					$("#content").hide();

		  					document.getElementById("data").innerHTML="<strong>Sorry! No search results<strong>";
		  				}
		  			else{	
		  					//console.log(data.firstname);
		  					//console.log(data.age);
		  					document.getElementById("content").innerHTML =`		
								<div class="col-md-4 panel panel-default panel-body">
									<div class="row">
										<div class="col-md-6">
											<h6>  `+ "<img src='/images/" + data.firstname + ".jpeg'>" +` </h6>
										</div>
										<div class="col-md-6">
												<h3> Name: `+data.firstname+" " +data.lastname+`</h3>
												<h4> Age: `+data.age+` </h4>
												<h4> Gender: `+data.gender+` </h4>
												<h4> Occupation: `+data.occupation+` </h4>
										</div>
									</div>																	
								</div>
`;
		  				}
	  			});
  			}
  			else if (person==null || person==""){				  		
		  			$(".alertnosearchresult").show();	
		  			$("#content").hide();	  				
			  		document.getElementById("data").innerHTML=" <strong>Please enter a valid name!</strong>";
			  		}
	 });		
	   	$("#allcustomerdetails").click(function(){
	   	 		$.getJSON("/customerdict", function(data){
	   	 			console.log(data);	   	 			
	   	 			$(".alert1").show();
	   	 			$("#content").show();
	   	 			$(".alertnosearchresult").hide();
	   	   	 		html="";
	   	   	 		$.each(data,function(i,customer){
	   	   	 			html += `		
								<div class="col-md-4 panel panel-default panel-body">
									<div class="row">
										<div class="col-md-6">
											<h6>  `+ "<img src='/images/" + customer.fname + ".jpeg'>" +` </h6>
										</div>
										<div class="col-md-6">
												<h3> Name: `+customer.fname+`</h3>
												<h4> Age: `+customer.agee+` </h4>
												<h4> Gender: `+customer.gender+` </h4>
												<h4> Occupation: `+customer.occupation+` </h4>
										</div>
									</div>																	
								</div>
`;								
	   	   	 		});	 
	   	 			$("#content").html(html);		
	   	 			   	 			
	  		});
		}); 
	   
});