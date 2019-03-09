var strUser;
var link = [];
var projectsdata = [];
function DefaultFilter()  //Set default value to All projects
{
    $('.selectpicker').selectpicker('val', 'All Projects');
}
function filterfunction() //Get value of selection
{
    var values = document.getElementById("filtervalues");
    strUser = values.options[values.selectedIndex].value;
    console.log("Value chosen :" + " " + strUser);

    if(strUser=="All Projects")
        link = "/projects"
    else if(strUser=="Pipelined Projects")
        link = "/projects/pipeline"
    else if(strUser=="Completed Projects")
        link = "/projects/finished"
    else if(strUser=="Ongoing Projects")
        link = "/projects/ongoing"
    GETProjectsFiltered();
}    

var i;
function GETProjectsFiltered()   //AJAX call for projects
{
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8000' + link,
        success: function(Data) {
            $("#tablevalues tr td").remove();
            projectsdata = Data;
            console.log(projectsdata);
            for(i=0; i<projectsdata.length;i++){
                $('#tablevalues').append(                                
                    '<tr><td id = "Project">' + projectsdata[i].Name+
                    '</td><td id = "Client">' + projectsdata[i].Client+
                    '</td><td id = "Progress">' + projectsdata[i].Progress+
                    '</td><td><button id='+projectsdata[i].ProjectId+' onclick="projectdetails(this.id);">' + "View Details"+
                    '</button></td></tr>');
            }
        }
    });
}

function projectdetails(id){
    window.location="adminprojectdetails?id="+id;
}