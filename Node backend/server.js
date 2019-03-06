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
    password: "password",
    server: "CYG385",
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

app.get("/projectsandrole", function(req , res){
                var query = "";
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
app.get("/skills", function(req,res){
        var query = "select * from Skills;";
        executeQuery (res,query);
})

//POST API IN API HIT FALSE --> 0 TRUE--> 1
// exec AddNewProject 'adad' , 4,'kjdska','fdsfd','2019-03-05',0 ;
//(@Name Varchar(100),
//                @Tenure int,
//                @Client Varchar(100),
//                @Description  Varchar(max),
//                @DateAssigned date,
//                @isPipeline bit)
 app.post("/projects", function(req , res){
                var query = "exec AddNewProject '"+req.body.name+"',"+req.body.tenure+",'"+req.body.client+"','"+req.body.description+"','"+req.body.dateassigned+"',"+req.body.ispipeline+"; Select * from Projects where ProjectID = (SELECT MAX(ProjectID) FROM projects);"; 
                executeQuery (res, query);
 });
//insert into SkillsinProject values (1,1) skillid :y projectid in url
app.post("/projects/skills/:projectid", function(req , res){
                var query = "insert into SkillsinProject Values("+req.body.skillid +","+req.params.projectid+");"; 
                executeQuery (res, query);
 });
//EXEC spAddMember 2,2,2; projectid:x , employeeid:y , roleid:z
app.post("/projects/addmember", function(req , res){
                var query = "EXEC spAddMember "+req.body.projectid+","+req.body.employeeid+","+req.body.roleid+";"; 
                executeQuery (res, query);
 });
//PUT API
 app.put("/projects/:id", function(req , res){
                var query = "UPDATE Projects SET Name= '" + req.body.Name  +  "' , Tenure=  " + req.body.Tenure +",Client='"+ req.body.Client + "',Description = '"+req.body.Description+"', IsFinished="+req.body.IsFinished+", Progress =" +req.body.Progress+ ", DateAssigned ='"+req.body.DateAssigned+"', isPipeline = "+req.body.isPipeline+ " WHERE ProjectID= " +req.params.id+";Select * from Projects where ProjectID="  + req.params.id;
                executeQuery (res, query);
});
// change project from ongoingtofinished
app.put("/projects/ongoingtofinished/:projectid", function(req , res){
     var query = "EXEC OngoingtoFinished" + req.params.projectid+";" ;
     executeQuery (res, query);
});

// change project from PipelinetoOngoing
app.put("/projects/pipelinetoongoing/:projectid", function(req , res){
     var query = "EXEC PipelinetoOngoing" + req.params.projectid+";" ;
     executeQuery (res, query);
});

// DELETE API
app.delete("/projects/:id", function(req , res){
                var query = "delete from Projects where Projectid = "+ req.params.id+"; select * from Projects;";
                executeQuery (res, query);
});
// delete member in project
app.delete("/projects/deletemember/:employeeid/:projectid", function(req , res){
                var query = "delete from ProjectTeamDetails WHERE EmployeeID="+ req.params.employeeid+"and ProjectID="+ req.params.projectid+";"
                executeQuery (res, query);
});

app.delete("/projects/skills/:projectid/:skillid", function(req , res){
                var query = "delete from SkillsinProject where ProjectId = "+ req.params.projectid+"and SkillId ="+ req.params.skillid+";"
                executeQuery (res, query);
});
app.get("/user/projectdetails/:id", function(req , res){
                var query = "EXEC spEmployeeindiffProjects "+ req.params.id;
                executeQuery (res, query);
});