
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
                        '<a href="hrmsproject.html" ""zstyle><div class="card-header" id="projectname" style="background-color: black">'+info[i].Name+'</div></a>'+
                        '<div class="card-body" id="cardbody" style="background-color: black"s>'+


$(document).ready(function(){
//        localStorage.setItem(empid,'2');
              var w= 3;  
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
                        '<a class ="link" href="hrmsproject.html?id='+ info[i].ProjectID +'&role='+info[i].Role+'"><div class="card-header" id="projectname" >'+info[i].Name+'</div></a>'+
                        '<div class="card-body" id="cardbody">'+
//>>>>>>> 6376268e3341b95693d0265f86007fdcd4c74115
                   '<ul><li id = "Progress ">' + "Progress: "+info[i].Progress +"%"+
                            '</li><li id = "Client">'+ "Client: "+info[i].Client +
                            '</li><li id = "Project Owner">' + "Project Owner: "+info[i].ManagerFirstName+" "+ info[i].ManagerLastName+
                            '</li></ul>'+
//<<<<<<< HEAD
                                '</div>'+
                                '</div>'+
                                '</div>'+
                                
                                    '</div>'
                               
                            );
                        }
                    }
                });  
})
document.getElementById("projectname").onclick = function () {
        location.href = "hrmsproject.html";
};
=======
                                
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

>>>>>>> 6376268e3341b95693d0265f86007fdcd4c74115
