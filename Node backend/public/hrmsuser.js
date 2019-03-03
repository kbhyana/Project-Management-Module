
$(document).ready(function(){
//        localStorage.setItem(empid,'2');
              var w= 2;  
            var r;
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8000/user/projectdetails/'+w, 
                    
                    success: function(Data) 
                    {
                        
                     
                        var info=Data;
                        console.log(info);
                            r=info[0].Role;
                       
                        document.getElementById("username").innerHTML=info[0].FirstName+" "+info[0].LastName;  
                        for(i=0; i<info.length;i++){
//                            localStorage.setItem("Role",info[i].Role);
//                            localStorage.setItem("ProjectId",info[i].ProjectID)
                            $('#proj').append(
                               
//                               '<div class="row">'+
//                           
//               ' <div class=" c col ">'+
                               '<div class="width">'+
                                '<div class=" pcard card  text-white">'+
                        '<a href="hrmsproject.html?id='+ info[i].ProjectID +'&role='+info[i].Role+'"><div class="card-header" id="projectname" >'+info[i].Name+'</div></a>'+
                        '<div class="card-body" id="cardbody">'+
                   '<ul><li id = "Progress ">' + "Progress: "+info[i].Progress +"%"+
                            '</li><li id = "Client">'+ "Client: "+info[i].Client +
                            '</li><li id = "Project Owner">' + "Project Owner: "+info[i].ManagerFirstName+" "+ info[i].ManagerLastName+
                            '</li></ul>'+
                                
                                '</div>'+
                                '</div>'
                               
                            );
                        }
                           
                        
                       

                    }

})
                    });

 function pid(x){ 
                            localStorage.setItem("Role",x);                            
                        }

