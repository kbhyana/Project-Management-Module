var getUrl = function getUrl(param){
        var pageUrl = window.location.search.substring(1);
        var urlVariables = pageUrl.split("&");
        var parameterName;
        var i;
        for(i=0; i<urlVariables.length; i++){
            parameterName = urlVariables[i].split("=");
            if(parameterName[0] == param){
                return  parameterName[1] == undefined ? true : decodeURIComponent(parameterName[1]);
            }
        }
    }

         var ProjectID=getUrl("id");
        console.log(ProjectID);
                
                 var Role=getUrl("role");
        console.log(Role);
      var info;


$(document).ready(function(){
 console.log("hello"); 
$.ajax({
                    type: 'GET',
                    url: 'http://localhost:8000/Projects/1',

                    success: function(Data) {
                         info=Data[0];
                        console.log(info);
                        document.getElementById("projectname").innerHTML=info.Name; 
                        document.getElementById("Progress").value=info.Progress; 
                        document.getElementById("client").value=info.Client;
                        
                        
                        console.log(info.Progress+info.Client);


                    }
                });
        

              
    
      $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8000/Projects/emprole/1',
                    success: function(Data) {
                        console.log(Data);
                        for(i=0; i<Data.length;i++){
                            if(Data[i].Role=="Developers"){
                            $('#members').append(
                                
                                '<tr><td id = "Name">' + Data[i].FirstName+" "+Data[i].LastName+
                                '</td><td id = "Email">' + Data[i].Email+
                                '</td></tr>');
                        
                            }
                        }
                        
                        for(j=0;j<Data.length;j++){
                            if(Data[j].Role=="Project Owner"){
                             document.getElementById("powner").value=Data[j].FirstName+" "+Data[j].LastName;  
                           console.log(Data[j].FirstName+" "+Data[j].LastName); 
                            }
                            if(Data[j].Role=="CM"){
                            document.getElementById("cm").value=Data[j].FirstName+" "+Data[j].LastName;  
                           console.log(Data[j].FirstName+" "+Data[j].LastName);
                            }
                        
                        
                        }

                    }

                });
                
                
                
                
         
                
            });

    

    

 $.ajax({
        url:'http://localhost:8000/employees',
        type:'GET',
        dataType: 'JSON',
        success: function(res){
            console.log(res);
        $.each(res, function(i, item){
         $('#sel').append($('<option>',{
            value:item.FirstName+ " "+item.LastName,
            text:item.FirstName+ " "+item.LastName
    }));
        
    })
            
    }
        
    }); 

$.ajax({
        url:'http://localhost:8000/skills',
        type:'GET',
        dataType: 'JSON',
        success: function(response){
            console.log(response);
       $.each(response, function(i, item){
         $('#sel2').select2($('<option>',{
            value:item.Name,
            text:item.Name
            
    })); 
      
    })

    }
    
    }); 

$.ajax({
        url:'http://localhost:8000/projects/skills/1',
        type:'GET',
        dataType: 'JSON',
        success: function(res){
            console.log(res);
        for(k=0; k<res.length;k++){
                            
                            $('#skills').append(
                                
                                '<tr><td id = "S">' + res[k].Name+
                                '</td></tr>');
                        
                            }
            
    }
        
    }); 

