const inquirer = require('inquirer');
const fs = require('fs')
const db = require('./db/connection.js');

// const generateMarkdown = require('./ut/generateMarkdown')
// const writeEmployeeqs = require('./utils/writeEmployeeqs.js')

// THEN I am presented with the following options:
//  view all departments, view all roles, view all employees, 
//  add a department, add a role, add an employee, and update an employee role

const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'option',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
    }
    //     {
    //         type: 'choices',
    //         message: "view all departments",
    //         choices: ['Sales', 'Engineering', 'Finance', 'Legal']
    //     },
    //     {
    //         type: 'choices',
    //         message: 'view all roles',
    //         choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', ' Software Engineer', 'Accountant', 'Legal Team Lead', 'Lawyer', 'Software Engineer']
    //     },
    //     {
    //         type: 'input',
    //         message: 'Add employee',
    //         choices: ['']
    //     },
    //     {
    //         type: 'input',
    //         message: 'Add department',
    //         choices: ['']
    //     }
];

// 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'
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

// selects the data
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
            const sql = `INSERT INTO employees (id, first_name, last_name, roles_id, managers_id)
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


function quit() {
    db.end()
    process.exit()
}