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

var ProjectId=getUrl("id");
console.log(ProjectId);

var Role=getUrl("role");
console.log(Role);
var info;

//$(#"deleteData").cli

$(document).ready(function(){


    $('.js-example-basic-multiple').select2();
    $("js-example-basic-multiple").select2({
        width: 'resolve' });




    document.getElementById("forowner").style.visibility = "hidden";     
    if (Role=="Project Owner")
    {
        document.getElementById("forowner").style.visibility = "visible";
    }


    document.getElementById("update").style.visibility = "hidden";     
    if (Role=="Project Owner" || Role=="CM")
    {
        document.getElementById("update").style.visibility = "visible";
    }



    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/Projects/' + ProjectId,

        success: function(Data) {
            info=Data[0];
            console.log(info);
            document.getElementById("nameop").innerHTML=info.Name; 
            document.getElementById("Progress").value=info.Progress; 
            document.getElementById("Client").value=info.Client;
            document.getElementById("demo").value=info.Progress;

            document.getElementById("myRange").value=info.Progress;

            console.log(info.Progress+info.Client);


        }
    });


    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/Projects/emprole/'+ ProjectId,
        success: function(Data) {
            console.log(Data);
            for(i=0; i<Data.length;i++){
                $('#members').append(
                    '<tr><td id = "Name">' + Data[i].FirstName+" "+Data[i].LastName+
                    '</td><td id = "Designation">' + Data[i].Role +
                    '</td><td id = "Email">'+ Data[i].Email+
                    '</td><td id="B"><i id="'+Data[i].EmployeeId+" "+Data[i].Role+'" class="fa fa-trash fa-1x" onclick="ondelete(this.id);" aria-hidden="true"></i>'+
                    '</td></tr>'
                );
            }

        },

    });




    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000/projects/recommend/'+ ProjectId,
        success: function(Data) {

            console.log(Data);

            for(i=0; i<Data.length;i++){
                $('#getskills').append(
                    '<li>' + Data[i].Name+
                    '</li>' 

                )
                $('#getmember').append(
                    '<option value="'+Data[i].Employeeid+'">'+ Data[i].FirstName +" "+Data[i].LastName+
                    '</option>' 

                )
            }
        }







    });

}); 


function put(){
    var prog=Number(output.value);   
    console.log(prog);
    console.log(info);

    var date=info.DateAssigned;
    var senddate=date.slice(0,10);
    console.log(senddate);

    var dts=JSON.stringify({  
        "Name": info.Name,
        "Tenure": info.Tenure,
        "Client": info.Client,
        "Description": info.Description,
        "IsFinished":Number(info.IsFinished),
        "Progress": prog,
        "DateAssigned": senddate,
        "isPipeline": Number(info.isPipeline)

    });

    $.ajax({
        url: 'http://localhost:8000/projects/'+ ProjectId ,
        data: dts,
        type: 'PUT',
        dataType:"TEXT",
        contentType: "application/json; charset=utf-8",
        success: function(res){
            console.log(res);
            alert("Progress Updated");
            location.reload();
        },
        error: function (xhr, status, error) {
            console.log('Error: ' + JSON.stringify(error));
        },
    });
    console.log(dts);
} 



function addmember(){
    if( document.getElementById("getmember").value !="" && document.getElementById("getrole").value !="" )
    {
        console.log(document.getElementById("getmember").value);

        var member=JSON.stringify({  
            "projectid": ProjectId,
            "employeeid": document.getElementById("getmember").value,
            "roleid": document.getElementById("getrole").value,
        });       
        $.ajax({
            url: 'http://localhost:8000/projects/addmember',
            data: member,
            type: 'POST',
            dataType:"TEXT",
            contentType: "application/json; charset=utf-8",
            success: function(res){
                console.log(res);
                alert("Member Added");
                location.reload();
            },
            error: function (xhr, status, error) {
                console.log('Error: ' + JSON.stringify(error));
                alert("No members to add .")
            },
        });
    }
    else {
        alert("Please select all details.")
    }

}

function ondelete(id){
    if(Role=="Project Owner")
    {
        var arr = id.split(" ");
        console.log(arr)
        var employeeid = Number(arr[0]);
        if(arr[1] ==="Project")
        {
            alert("Cannot delete Project owner !!")
        }
        else{
            //    console.log(del_id);

            var x= confirm("Are you sure want to delete?");

            if(x){
                $.ajax({
                    type: 'DELETE',
                    url: 'http://localhost:8000/projects/deletemember/'+employeeid+'/'+ProjectId,
                    contentType:"application/json;charset=utf-8",
                    success: function(data){  
                        alert("skill deleted");
                        location.reload();
                    }
                });
                location.reload();vb

            }
        }
    }
    else{
        alert("Not authorized to delete members")
    }
}