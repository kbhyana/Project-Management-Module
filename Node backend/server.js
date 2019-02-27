//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express(); 

// Body Parser Middleware
app.use(bodyParser.json()); 

app.use(express.static(__dirname+'/public'))
//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 8000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

//Initiallising connection string
var dbConfig = {
    user:  "sa",
    password: "Password",
    server: "DESKTOP-PE6EUGU",
    database:"HRMS"
};

//Function to connect to database and execute query
var  executeQuery = function(res, query){             
     sql.connect(dbConfig, function (err) {
         if (err) {   
                     console.log("Error while connecting database :- " + err);
                     res.send(err).status(500);
                  }
                  else {
                         // create Request object
                         var request = new sql.Request();
                         // query to the database
                         request.query(query, function (err, rs) {
                           if (err) {
                                      console.log("Error while querying database :- " + err);
                                       res.send(err).status(400);
                               sql.close();
                                     }
                                     else {
                                       res.send(rs).status(200);
                                        sql.close();
                                            }
                               });
                       }
      });           
}

//GET API Employee
app.get("/employees", function(req , res){
                var query = "select * from Employee;";
                executeQuery (res, query);
});

app.get("/employees/:id", function(req , res){
                var query = "select * from employee where Employeeid = "+ req.params.id;
                executeQuery (res, query);
});

//GET API project

app.get("/projects", function(req , res){
                var query = "select * from Projects;";
                executeQuery (res, query);
});


//GET
app.get("/projects/pipeline", function(req , res){
                var query = " select * from [OnBoard Projects]";
                executeQuery (res, query);
});

app.get("/projects/finished", function(req , res){
                var query = " select * from [Finished Projects]";
                executeQuery (res, query);
});

app.get("/projects/ongoing", function(req , res){
                var query = " select * from [OnGoing Projects]";
                executeQuery (res, query);
});
// t0 get employee , role email of a particular project
app.get("/projects/emprole/:id", function(req , res){
                var query = "EXEC spEmployeesandRoles "+ req.params.id;
                executeQuery (res, query);
});

app.get("/projects/:id", function(req , res){
                var query = "select * from Projects where Projectid = "+ req.params.id;
                executeQuery (res, query);
});
//POST API
 app.post("/projects", function(req , res){
                var query = "insert into Projects values('"+req.body.Name+"',"+req.body.Tenure+",'"+req.body.Client+"','"+req.body.Description+"',"+req.body.IsFinished+","+req.body.Progress+",'"+req.body.DateAssigned+"',"+req.body.isPipeline+"); Select * from Projects where ProjectID = (SELECT MAX(ProjectID) FROM projects);"; 
                executeQuery (res, query);
});
//
//PUT API
// app.put("/projects/:id", function(req , res){
//                var query = "UPDATE [user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
//                executeQuery (res, query);
//});

// DELETE API
app.delete("/projects/:id", function(req , res){
                var query = "delete from Projects where Projectid = "+ req.params.id;
                executeQuery (res, query);
});