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
function init() {
  inquirer
    .prompt([
      /* Pass your question for menu in here */
      {
        type: "list",
        name: "mainMenu",
        message: "SELECT A MENU OPTION",
        choices: ["View all departments", "View all roles", "View all employees", "Add an employee", "Add a department", "Add a role", "Update an employee role", "Exit Menu"]
      }
    ])
    .then((answers) => {
      if (answers.mainMenu === 'View all departments') {
        viewAllDept();
      }
      if (answers.mainMenu === 'View all roles') {
        viewAllRoles();
      }
      if (answers.mainMenu === 'View all employees') {
        viewAllEmployees();
      }
      if (answers.mainMenu === 'Add an employee') {
        addEmployee();
      }
      if (answers.mainMenu === 'Add a department') {
        addDept();
      }
      if (answers.mainMenu === 'Add a role') {
        addRole();
      }
      if (answers.mainMenu === 'Update an employee role') {
        updateEmployeeRole();
      }
      if (answers.mainMenu === 'Exit Menu') {
        console.log('Exited menu. To restart enter npm start.')
        db.end();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
init();

// query view all dept
const viewAllDept = () => {
  db.query(
    'SELECT * FROM department',
    function (err, results) {
      console.table(results);
      init();
    }
  )
};

// query view all employees
const viewAllEmployees = () => {
  db.query(
    'SELECT * FROM employee',
    function (err, results) {
      console.table(results);
      init();
    }
  )
};

//query view all roles 
const viewAllRoles = () => {
  db.query(
    'SELECT * FROM employee_role',
    function (err, results) {
      console.table(results);
      init();
    }
  )
};

//function to query adding an employee 
const addDept = () => {
  inquirer.prompt({
    type: 'input',
    name: 'deptname',
    message: 'Enter new department name'
  }).then(res => {
    db.query('INSERT INTO department (deptname) VALUES (?)', [res.deptname], (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Department added!');
      }
      //callback function to go back to main menu
      init();
    });
  });
};

//query adding a role
const addRole = () => {
  inquirer.prompt({
    type: 'input',
    name: 'title',
    message: 'Enter new role'
  }).then(res => {
    db.query('INSERT INTO employee_role (title) VALUES (?)', [res.title], (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Role Added!');
      }
      //callback function to go back to main menu
      init();
    });
  });
};
//get results out of query and then map then store in var 
const addEmployee = () => {
  db.query('SELECT * FROM employee_role', (err, empRoles) => {
    if (err) console.log(err);
    var roles = empRoles.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });
    console.log(roles);
    inquirer.prompt([
      {
        type: 'input',
        name: 'first',
        message: 'Enter first name'
      },
      {
        type: 'input',
        name: 'last',
        message: 'Enter last name'
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Chose role for employee',
        choices: roles
      }
    ]).then(res => {
      // console.log(res.role);
      db.query('INSERT INTO employee VALUES ?', {
        first_name: res.first,
        last_name: res.last,
        role_id: res.roleId,
      },
        err => {
          if (err) throw err;
          console.log('Added employee!')
        });
      //callback function to go back to main menu
      init();
    });
  });
}
//==========================================================
  const updateEmployeeRole = () => {
    db.query('SELECT * FROM employee', (err, employee) => {
      if (err) console.log(err);
      employeeInfo = employee.map((info) => {
        return {
          name: `${info.first_name} ${info.last_name}`,
          value: info.id,
        };
      });
      console.log(roles);
      inquirer.prompt([
        {
          type: 'list',
          name: 'employeeName',
          message: 'Chose employee',
          choices: employeeInfo
        },
        {
          type: 'list',
          name: 'newRole',
          message: 'Chose new role',
          choices: roles
        },
      ]).then(res => {
        // console.log(res.role);
        db.query('INSERT INTO employee VALUES ?', {
          first_name: res.first,
          last_name: res.last,
          role_id: res.roleId,
        },
          err => {
            if (err) throw err;
            console.log('Added employee!')
          });
        //callback function to go back to main menu
        init();
      });
    });
  }
  


