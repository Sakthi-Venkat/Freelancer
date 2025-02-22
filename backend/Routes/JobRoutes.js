const express = require('express');
const { createJob, getJobs, getJobById, updateJob, deleteJob } = require('../controller/jobController');
const { identifer} = require("../middleware/identifer")
const router = express.Router();

router.post("/job-create" , identifer(["client"]) , createJob);

router.get("/jobs", getJobs);

router.get("/jobs/:id", getJobById);

router.put("/jobs/:id", identifer(['client']) , updateJob);

router.delete("/jobs/:id" , identifer(["client"]) , deleteJob);

module.exports = router;