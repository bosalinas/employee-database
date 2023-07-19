const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'employee_db',
  password: 'St@rkill2018as$'
});

// function to start menu
function init() {
  inquirer
    .prompt([
      // questions for menu in here
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
        updateEmpRole();
      }
      if (answers.mainMenu === 'Exit Menu') {
        console.log('Exited menu. To restart enter node index.js.')
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

//query adding an dept
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
  db.query('SELECT * FROM department', (err, depts) => {
    if (err) console.log(err);
    var depts = depts.map((dept) => {
      return {
        name: dept.deptname,
        value: dept.id,
      };
    });
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter name of new role',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter salary for new role'
      },
      {
        type: 'list',
        name: 'depts',
        message: 'Select department for new role',
        choices: depts

      }]).then(res => {
        db.query('INSERT INTO employee_role SET ?', {
          title: res.title,
          salary: res.salary,
          department_id: res.depts,
        }, (err, response) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Role Added!');
          }
          //callback function to go back to main menu
          init();
        });
      });
  })
};

const addEmployee = () => {
  //query to get role_id
  db.query('SELECT * FROM employee_role', (err, empRoles) => {
    if (err) console.log(err);
    var roles = empRoles.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });
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
        message: 'Choose role for employee',
        choices: roles
      },
    ])
    .then (res => {
      db.query('SELECT first_name, last_name FROM employee WHERE manager_id IS NULL', (err, manager) => {
      if (err) console.log(err);
      const newEmployeeInfo = res
      var managers = manager.map((managersId) => {
        return {
          name: managersId.first_name + " " + managersId.last_name,
          value: managersId.id,
        };
      });
      inquirer.prompt([
        {
          type: 'list',
          name: 'managerId',
          message: 'Choose manager for employee',
          choices: managers
        }
      ]).then(res => {
        db.query('INSERT INTO employee SET ?', {
          first_name: newEmployeeInfo.first,
          last_name: newEmployeeInfo.last,
          role_id: newEmployeeInfo.roleId,
          manager_id: res.managerId,
        },
          (err, response) => {
            if (err) {
              console.error(err)
            } else {
              console.log("Employee added!")
              init();
            }
          });
      });
    });
  })
})};

const updateEmpRole = () => {
  db.query('SELECT * FROM employee', (err, employee) => {
    if (err) console.log(err);
    var employeeInfo = employee.map((info) => {
      return {
        name: `${info.first_name} ${info.last_name}`,
        value: info.id,
      };
    });
    inquirer.prompt([
      {
        type: 'list',
        name: 'employeeName',
        message: 'Chose employee',
        choices: employeeInfo
      },
    ])
      .then(res => {
        db.query('SELECT * FROM employee_role', (err, empRoles) => {
          const employeeId = res.employeeName;
          console.log({ employeeId });
          if (err) console.log(err);

          var roles = empRoles.map((role) => {
            return {
              name: role.title,
              value: role.id,
            };
          });
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'newRole',
                message: 'Choose new role',
                choices: roles
              },
            ])
            .then((res) => {
              console.log(res);
              db.query(
                'UPDATE employee SET role_id = (?) WHERE id = (?)',
                [res.newRole, employeeId],
                (err, response) => {
                  if (err) {
                    console.error(err)
                  } else {
                    console.log("Employee role updated!")
                    init();
                  }
                });
            });
        });
      })
  })
};
