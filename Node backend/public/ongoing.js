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

$(document).ready(function(){

    var ProjectID=getUrl("id");
    console.log(ProjectID);

    var info;
    var finished;
    console.log("hello"); 
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/Projects/1',

        success: function(Data) {
            info=Data[0];
            console.log(info);
            document.getElementById("projectname").innerHTML=info.Name; 
            document.getElementById("Progress").value=info.Progress+"%"; 
            document.getElementById("client").value=info.Client;

            finished=Number(info.IsFinished);
            console.log(finished);


            document.getElementById("skillbt").style.visibility="visible";
            document.getElementById("demo").style.visibility="visible";
            if(finished==1){
                document.getElementById("skillbt").style.visibility="hidden";
                document.getElementById("demo").style.visibility="hidden";

            }
        }
    });






    //    
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
                value:item.EmployeeId,
                text:item.FirstName+ " "+item.LastName
            }));
        })
    }
}); 


//get all skills
$.ajax({
    url:'http://localhost:8000/skills',
    type:'GET',
    dataType: 'JSON',
    success: function(res){
        console.log(res);
        $.each(res, function(i, item){
            $('#sel2').append($('<option>',{
                value:item.SkillId,
                text:item.Name
            }));
        })
    }
});        


var pskills=[];
var sid=[];

//Get the skills of the project
$.ajax({
    url:'http://localhost:8000/projects/skills/1',
    type:'GET',
    dataType: 'JSON',
    success: function(res){

        for(k=0; k<res.length;k++){

            $('#skills').append(

                '<tr><td id = "S">' + res[k].Name+
                '</td></tr>');

            pskills[k]=res[k].SkillId;

        }
        setTimeout(function(){console.log(pskills)},3000);
    }
}); 


console.log(pskills);

function updateskills(){
    var  technology = document.getElementById("sel2").value;
    console.log(technology);
    pskills=pskills.concat(technology);
    console.log(pskills);
}



//console.log(pskills);

//Update the Skills



