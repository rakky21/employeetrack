
const express = require('express');
const router = express.Router();
// const router = require('.');
const db = require('../../db/connection');

// selects all candidates
router.get('/roles', (req, res) => {
    const sql = `SELECT salary,title
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

// get a role
  router.get('/roles/:id', (req, res) => {
    const sql = `SELECT roles.*, parties.name
    AS party_name
    FROM roles 
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


//   WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
 
// create a role
router.post('/roles', ({ body }, res) => {
    const errors = inputCheck(
      body,
      'role_name',
      'salary'
    );
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    const sql = `INSERT INTO roles (id, role_name, salary, department)
  VALUES (?,?,?,?)`;
    const params = [
      body.role_name,
      body.salary,
      body.department
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
router.put('/roles/:id', (req, res) => {
    // candidate is allowed to not have party affiliation
    const errors = inputCheck(req.body, 'role_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    const sql = `UPDATE roles SET role_id = ?
  WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        // check if a ercord was found
      } else if (!result.affectedRows) {
        res.json({
          message: 'Role not found'
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
