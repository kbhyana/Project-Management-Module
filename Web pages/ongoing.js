//Get the list of employees
$(document).ready(function(){
 
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

 

    
})
    




/*function getProjectdetails(){
    $.ajax({
    url:'http://localhost:8000/
    type: 'GET',
    dataType:'JSON
    success: function(res){
        console.log(res);
        $.each(res, function (i, item) {
            var rows = "<tr>" 
        "<td>" + item.Name + "</td>" +
        "<td>" + item.Client + "</td>" +
        "<td>" + item.Progress + "</td>" +
        
        "<td><button id='"+ item.
        
    })
    }
    });
    }
    
    
