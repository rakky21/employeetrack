
const express = require('express');
const router = express.Router();
// const router = require('.');
const db = require('../../db/connection');
// const inputCheck = require('../../utils/inputCheck');
// selects all candidates

// THEN I am presented with the job title, role id,
//  the department that role belongs to, and the salary for that role

router.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employees
    AS party_name
    FROM roles
    LEFT JOIN parties 
    ON candidates.party_id = parties.id`;
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

// get a single candidate
  router.get('/employees/:id', (req, res) => {
    const sql = `SELECT employees.*, parties.name 
    AS party_name 
    FROM candidates 
    LEFT JOIN parties 
    ON candidates.party_id = parties.id 
    WHERE candidates.id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });

  // WHEN I choose to add an employee
  // THEN I am prompted to enter the employee’s first name, last name, role, 
  // and manager and that employee is added to the database

  // create an employee
router.post('/employees', ({ body }, res) => {
    const errors = inputCheck(
      body,
      'first_name',
      'last_name',
      'role_id',
      'manager_id'
    );
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    const sql = `INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
  VALUES (?,?,?,?)`;
    const params = [
      body.first_name,
      body.last_name,
      body.role_id,
      body.manager_id
    ];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body,
        changes: result.affectedRows
      });
    });
  });

  // UPDATE candidate
router.put('/employees/:id', (req, res) => {
    // candidate is allowed to not have party affiliation
    const errors = inputCheck(req.body, 'role_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    const sql = `UPDATE employees SET role_id = ?
  WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        // check if a ercord was found
      } else if (!result.affectedRows) {
        res.json({
          message: 'employee not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });

  // deletes a candidate
router.delete('/employees/:id', (req, res) => {
    const sql = `DELETE FROM employees WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'employee not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });

module.exports = router;
