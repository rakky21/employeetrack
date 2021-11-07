-- EMPLOEEYSSS INFO!!!

INSERT INTO departments (department_name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

-- double? d_i? fix.
INSERT INTO roles (title, salary)
VALUES
  ('Sales Lead', 100000),
  ('Salesperson', 80000),
  ('Lead Engineer', 150000),
  ('Software Engineer', 120000),
  ('Accountant', 125000),
  ('Legal Team Lead', 250000),
  ('Lawyer', 190000);

INSERT INTO managers (managers_name)
VALUES
('Ashley Rodriguez'),
('John Doe'),
('Sarah Lourd'),
('Mike Chan'),
('Null');


INSERT INTO employees (first_name, last_name, roles_id, managers_id)
VALUES
  ('John', 'Doe', 1, 1),
  ('Mike', 'Chan', 2, 2),
  ('Ashley', 'Rodriguez', 3, 5),
  ('Kevin', 'Tupik', 4, 1),
  ('Malia', 'Brown', 5, 5),
  ('Sarah', 'Lourd', 6, 5),
  ('Tom', 'Allen', 7, 3);