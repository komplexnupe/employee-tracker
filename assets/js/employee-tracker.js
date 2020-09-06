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
  connection.query("SELECT * FROM department", function (err, depts) {
    if (err) throw err;
    console.table(depts);
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, employee) {
    if (err) throw err;
    console.table(employee);
  });
}

function viewRoles() {
  connection.query("SELECT title FROM role", function (err, role) {
    if (err) throw err;
    console.table(role);
    mainMenu();
  });
}

function addEmployee() {
  connection.query("SELECT * FROM role", function (err, res) {
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
      connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
          if (res[i].title === answers.empRole) {
            roleID = res[i].id
          }

        }
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answers.first_name,
            last_name: answers.last_name,
            role_id: roleID
          },
          function (err, res) {
            if (err) throw err;
            // Call updateEmployee AFTER the INSERT completes
            // updateEmployee();
            mainMenu();
          }
        )
      })
    });
  });
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
      choices: deptArr
    }
  ]).then(function (answers) {
    connection.query(
      "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
      {
        title: answers.title,
        salary: answers.salary,
        department_id: answers.department
      },
      function (err, res) {
        if (err) throw err;
        // Call updateEmployee AFTER the INSERT completes
        // updateEmployee();
      }
    );
  });
}

function addDept() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "name"
      }
    ]).then(function (answer) {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        {
          name: answer.name,

        },
        function (err, res) {
          if (err) throw err;
          // Call updateEmployee AFTER the INSERT completes
          // updateEmployee();
        }
      );
    });
  });
}

// function updateEmployee() { }