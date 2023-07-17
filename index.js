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
        choices: ["View all departments", "View all roles", "Add an employee", "Update an employee role", "Exit Menu"]
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
      db.query(
        'INSERT INTO department (deptname) ?'
        init();
        }
      )};
//function to query updating employee
const addRole = () => {
  db.query(
    'SELECT * FROM employee_role',
    function(err, results) {
      console.table(results); 
      init();
    } 
    )};
  
const addEmployee = () => {
  db.query(
    'SELECT * FROM employee_role',
    function(err, results) {
      console.table(results); 
      init();
    } 
    )};

const updateRole = () => {
  db.query(
    'SELECT * FROM employee_role',
    function(err, results) {
      console.table(results); 
      init();
    } 
    )};

  // //add role 
  // function addRole () {
  //   //add inquirer prompt for adding employee
  //   inquirer
  // .prompt([
  //   /* insert role questions */
  //   //set up seeds first
  //   {
  //       type: "list",
  //       name: "mainMenu",
  //       message: "What would you like to do?",
  //       choices: ["view all departments", "view all roles"]
  //   } 
  // ])
  // .then((answers) => {
  //   //.then select statement for SQL
  //   //answers.blah 
  //   db.query(
  //       'SELECT * FROM department',
  //       function(err, results) {
  //         console.table(results); 
  //         init();
  //       }
  //     )})
  // .catch((error) => {
  //   console.log(error);
  // });
    

