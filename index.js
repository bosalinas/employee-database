// prompt user with questions 
const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employee_db',
    password: 'St@rkill2018as$'
  });

// function to ask questions
function init () {
inquirer
  .prompt([
    /* Pass your question for menu in here */
    {
        type: "list",
        name: "mainMenu",
        message: "SELECT A MENU OPTION",
        choices: ["View all departments", "View all roles", "Add an employee", "Add a department", "Add a role", "Update an employee role", "Exit Menu"]
    } 
  ])
  .then((answers) => {
    if (answers.mainMenu === 'View all departments'){
      viewAllDept();
    }
    if (answers.mainMenu === 'View all roles'){
      viewAllRoles();
    }
    if (answers.mainMenu === 'Add an employee'){
      addEmployee();
    }
    if (answers.mainMenu === 'Add a department'){
      addDept();
    }
    if (answers.mainMenu === 'Add a role'){
      addRole();
    }
    if (answers.mainMenu === 'Update an employee role'){
      updateEmployee();
    }
    if (answers.mainMenu === 'Exit Menu'){
      console.log('Exited menu. To restart enter npm start.')
      db.end();
    }
  })
  .catch((error) => {
      console.log(error);
    });
  };
  init();
//function to query view all dept
const viewAllDept = () => {
db.query(
    'SELECT * FROM department',
    function(err, results) {
      console.table(results); 
      init();
    }
  )};
//function to query view all roles 
const viewAllRoles = () => {
  db.query(
      'SELECT * FROM employee_role',
      function(err, results) {
        console.table(results); 
        init();
      }
    )};

//function to query adding an employee 
const addDept = () => {
  inquirer.prompt(
    {
      type: 'input',
      name: 'deptname',
      message: 'Enter new department name'

    }).then(res => {
      db.query('INSERT INTO department (deptname) ?', {
        name: res.deptname
      },
      (err, response) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Department added!')
        }
      })
        //add some code for what you want to do with the results


        //then within this callback function we can call your init function
        init()
      })
      }
//function to query updating employee
// const addRole = () => {
//   db.query(
//     'SELECT * FROM employee_role',
//     function(err, results) {
//       console.table(results); 
//       init();
//     } 
//     )};
  
// const addEmployee = () => {
//   db.query(
//     'SELECT * FROM employee_role',
//     function(err, results) {
//       console.table(results); 
//       init();
//     } 
//     )};

// const updateRole = () => {
//   db.query(
//     'SELECT * FROM employee_role',
//     function(err, results) {
//       console.table(results); 
//       init();
//     } 
//     )};


