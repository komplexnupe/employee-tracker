const mysql = require("mysql");
const inquirer = require("inquirer");
let deptArr = [];
let roleArr = [];
let employeeArr = [];
let managerArr = [];

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
        "Update An Employee Role"
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

    }

  })
}

function viewDeparments() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    deptArr = [];
    for (i = 0; i < res.length; i++) {
      deptArr.push(res[i].name);
    }
    console.table(deptArr);
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    employeeArr = [];
    for (i = 0; i < res.length; i++) {
      employeeArr.push(res[i].first_name + res[i].last_name);
    }
    console.table(employeeArr);
  });
}

function viewRoles() {
  connection.query("SELECT * FROM role", function (err, role) {
    if (err) throw err;
    roleArr = [];
    for (i = 0; i < role.length; i++) {
      roleArr.push(role[i].title);
    }
    console.table(roleArr);
  });
}

function addEmployee() {
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
      choices: roleArr[1]
    }
  ]).then(function () {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)",
        [
          "first_name",
          "last_name",
          "role_id"
        ],
        function (err, res) {
          if (err) throw err;
          // Call updateEmployee AFTER the INSERT completes
          // updateEmployee();
        }
      );
    })
}

function addRole() {
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
      choices: deptArr[1]
    }
  ]).then(function () {
      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
        [
          "title",
          "salary",
          "department_id"
        ],
        function (err, res) {
          if (err) throw err;
          // Call updateEmployee AFTER the INSERT completes
          // updateEmployee();
        }
      );
    })
}

function addDept() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the department?",
      name: "name"
    }
  ]).then(function () {
      connection.query(
        "INSERT INTO employee (name) VALUES (?)",
        [
          "name",

        ],
        function (err, res) {
          if (err) throw err;
          // Call updateEmployee AFTER the INSERT completes
          // updateEmployee();
        }
      );
    })
}

// function updateEmployee() { }