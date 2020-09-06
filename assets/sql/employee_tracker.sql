DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
DEPT VARCHAR(30) NOT NULL
);

CREATE TABLE role (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL(6,0) NOT NULL,
department_id INT
);

CREATE TABLE employee (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee; 

INSERT INTO department(DEPT) 
VALUES ("Sales");
INSERT INTO department(DEPT) 
VALUES ("Marketing");
INSERT INTO department(DEPT) 
VALUES ("Finance");
INSERT INTO department(DEPT) 
VALUES ("Legal");
INSERT INTO department(DEPT) 
VALUES ("Engineering");

INSERT INTO role(title,salary, department_id) 
VALUES ("Accountant", 115000, 3);
INSERT INTO role(title,salary, department_id) 
VALUES ("Sales Manager", 105000, 1);
INSERT INTO role(title,salary, department_id) 
VALUES ("Software Engineer", 95000, 5);
INSERT INTO role(title,salary, department_id) 
VALUES ("Finance Analyst", 80000, 3);
INSERT INTO role(title,salary, department_id) 
VALUES ("Marketing Manager", 105000, 2);
INSERT INTO role(title,salary, department_id) 
VALUES ("Sales Director", 145000, 1);
INSERT INTO role(title,salary, department_id) 
VALUES ("Digital Marketing Analyst", 65000, 2);
INSERT INTO role(title,salary, department_id) 
VALUES ("Lead Engineer", 175000, 5);
INSERT INTO role(title,salary, department_id) 
VALUES ("General Counsel", 200000, 4);

SELECT title, salary, department_id
FROM role
INNER JOIN department ON department_id = department.id;


INSERT INTO employee(first_name, last_name, role_id) 
VALUES ("Lewis","Lake", 1);
INSERT INTO employee(first_name, last_name, role_id) 
VALUES ("Jane","Stevenson", 3);
INSERT INTO employee(first_name, last_name, role_id) 
VALUES ("Andre","Carter", 2);
INSERT INTO employee(first_name, last_name, role_id) 
VALUES ("Debbie","Cakes", 9);
INSERT INTO employee(first_name, last_name, role_id) 
VALUES ("Jack","Wilson", 8);

SELECT first_name, last_name, role_id
FROM employee
INNER JOIN role ON role_id = role.id;


