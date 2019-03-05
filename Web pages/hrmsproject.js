var ProjectID=1;
            console.log(ProjectID);
            //$(#"deleteData").cli
            function loadProject(){

            }
            $(document).ready(function(){

                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8000/Projects/' + ProjectID,

                    success: function(Data) {
                        var info=Data[0];
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
                    url: 'http://localhost:8000/Projects/emprole/'+ ProjectID,
                    success: function(Data) {
                        console.log(Data);
                        for(i=0; i<Data.length;i++){
                            $('#members').append(
                                '<tr><td id = "Name">' + Data[i].FirstName+" "+Data[i].LastName+
                                '</td><td id = "Designation">' + Data[i].Role +
                                '</td><td id = "Email">' + Data[i].Email+
                                '</td></tr>'
                            );
                        }

                    },

                });
            });


