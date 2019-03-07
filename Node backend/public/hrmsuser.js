$(document).ready(function(){
              var w= 3;  
            var r;
    var info ;
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
                            $('#proj').append(

                               '<div class="width">'+
                                '<div id="' + info[i].Name + '" class=" pcard card  text-white">'+
                        '<a class ="link" href="hrmsproject.html?id='+ info[i].ProjectId +'&role='+info[i].Role+'"><div class="card-header" id="projectname" >'+info[i].Name+'</div></a>'+
                        '<div class="card-body" id="cardbody">'+
                   '<ul><li id = "Progress ">' + "Progress: "+info[i].Progress +"%"+
                            '</li><li id = "Client">'+ "Client: "+info[i].Client +
                            '</li><li id = "Project Owner">' + "Project Owner: "+info[i].ManagerFirstName+" "+ info[i].ManagerLastName+
                            '</li></ul>'+
                                
                                '</div>'+
                                '</div>'
                               
                            );
                        
                            if (info[i].Progress==100){
                                console.log(info[i].Progress);
                                console.log(this.id);

                                var col=document.getElementById(info[i].Name);
                                col.style.background="green";
                                ;
                            }
                                
                            
                        }
                        
                    }

})

                    });

 
