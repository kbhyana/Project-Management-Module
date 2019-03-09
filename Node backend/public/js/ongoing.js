var url = new URL(window.location.href);
var projectid = url.searchParams.get("id");
projectid=Number(projectid);
console.log(projectid);

$(document).ready(function(){


    var info;
    var finished;
    var pipeline;
    console.log("hello"); 
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/projects/'+projectid,

        success: function(Data) {
            info=Data[0];
            console.log(info);
            document.getElementById("projectname").innerHTML=info.Name; 
            document.getElementById("Progress").value=info.Progress+"%"; 
            document.getElementById("client").value=info.Client;

            finished=Number(info.IsFinished);
            pipelined=Number(info.isPipeline);

            console.log(finished);
            document.getElementById("skillbt").style.visibility="visible";

            document.getElementById("demo").style.visibility="visible";

            document.getElementById("moveproject").setAttribute("onclick","finishedproject()");
            document.getElementById("moveproject").innerHTML="Move To Finished";

            document.getElementById("moveproject1").innerHTML="Move To PipeLine"
            document.getElementById("moveproject1").setAttribute("onclick","pipelinedproject()");


            if(finished==1){
                document.getElementById("skillbt").style.visibility="hidden";
                document.getElementById("demo").style.visibility="hidden";
                document.getElementById("moveproject").setAttribute("onclick","ongoingproject()");
                document.getElementById("moveproject").innerHTML="Make it Live";
                document.getElementById("moveproject1").style.visibility="hidden";

            }

            else if(pipelined==1){
                //                document.getElementById("skillbt").style.visibility="hidden";
                document.getElementById("demo").style.visibility="hidden";
                document.getElementById("moveproject").setAttribute("onclick","ongoingproject2()");
                document.getElementById("moveproject").innerHTML="Make it Live";
                document.getElementById("moveproject1").style.visibility="hidden";

            }

        }
    });


    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/Projects/emprole/'+projectid,
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
            $('#selectProjectOwner').append($('<option>',{
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
            $('#selectSkills').append($('<option>',{
                value:item.Id,
                text:item.Name
            }));
        })
    }
});        


var pskills=[];

//Get the skills of the project
$.ajax({
    url:'http://localhost:8000/projects/skills/'+projectid,
    type:'GET',
    dataType: 'JSON',
    success: function(res){
        console.log(res);
        for(k=0; k<res.length;k++){
            if(res[k].IsFinished==false){
                $('#skills').append(

                    '<tr><td id = "S">' + res[k].Name+
                    '</td><td id="B"><i id='+res[k].SkillId+' class="fa fa-trash fa-1x" onclick="ondelete(this.id);" aria-hidden="true"></i>' +
                    '</td></tr>');
            }

            else{
                $('#skills').append(
                    '<tr><td id = "S">' + res[k].Name+ '</td></tr>');   
            }
            pskills[k]=res[k].SkillId;
        }
        setTimeout(function(){console.log(pskills)},3000);
    }
}); 


console.log(pskills);

function updateskills(){
    var  technology = document.getElementById("selectSkills").value;
    setTimeout(function(){console.log(technology)},3000);
    console.log(technology);
    console.log(pskills);
    var check=0;
    for(var i = 0;i< pskills.length;i++){
        if (pskills[i]==technology){
            alert("Skill already exists")
            check=1;
        }

    }
    if(check==0){
        var dataToSend=JSON.stringify({
            "skillid": technology
        });

        $.ajax({
            url:'http://localhost:8000/projects/skills/'+projectid,
            type:'POST',
            data: dataToSend,
            dataType:"TEXT",
            contentType: "application/json; charset=utf-8",
            success: function(res){
                alert("New Skill Added");
                location.reload();
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + JSON.stringify(error));
            },
        });            

    }

}


function ondelete(id){

    var del_id = Number(id);
    console.log(del_id);

    var x= confirm("Are you sure want to delete?");

    if(x){
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8000/projects/skills/'+projectid+'/'+del_id,
            success:function(){ window.location =("Ongoing.html?id="+projectid);}


        });
        window.location = ("Ongoing.html?id="+projectid);
    }
}

function updatepo(){
    var po = document.getElementById("selectProjectOwner").value;
    var dataToSend=JSON.stringify({
        "employeeid": po
    });
    $.ajax({            url:'http://localhost:8000/projects/changeproductowner/'+projectid,
            type: 'PUT',
            data: dataToSend,
            dataType:"TEXT",
            contentType: "application/json; charset=utf-8",
            success:function(res){
                console.log(dataToSend);
                alert("Project Owner Changed");
                location.reload();
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + JSON.stringify(error));
            }
           });
}



function finishedproject(){

    var y= confirm("Are you sure want to finish this project?");

    if(y){

        $.ajax({
            url: 'http://localhost:8000/projects/ongoingtofinished/'+projectid,
            type: 'PUT',
            success:function(res){
                alert("Project moved to finished");

            },
            error: function (xhr, status, error) {
                console.log('Error: ' + JSON.stringify(error));

            },
        });
        location.reload();
    }
}
function pipelinedproject(){

    var y= confirm("Are you sure want to move project to Pipeline?");

    if(y){

        $.ajax({
            url: 'http://localhost:8000/projects/ongoingtopipeline/'+projectid,
            type: 'PUT',
            success:function(res){
                alert("Project moved to pipeline");

            },
            error: function (xhr, status, error) {
                console.log('Error: ' + JSON.stringify(error));

            },
        });
        location.reload();
    }
}

function ongoingproject(){
    var y= confirm("Are you sure want to make this project live?");

    if(y){

        $.ajax({
            url: 'http://localhost:8000/projects/finishedtoongoing/'+projectid,
            type: 'PUT',
            success:function(res){
                alert("Project moved to live");
                location.reload();
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + JSON.stringify(error));

            },
        });
        location.reload();
    }
}


function ongoingproject2(){
    var y= confirm("Are you sure want to make this project live?");

    if(y){

        $.ajax({
            url: 'http://localhost:8000/projects/pipelinetoongoing/'+projectid,
            type: 'PUT',
            success:function(res){
                alert("Project moved to live");
                location.reload();
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + JSON.stringify(error));

            },
        });
        location.reload();
    }
}
