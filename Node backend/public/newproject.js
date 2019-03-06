
//        var slider = document.getElementById("myRange");
//        var output = document.getElementById("demo");
//        output.value = slider.value;
//
//        slider.oninput = function() {
//            output.value = this.value;
//        }
var projectres;
var ajaxResult=[];

function addproject(){
            if( document.getElementById("project").value !="" && document.getElementById("client").value !="" &&
//              document.getElementById("teamlead").value !=""&&
              document.getElementById("status").value !=""&&
              document.getElementById("tenure").value !=""&&
              document.getElementById("date").value !=""&&
              document.getElementById("description").value !="")
              {
                
    
            var project=JSON.stringify({  
        "name": document.getElementById("project").value,
                "tenure": document.getElementById("tenure").value,
        "client": document.getElementById("client").value,
        
          "description": document.getElementById("description").value,
                "dateassigned": document.getElementById("date").value,
                "ispipeline": document.getElementById("status").value,
                 });       
            $.ajax({
                url: 'http://localhost:8000/projects',
                data: project,
                type: 'POST',
                dataType:"JSON",
                contentType: "application/json; charset=utf-8",
                success: function(res){
                    console.log(res[0]);
//                    alert("Project Added");
                   ajaxResult.push(res[0]);  
//                $("#getCode").html(resp);
                $("#ownerskill").modal('show');
                    
}
//                    location.reload();
                ,
                error: function (xhr, status, error) {
                        console.log('Error: ' + JSON.stringify(error));
                        alert("No members to add .")
                    },
            });
                  console.log(ajaxResult[0].ProjectID);
                  
//ProjectID=projectres.ProjectID;
//                console.log(ProjectID);  
                  
}
    
    
    else {
        alert("Please select all details.")
    }
}






function addownerandskill(){
            if( document.getElementById("projectowner").value !="" && document.getElementById("skillid").value !="" &&
//              document.getElementById("teamlead").value !=""&&
            
                
    
            var project=JSON.stringify({  
        "name": document.getElementById("project").value,
                "tenure": document.getElementById("tenure").value,
        "client": document.getElementById("client").value,
        
          "description": document.getElementById("description").value,
                "dateassigned": document.getElementById("date").value,
                "ispipeline": document.getElementById("status").value,
                 });       
            $.ajax({
                url: 'http://localhost:8000/projects',
                data: project,
                type: 'POST',
                dataType:"JSON",
                contentType: "application/json; charset=utf-8",
                success: function(res){
                    console.log(res[0]);
//                    alert("Project Added");
                   ajaxResult.push(res[0]);  
//                $("#getCode").html(resp);
                $("#ownerskill").modal('show');
                    
}
//                    location.reload();
                ,
                error: function (xhr, status, error) {
                        console.log('Error: ' + JSON.stringify(error));
                        alert("No members to add .")
                    },
            });
                  console.log(ajaxResult[0].ProjectID);
                  
//ProjectID=projectres.ProjectID;
//                console.log(ProjectID);  
                  
}
    
    
    else {
        alert("Please select all details.")
    }
}


//console.log(res);
//project=res.








$(document).ready(function() {
            $('.js-example-basic-multiple').select2();
            $("js-example-basic-multiple").select2({
                width: 'resolve' });
    
    

    
     
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8000/employees',
                    success: function(Data) {
                        
                       
                        for(i=0; i<Data.length;i++){
                           
                            $('#projectowner').append(
                                '<option value="'+Data[i].EmployeeId+'">'+ Data[i].FirstName +" "+Data[i].LastName+
                                '</option>' 
                                
                    )
                        }
                    }
                
                
                
                
                
         
                
            });
    
    
    })
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
      
