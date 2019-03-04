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

    server: "CYG278\SQLEXPRESS",
    user:'sa',
    password:'password',
    database:"HRMS"
};

//Function to connect to database and execute query
var  executeQuery = function(res, query){
//    sql.connect(dbConfig, function (err) {
//        if (err) {
//            console.log("Error while connecting database :- " + err);
//            res.send(err).status(500);
//        }
//        else {
//            // create Request object
//            var request = new sql.Request();
//            // query to the database
//            request.query(query, function (err, rs) {
//                if (err) {
//                    console.log("Error while querying database :- " + err);
//                    sql.close();
//                    res.send(err).status(400);
//                }
//                else {
//                    sql.close();
//                    res.send(rs).status(200);
//                }
//            });
//        }
//    });

    new sql.ConnectionPool(dbConfig).connect().then(pool => {
      return pool.request().query(query)
      }).then(result => {
        let rows = result.recordset
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.status(200).json(rows);
        sql.close();
      }).catch(err => {
        res.status(500).send({ message: err })
        sql.close();
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

app.get("/projectTeamDetails", function(req , res){
                var query = " select * from ProjectTeamDetails";
                executeQuery (res, query);
});

app.get("/projectTeamDetails/:id", function(req , res){
                var query = "select * from ProjectTeamDetails where Projectid = "+ req.params.id;
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

//
app.get("/user/projectdetails/:id", function(req , res){
                var query = "EXEC spEmployeeindiffProjects "+ req.params.id+";";
                executeQuery (res, query);
});

//To Get Skills of  a Particular Project
app.get("/projects/skills/:id",function(req,res){
                var query="EXEC spSkillsinProject "+ req.params.id+";";
                executeQuery (res,query);
})
<<<<<<< HEAD

//To GET Overall Skills
=======
// give employeess for the project
app.get("/projects/recommend/:id",function(req,res){
                var query="EXEC Recommend "+ req.params.id+";";
                executeQuery (res,query);
})
// PUT API to change the product owner body must contain employeeid :1
app.put("/projects/changeproductowner/:id",function(req,res){
                var query="EXEC spChangeProjectOwner "+ req.params.id+" "+req.body.employeeid+";";
                executeQuery (res,query);
})
//To GET Overall Skills 
>>>>>>> 6376268e3341b95693d0265f86007fdcd4c74115
app.get("/skills", function(req,res){
        var query = "select * from Skills;";
        executeQuery (res,query);
})

//POST API IN API HIT FALSE --> 0 TRUE--> 1
 app.post("/projects", function(req , res){
                var query = "insert into Projects values('"+req.body.Name+"',"+req.body.Tenure+",'"+req.body.Client+"','"+req.body.Description+"',"+req.body.IsFinished+","+req.body.Progress+",'"+req.body.DateAssigned+"',"+req.body.isPipeline+"); Select * from Projects where ProjectID = (SELECT MAX(ProjectID) FROM projects);";
                executeQuery (res, query);
 });

//PUT API
 app.put("/projects/:id", function(req , res){
                var query = "UPDATE Projects SET Name= '" + req.body.Name  +  "' , Tenure=  " + req.body.Tenure +",Client='"+ req.body.Client + "',Description = '"+req.body.Description+"', IsFinished="+req.body.IsFinished+", Progress =" +req.body.Progress+ ", DateAssigned ='"+req.body.DateAssigned+"', isPipeline = "+req.body.isPipeline+ " WHERE ProjectID= " +req.params.id+";Select * from Projects where ProjectID="  + req.params.id;
                executeQuery (res, query);
});

// DELETE API
app.delete("/projects/:id", function(req , res){
                var query = "delete from Projects where Projectid = "+ req.params.id+"; select * from Projects;";
                executeQuery (res, query);
});
