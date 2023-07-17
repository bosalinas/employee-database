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
    /* Pass your questions in here */
    {
        type: "list",
        name: "mainMenu",
        message: "What would you like to do?",
        choices: ["view all departments", "view all roles"]
    } 
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    console.log(answers.mainMenu);
    if (answers.mainMenu === "view all departments") {
        viewAllDept();
    }
  })
  .catch((error) => {
    console.log(error);
  });
};
 init();

//run query based on choice
function viewAllDept () {
db.query(
    'SELECT * FROM department',
    function(err, results) {
      console.table(results); 
      init();
    }
  )};

  //add role 
  function addRole () {
    //add inquirer prompt for adding employee
    inquirer
  .prompt([
    /* insert role questions */
    //set up seeds first
    {
        type: "list",
        name: "mainMenu",
        message: "What would you like to do?",
        choices: ["view all departments", "view all roles"]
    } 
  ])
  .then((answers) => {
    //.then select statement for SQL
    //answers.blah 
    db.query(
        'SELECT * FROM department',
        function(err, results) {
          console.table(results); 
          init();
        }
      )})
  .catch((error) => {
    console.log(error);
  });
    

