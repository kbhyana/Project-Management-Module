$(document).ready(function(){
                
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8000/user/projectdetails/1', 
                    success: function(Data) 
                    {
                        var info=Data.recordset;
                        console.log(info);
                        document.getElementById("username").innerHTML=info[0].FirstName+" "+info[0].LastName;  
                        for(i=0; i<info.length;i++){
                            $('#proj').append(
                                
                               '<div class="row">'+
                           
               ' <div class=" c col ">'+
                                '<div class=" pcard card bg-info text-white">'+
                        '<div class="card-header" id="projectname">'+info[i].Name+'</div>'+
                        '<div class="card-body" id="cardbody">'+
                   '<ul><li id = "Progress ">' + "Progress: "+info[i].Progress +"%"+
                            '</li><li id = "Client">'+ "Client: "+info[i].Client +
                            '</li><li id = "Project Owner">' + "Project Owner: "+info[i].ManagerFirstName+" "+ info[i].ManagerLastName+
                            '</li></ul>'+
                                '</div>'+
                                '</div>'+
                                '</div>'+
                                
                                    '</div>'
                               
                            );
                        }
                    }
                });  
})