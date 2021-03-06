const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "lylalexi0514!",
  database: "employee_trackerDB"
});


connection.connect(function (err) {
  if (err) throw err;
  console.log("Welcome to the Employee Dashboard");
  mainMenu();
})

function mainMenu() {
  inquirer.prompt([
    {
      type: "list",
      name: "menu",
      message: "What would you like to do?",
      choices: [
        "Add Employee",
        "Add Role",
        "Add Department",
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Update An Employee Role",
        "Exit"
      ]
    },
  ]).then(function (response) {
    switch (response.menu) {
      case "Add Employee":
        addEmployee()
        break;
      case "Add Role":
        addRole()
        break;
      case "Add Department":
        addDept()
        break;
      case "View All Employees":
        viewEmployees()
        break;
      case "View All Roles":
        viewRoles()
        break;
      case "View All Departments":
        viewDeparments()
        break;
      case "Update An Employee Role":
        updateEmployee()
        break;
      case "Exit":
        connection.end()
        break;

    }

  })
}


function viewDeparments() {
  connection.query(`SELECT DEPT AS Department FROM department`, function (err, depts) {
    if (err) throw err;
    console.table(depts);
    mainMenu();
  });
}

function viewEmployees() {
  connection.query(`SELECT CONCAT(first_name," ", last_name) AS Name, title AS Title, salary AS Salary 
  FROM employee 
  LEFT JOIN role on role_id = role.id`, function (err, employee) {
    if (err) throw err;
    console.table(employee);
    mainMenu();
  });
}

function viewRoles() {
  connection.query(`
  SELECT title AS Title,salary AS Salary, DEPT AS Department
  FROM role
  LEFT JOIN department ON department_id = department.id`, function (err, role) {
    if (err) throw err;
    console.table(role);
    mainMenu();
  });
}

function addEmployee() {
  connection.query(`SELECT * FROM role`, function (err, res) {
    if (err) throw err;
    let titleArr = [];
    for (let i = 0; i < res.length; i++) {
      titleArr.push(res[i].title)
    }
    inquirer.prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "first_name"
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "last_name"
      },
      {
        type: "list",
        message: "What is the employee's role?",
        name: "empRole",
        choices: titleArr
      }
    ]).then(function (answers) {
      let roleID;
      connection.query(`SELECT * FROM role`, function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
          if (res[i].title === answers.empRole) {
            roleID = res[i].id
          }

        }
        connection.query(
          `INSERT INTO employee SET ?`,
          {
            first_name: answers.first_name,
            last_name: answers.last_name,
            role_id: roleID
          },
          function (err, res) {
            if (err) throw err;
            mainMenu();
          }
        )
      })
    });
  });
}

function addRole() {
  connection.query(`SELECT * FROM department`, function (err, res) {
    if (err) throw err;
    let deptArr = [];
    for (let i = 0; i < res.length; i++) {
      deptArr.push(res[i].name)
    }
    inquirer.prompt([
      {
        type: "input",
        message: "What is the title of the role?",
        name: "title"
      },
      {
        type: "input",
        message: "What is role's salary?",
        name: "salary"
      },
      {
        type: "list",
        message: "What department does this role belong to?",
        name: "department",
        choices: deptArr
      }
    ]).then(function (answers) {
      let deptID;
      connection.query(`SELECT * FROM role`, function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
          if (res[i].title === answers.department) {
            deptID = res[i].id
          }

        }
        connection.query(
          `INSERT INTO role SET ?`,
          {
            title: answers.title,
            salary: answers.salary,
            department_id: deptID
          },
          function (err, res) {
            if (err) throw err;
            mainMenu();
          }
        )
      })
    });
  });
}

function addDept() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the department?",
      name: "name"
    }
  ]).then(function (answer) {
    connection.query(
      `INSERT INTO department SET ?`,
      {
        DEPT: answer.name,

      },
      function (err, res) {
        if (err) throw err;
        mainMenu();
      }
    );
  });
}

function updateEmployee() {
  connection.query(`SELECT * FROM employee`, function (err, employees) {
    if (err) throw err;
    //console.table(employees);
    let updateArr = [];
   
    for (let i = 0; i < employees.length; i++) {
      const currEmp = employees[i];
     updateArr.push({
      name: currEmp.first_name + ' ' + currEmp.last_name,
      id: currEmp.id
    })
    ;
    //  console.log('UPDATE ARRAY --> ', updateArr)
     }
    inquirer.prompt([
      {
        type: "list",
        message: "Which employee would you like to update?",
        name: "employee",
        choices: function(){
          let finalArray = [];
          for(let i = 0; i < updateArr.length; i++){
            const currentVal = updateArr[i]
            finalArray.push({
              name:currentVal.name, 
              value: currentVal.id})
          }
          return finalArray
        }
      },
      {
        type: "list",
        message: "Who is their Manager?",
        name: "manager",
        choices: function(){
          let finalArray = [];
          for(let i = 0; i < updateArr.length; i++){
            const currentVal = updateArr[i]
            finalArray.push({
              name:currentVal.name, 
              value: currentVal.id})
          }
          return finalArray
        }
      }
    ]).then(function (answers) {
      // console.log('ANSWERS--->', answers)
      const empID = answers.employee;
      const mgrID = answers.manager;
      connection.query(`SELECT * FROM employee`, function (err, emp) {
        if (err) throw err;
        for (let i = 0; i < emp.length; i++) {
          if (emp[i].id == answers.employee) {
           
            connection.query(
              "UPDATE employee SET manager_id = (?) WHERE id = (?)",
                [mgrID,empID],
    
              function (err, res) {
                if (err) throw err;
              });
          }

        }
        mainMenu();
      });
    });
  });
}