var express = require("express");
var router = express.Router();
var Project = require("../models/project");

router.post("/projects", (req, res) => {
  const project = new Project(req.body);
  project.save((err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(result);
    }
  });
});

router.get("/projects", (req, res) => {
  Project.find((err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(result);
    }
  });
});

router.get("/projects/:id", (req, res) => {
  Project.findById(req.params.id, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(result);
    }
  });
});

router.put("/projects/:id", (req, res) => {
  Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(result);
      }
    }
  );
});

router.delete("/projects/:id", (req, res) => {
  Project.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(result);
    }
  });
});

router.post("/projects/:id/team-members", (req, res) => {
  const { firstName, lastName, email } = req.body;
  Project.findById(req.params.id, (err, project) => {
    if (err) {
      res.status(400).send(err);
    } else {
      project.teamMembers.push({ firstName, lastName, email });
      project.save((err, updatedProject) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.send(updatedProject);
        }
      });
    }
  });
});

module.exports = router;
