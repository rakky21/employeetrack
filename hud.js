const inquirer = require('inquirer');
const fs = require('fs')
const db = require('./db/connection.js');

const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'option',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
    }
];

// questions
function init() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            console.log(answers);
            if (answers.option === 'View all departments') {
                viewallDepartments();
            } else if (answers.option === 'View all roles') {
                viewRoles()
            }
            else if (answers.option === 'View all employees') {
                viewEmployees()
            }
            // add emp
            else if (answers.option === 'Add an employee') {
                addEmployee()
            }
            else if (answers.option === 'Add a role') {
                addRole()
            }
            else if (answers.option === 'Add a department') {
                addDepartment()
            }
            else if (answers.option === 'Update an employee role') {
                updateEmployee()
            }
            else if (answers.option === 'Quit') {
                quit()
            }
        })
        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
}
init();

// selects the data to view all departs.
function viewallDepartments() {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
            return;
        }
        console.table(rows)
        init();
    });
}

// roles
function viewRoles() {
    const sql = `SELECT * FROM roles`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
            return;
        }
        console.table(rows)
        init();
    });
}

// emp list
function viewEmployees() {
    const sql = `SELECT * FROM employees`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err)
            return;
        }
        console.table(rows)
        init();
    });
}

// add employee
const empQs = [
    {
        type: 'input',
        message: 'What is the employees first name?',
        name: 'first_name'
    },
    {
        type: 'input',
        message: 'What is the employees last name?',
        name: 'last_name'
    },
    {
        type: 'input',
        message: 'What is the employees role ID?',
        name: 'roles_id'
    },
    {
        type: 'input',
        message: 'What is the employees managers ID?',
        name: 'managers_id'
    }
];
function addEmployee() {
    inquirer
        .prompt(empQs).then(body => {
            const sql = `INSERT INTO employees (first_name, last_name, roles_id, managers_id)
            VALUES (?,?,?,?)`;
            const params = [
                body.first_name,
                body.last_name,
                body.roles_id,
                body.managers_id
            ];
            db.query(sql, params, (err, rows) => {
                if (err) {
                    console.log(err)
                    return;
                }
                console.table(rows)
                init();
            });
        })
}

// add dep
const depQs = [
    {
        type: 'input',
        message: 'What is the departments name?',
        name: 'department_name'
    }];
function addDepartment() {
    inquirer
        .prompt(depQs).then(body => {
            const sql = `INSERT INTO departments (department_name)
VALUES (?)`;
            const params = [
                body.department_name
            ];
            db.query(sql, params, (err, rows) => {
                if (err) {
                    console.log(err)
                    return;
                }
                console.table(rows)
                init();
            });
        })
}

// add role
const roleQs = [
    {
        type: 'input',
        message: 'What is the title name?',
        name: 'title'
    },
    {
        type: 'input',
        message: 'What is this positions salary?',
        name: 'salary'
    },
    {
        type: 'input',
        message: 'What department it belongs to?',
        name: 'department_id'
    }
];
function addRole() {
    inquirer
        .prompt(roleQs).then(body => {
            const sql = `INSERT INTO roles (title, salary)
            VALUES (?,?)`;
            const params = [
                body.title,
                body.salary,
                body.department_id
            ];
            db.query(sql, params, (err, rows) => {
                if (err) {
                    console.log(err)
                    return;
                }
                console.table(rows)
                init();
            });
        })
}

// update role
const updateQs = [
    {
        type: 'choices',
        message: 'Select ID of employee you wish to update?',
        name: 'employees_id'
    },
    {
        type: 'choices',
        message: 'Select new title?',
        name: 'roles_id'
    }];
function updateEmployee() {
    inquirer
        .prompt(updateQs).then(body => {
            const sql = `UPDATE employee SET role = ? WHERE id = ?`;
            const params = [req.body.roles_id, req.params.id];
            db.query(sql, params, (err, rows) => {
                if (err) {
                    console.log(err)
                    return;
                }
                console.table(rows)
                init();
            });
        })
}

function quit() {
    db.end()
    process.exit()
}