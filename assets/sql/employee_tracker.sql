DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL(6,0) NOT NULL,
department_id INT,
FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee (
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
FOREIGN KEY(role_id) REFERENCES role(id),
FOREIGN KEY(manager_id) REFERENCES employee(id)
);

INSERT INTO role(first_name, last_name, role_id, manager_id) 
VALUES ("Lewis","Lake");
INSERT INTO role(first_name, last_name, role_id, manager_id) 
VALUES ("Lejeana","Stevenson");
INSERT INTO role(first_name, last_name, role_id, manager_id) 
VALUES ("Andre","Carter");
INSERT INTO role(first_name, last_name, role_id, manager_id) 
VALUES ("Anna","Staley");
INSERT INTO role(first_name, last_name, role_id, manager_id) 
VALUES ("Jack","Wilson");


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


INSERT INTO department(name) 
VALUES ("Sales");
INSERT INTO department(name) 
VALUES ("Marketing");
INSERT INTO department(name) 
VALUES ("Finance");
INSERT INTO department(name) 
VALUES ("Legal");
INSERT INTO department(name) 
VALUES ("Engineering");