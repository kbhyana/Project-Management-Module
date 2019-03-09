create database HRMS

select * from Employee
select * from Skills
select * from TechStack
select * from ProjectRole 
select * from Projects
select * from ProjectTeamDetails
select * from SkillsInProject

create table Employee(
	EmployeeId int identity(1,1) primary key,
	FirstName varchar(50),
	LastName varchar(50),
	Designation varchar(50),
	Email varchar(50),
	[Location] varchar(50),
	DateOfJoining date,
	DateOfBirth date,
	PastExperience int,
	Department varchar(50),
	[Status] varchar(10),
	ProfilePicUrl varchar(255)
)
create table Skills(
	Id int identity(1,1) primary key,
	Name varchar(100),
	Category varchar(20),
)
create table TechStack(
	SerialNo int identity(1,1) primary key,
	SkillId int  references Skills(Id),
	Employeeid int references Employee(EmployeeId)  ,
)


insert into Employee (FirstName,LastName, Designation, Email, Location, DateOfJoining, DateOfBirth, PastExperience, Department, [status], ProfilePicUrl)
		values('Deepak', 'Pahuja', 'Intern', 'deepak.pahuja@cygrp.com', 'Noida' , '2019-01-07', '1996-12-19', 1, 'Technical', 'Active', 'url') 
insert into Employee (FirstName,LastName, Designation, Email, Location, DateOfJoining, DateOfBirth, PastExperience, Department, [status], ProfilePicUrl)
		values('Vidit', 'Mathur', 'Intern', 'vidit.mathur@cygrp.com', 'Noida' , '2019-01-07', '1997-10-11', 1, 'Technical', 'Active', 'url')
insert into Employee (FirstName,LastName, Designation, Email, Location, DateOfJoining, DateOfBirth, PastExperience, Department, [status], ProfilePicUrl)
		values('Gaurav', 'Singh', 'Intern', 'gaurav.singh@cygrp.com', 'Noida' , '2019-01-07', '1996-04-25', 1, 'Technical', 'Active', 'url') 
insert into Employee (FirstName,LastName, Designation, Email, Location, DateOfJoining, DateOfBirth, PastExperience, Department, [status], ProfilePicUrl)
		values('Srishty', 'rawat', 'Intern', 'srishty.rawat@cygrp.com', 'Noida' , '2019-01-07', '1996-10-30', 1, 'Technical', 'Active', 'url')  
insert into Employee (FirstName,LastName, Designation, Email, Location, DateOfJoining, DateOfBirth, PastExperience, Department, [status], ProfilePicUrl)
		values('Om', 'Prakash', 'Intern', 'ompraksah@cygrp.com', 'Noida' , '2019-01-07', '1995-02-05', 1, 'Technical', 'Active', 'url') 

insert  into Skills (Name, Category) values ('HTML', 'FrontEnd')
insert  into Skills (Name, Category) values ('CSS', 'FrontEnd')
insert  into Skills (Name, Category) values ('javascript', 'FrontEnd')
insert  into Skills (Name, Category) values ('Nodejs', 'BackEnd')
insert  into Skills (Name, Category) values ('PHP', 'BackEnd')

insert  into TechStack (SkillId, Employeeid) values ( 1,1)
insert  into TechStack (SkillId, Employeeid) values ( 2,1)
insert  into TechStack (SkillId, Employeeid) values ( 3,1)
insert  into TechStack (SkillId, Employeeid) values ( 4,1)
insert  into TechStack (SkillId, Employeeid) values ( 4,3)
insert  into TechStack (SkillId, Employeeid) values ( 1,4)
insert  into TechStack (SkillId, Employeeid) values ( 2,4)
insert  into TechStack (SkillId, Employeeid) values ( 3,2)
insert  into TechStack (SkillId, Employeeid) values ( 4,2)
insert  into TechStack (SkillId, Employeeid) values ( 3,5)
insert  into TechStack (SkillId, Employeeid) values ( 2,5)


create table ProjectRole(RoleId int primary key identity(1,1), Role Varchar(50));
create table Projects(
ProjectId int primary key identity(1,1),
 Name Varchar(100), 
 Tenure int,
 Client Varchar(100), 
 Description Varchar(max),
 IsFinished bit,
 Progress int,
 DateAssigned date,
 isPipeline bit,
 ); 


insert into ProjectRole values ('Project Owner');
insert into ProjectRole values ('CM');
insert into ProjectRole values ('Developers');

insert into Projects 
values('Paw Tree',
		2,
		'Roger Morgan',
		'You don’t like to eat the same food every day, and neither does your pet.PawTree a pet nutrition company,
		 has debuted a first-of-its-kind product in the marketplace with its pawPairings Superfood Seasoning. Designed
		 to add flavor variety and boost nutrition at meal time, pawTree created a line of seven superfood seasoning 
		 medleys for dogs and cats.',
		 0,
		 65,
		'2018-07-26',
		0);
insert into Projects 
values('Stage Stores',
		5,
		'Michael L Glazer',
		'Stage Stores is a department store company specializing in retailing brand name apparel, accessories,
		 cosmetics, footwear, and housewares throughout the United States.',
		0,
		55,
		'2017-08-02',
		0);
insert into Projects 
values('Just Energy',
		10,
		'Jim Brown',
		'Just Energy Group Inc. is a Canadian-based natural gas and electricity retailer operating in Canadian
		and American markets across North America, and in Germany, Ireland, Japan, and the United Kingdom.',
		1,
		100,
		'2009-08-02',
		0);
		insert into Projects 
values('Google',
		5,
		'Sundar Pichai',
		'Google LLC is an American multinational technology company that specializes in Internet-related services and products, which
		 include online advertising technologies, search engine, cloud computing, software, and hardware.
		 It is considered one of the Big Four technology companies, alongside Amazon, Apple and Facebook.',
		0,
		0,
		'2020-02-20',
		1);
		


		

create table ProjectTeamDetails(
	SNo int identity(1,1) primary key,
	ProjectId int  references Projects(ProjectId),
	EmployeeId int references Employee(EmployeeId),
	RoleId int  references ProjectRole(RoleId),
	isPrimary int
)

insert into ProjectTeamDetails 
values(
	1,
	2,
	3,
	1
)
insert into ProjectTeamDetails 
values(
	1,
	1,
	3,
	0
)
insert into ProjectTeamDetails 
values(
	1,
	3,
	2,
	0
)
insert into ProjectTeamDetails 
values(
	1,
	4,
	3,
	1
)
insert into ProjectTeamDetails 
values(
	1,
	5,
	1,
	1
)

insert into ProjectTeamDetails 
values(
	2,
	5,
	3,
	0
)
insert into ProjectTeamDetails 
values(
	2,
	3,
	1,
	1
)
insert into ProjectTeamDetails 
values(
	2,
	1,
	3,
	1
)
select * from ProjectTeamDetails

CREATE VIEW [OnGoing Projects] AS
SELECT *
FROM Projects
WHERE isFinished = 0 AND isPipeline=0 ;

select * from [OnGoing Projects]

CREATE VIEW [Finished Projects] AS
SELECT *
FROM Projects
WHERE isFinished = 1;

CREATE VIEW [OnBoard Projects] AS
SELECT *
FROM Projects
WHERE isPipeline = 1;

select * from [Finished Projects]
select * from [OnBoard Projects]

CREATE PROCEDURE spEmployeesandRoles  @Projectid int
AS 
Begin
SELECT ProjectTeamDetails.ProjectId,Employee.EmployeeId, Employee.FirstName, Employee.LastName,Employee.Email,
		 ProjectRole.Role,Projects.Name
FROM (((ProjectTeamDetails
INNER JOIN Employee ON ProjectTeamDetails.EmployeeId = Employee.EmployeeId)
INNER JOIN ProjectRole ON ProjectTeamDetails.RoleId = ProjectRole.RoleId)
Inner JOIN Projects ON ProjectTeamDetails.ProjectId=Projects.ProjectId)
WHERE ProjectTeamDetails.ProjectId = @Projectid
Order by ProjectTeamDetails.RoleId
End

EXEC spEmployeesandRoles 1;
EXEC spEmployeesandRoles 2;


CREATE PROCEDURE spProjectDateandTenure  @Projectid int
AS 
Begin
SELECT Projects.Name,Projects.DateAssigned,Projects.Tenure
FROM Projects
WHERE ProjectId =@ProjectId;
End

EXEC spProjectDateandTenure 1;
EXEC spProjectDateandTenure 2;

CREATE PROCEDURE spProjectOwnerList  @Roleid int
AS 
Begin
SELECT PTD.ProjectId, E.FirstName, E.LastName,ProjectRole.Role 
FROM (((ProjectTeamDetails PTD
INNER JOIN Employee E ON PTD.EmployeeId = E.EmployeeId)
INNER JOIN ProjectRole ON PTD.RoleId = ProjectRole.RoleId)
Inner JOIN Projects P ON PTD.ProjectId=P.ProjectId)
WHERE PTD.RoleId = @Roleid 
End

EXEC spProjectOwnerList 1;

Create Procedure spChangeProjectOwner @ProjectId int, @EmployeeId int
as
begin
UPDATE PTD
SET 
PTD.EmployeeId=Employee.EmployeeId
FROM
ProjectTeamDetails PTD Cross Join Employee
where PTd.ProjectId=@ProjectId and PTD.RoleID=1 and Employee.EmployeeId=@EmployeeId
END

EXEC spChangeProjectOwner ;

 
 create table Manager(ManagerId int Primary Key identity(1,1),
						ProjectId int,
						ManagerFirstName Varchar(50),
						ManagerLastName Varchar(50),
						Role Varchar(50))

insert into Manager EXEC spProjectOwnerList 1;
select * from Manager


CREATE PROCEDURE spEmployeeindiffProjects  @Employeeid int
AS 
Begin
SELECT ProjectTeamDetails.ProjectId, E.FirstName, E.LastName,ProjectTeamDetails.isPrimary,
		 P.Name,P.Client, P.Progress,ProjectRole.Role,M.ManagerFirstName,M.ManagerLastName
FROM ((((ProjectTeamDetails
INNER JOIN Employee E ON ProjectTeamDetails.EmployeeId = E.EmployeeId)
INNER JOIN ProjectRole ON ProjectTeamDetails.RoleId = ProjectRole.RoleId)
Inner JOIN Projects P ON ProjectTeamDetails.ProjectId=P.ProjectId)
Inner JOIN Manager M ON ProjectTeamDetails.ProjectId = M.ProjectId)
WHERE ProjectTeamDetails.EmployeeId = @Employeeid
End
select * from ProjectTeamDetails
EXEC spEmployeeindiffProjects 1;
EXEC spEmployeeindiffProjects 2;
EXEC spEmployeeindiffProjects 3;
EXEC spEmployeeindiffProjects 4;
EXEC spEmployeeindiffProjects 5;

Create table SkillsinProject (SkillId int  references Skills(Id),
							ProjectId int references Projects(ProjectId))

insert into SkillsinProject values (1,1)
insert into SkillsinProject values (2,1)
insert into SkillsinProject values (3,1)
insert into SkillsinProject values (4,1)
insert into SkillsinProject values (5,1)
insert into SkillsinProject values (1,2)
insert into SkillsinProject values (3,2)
insert into SkillsinProject values (5,2)

select * from SkillsinProject

Create Procedure spSkillsinProject @ProjectId int
as
Begin
Select * 
From ((SkillsinProject Sp
Inner Join Skills as Vatsala On Sp.SkillId=Skills.Id)
Inner Join Projects P On Sp.ProjectId=P.ProjectId)
Where P.ProjectId= @ProjectId
End
create Procedure spSkillsinProject @ProjectId int
as
Begin
Select SkillId,SKills.Name, Category, Tenure, Client, Description  ,Sp.ProjectId , IsFinished
From ((SkillsinProject Sp
Inner Join Skills On Sp.SkillId=Skills.Id)
Inner Join Projects P On Sp.ProjectId=P.ProjectID)
Where P.ProjectId= @ProjectId
End

EXEC spSkillsinProject 1;
EXEC spSkillsinProject 2;
Create Procedure Recommend @ProjectId int
as
Begin
SELECT SP.ProjectId,SP.SkillId,Skills.Name, Skills.Category,
		Employee.FirstName,Employee.LastName,TechStack.Employeeid
FROM((((SkillsinProject Sp
Inner Join Skills On Sp.SkillId=Skills.Id)
Inner Join Projects P On Sp.ProjectId=P.ProjectId)
INNER JOIN TechStack ON TechStack.SkillId=Sp.SkillId)
Inner Join Employee On Employee.EmployeeId= TechStack.EmployeeId)
where Sp.SkillId=TechStack.SkillId AND Sp.ProjectId=@ProjectId
	AND Employee.EmployeeId NOT IN
	(Select ProjectTeamDetails.EmployeeId 
	From SkillsinProject
	inner Join ProjectTeamDetails on Sp.ProjectId=ProjectTeamDetails.ProjectId)
End
EXEC Recommend 2;
EXEC Recommend 1;


CREATE Procedure spAddMember @ProjectId int,@EmployeeId int,@RoleId int
as
Begin
IF EXISTS (SELECT * FROM ProjectTeamDetails PTD
			WHERE PTD.isPrimary =1 and PTD.EmployeeID=@EmployeeId) 
INSERT into ProjectTeamDetails
values(@ProjectId,@EmployeeId,@RoleId,0);
else
INSERT into ProjectTeamDetails
values(@ProjectId,@EmployeeId,@RoleId,1);
END

EXEC spAddMember 2,2,2;
select*from ProjectTeamDetails

CREATE Procedure spEditMember @ProjectId int,@EmployeeId int,@RoleId int
as
Begin
update ProjectTeamDetails
set RoleId=@RoleId
WHERE ProjectId=@ProjectId And EmployeeId=@EmployeeId 
END

EXEC spEditMember 2,2,2;



create Procedure AddNewProject 
				(@Name Varchar(100),
				@Tenure int,
				@Client Varchar(100),
				@Description  Varchar(max),
				@DateAssigned date,
				@isPipeline bit)
As
Begin
insert into Projects
values(@Name,@Tenure,@Client,@Description,0,0,@DateAssigned,@isPipeline)
END

CREATE Procedure PipelinetoOngoing @ProjectId int
as
Begin
update Projects
set isPipeline=0
WHERE ProjectId=@ProjectId END
EXEC PipelinetoOngoing ;
select*from Projects
CREATE Procedure OngoingtoPipeline @ProjectId int
as
Begin
update Projects
set isPipeline=1
WHERE ProjectId=@ProjectId END
EXEC OngoingtoPipeline ;
select*from Projects


CREATE Procedure OngoingtoFinished @ProjectId int
as
Begin
update Projects
set IsFinished=1
WHERE ProjectId=@ProjectId and isPipeline=0
 END
EXEC OngoingtoFinished ;
select*from Projects

Create Procedure FinishedtoOngoing @ProjectId int
as
Begin
update Projects
set IsFinished=0
WHERE ProjectId=@ProjectId and isPipeline=0
END
EXEC FinishedtoOngoing;

select*from Projects
select * from ProjectTeamDetails

create Procedure spAddProjectOwner @ProjectId int,@EmployeeId int
as
Begin 
IF EXISTS (SELECT * FROM ProjectTeamDetails PTD
			WHERE PTD.isPrimary =1 and PTD.EmployeeId=@EmployeeId) 
INSERT into ProjectTeamDetails
values(@ProjectId,@EmployeeId,1,0);
else
INSERT into ProjectTeamDetails
values(@ProjectId,@EmployeeId,1,1);
truncate table Manager;
insert into Manager EXEC spProjectOwnerList 1;
END
EXEC spAddProjectOwner 4,1;
select *  from Manager

