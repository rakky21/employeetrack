
const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
// selects all candidates

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids

router.get('/departments', (req, res) => {
    const sql = `SELECT * FROM department
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
  router.get('/departments/:id', (req, res) => {
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

  // WHEN I choose to add a department
  // THEN I am prompted to enter the name of the department and that department is added to the database

  // create a department
router.post('/department', ({ body }, res) => {
    const errors = inputCheck(
      body,
      'department_name'
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
          message: 'Candidate not found'
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
          message: 'Candidate not found'
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
