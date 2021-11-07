-- EMPLOYEE DATA ENTRY

DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS managers;


-- WHEN I choose to view all departments
--  THEN I am presented with a formatted table showing department names and department ids
CREATE TABLE departments (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary INTEGER NOT NULL
);

-- WHEN I choose to view all employees
-- THEN I am presented with a formatted table showing employee data, including employee ids,
--  first names, last names, job titles, departments, salaries, and managers that the employees report to

CREATE TABLE employees (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  roles_id INTEGER,
  managers_id INTEGER
    -- CONSTRAINT uc_managers_name
    -- FOREIGN KEY (managers_name)
    -- REFERENCES managers(managers_name)
    -- ON DELETE SET NULL
);

-- fk = foreigh key
-- CREATE TABLE managers (
--   id INTEGER AUTO_INCREMENT PRIMARY KEY,
--   managers_name VARCHAR(30) NOT NULL,
--    INTEGER NOT NULL,
--   CONSTRAINT uc_employees
--   UNIQUE (employee_id),
--   CONSTRAINT fk_employee FOREIGN KEY (first_name) REFERENCES employees(first_name) ON DELETE CASCADE,
--   CONSTRAINT fk_employee FOREIGN KEY (last_name) REFERENCES employees(last_name) ON DELETE CASCADE
-- );

-- ALTER TABLE managers
-- ADD CONSTRAINT uc_managers_name UNIQUE (employees.first_name,employees.last_name);

CREATE TABLE managers (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  managers_name VARCHAR(30) NOT NULL
);

-- combine fn and ln to create managers name? fk 

-- What does this do?
  -- CONSTRAINT fk_party FOREIGN KEY (party_id) REFERENCES parties(id) ON DELETE SET NULL




  
-- CREATE TABLE employees (
--   id INTEGER AUTO_INCREMENT PRIMARY KEY,
--   first_name VARCHAR(30) NOT NULL,
--   last_name VARCHAR(30) NOT NULL,
--   roles_id INTEGER,
--   managers_id BOOLEAN NOT NULL
-- );