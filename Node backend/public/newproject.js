
//        var slider = document.getElementById("myRange");
//        var output = document.getElementById("demo");
//        output.value = slider.value;
//
//        slider.oninput = function() {
//            output.value = this.value;
//        }
var projectres;


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
                dataType:"TEXT",
                contentType: "application/json; charset=utf-8",
                success: function(res){
                    console.log(res);
                    alert("Project Added");
                    projectres=res;
                    
                    location.reload();
                },
                error: function (xhr, status, error) {
                        console.log('Error: ' + JSON.stringify(error));
                        alert("No members to add .")
                    },
            });
}
}








$(document).ready(function() {
            $('.js-example-basic-multiple').select2();
            $("js-example-basic-multiple").select2({
                width: 'resolve' });
        })
