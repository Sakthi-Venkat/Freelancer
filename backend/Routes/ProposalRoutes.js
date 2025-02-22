const express = require('express');
const { createProposal, getProposalId, updateProposal } = require('../controller/proposalController');
const router = express.Router();


router.post ("/jobs/:jobsId/proposal" , createProposal);

router.get ("/jobs/:jobsId/proposal" , getProposalId);

router.put("proposal/:id" , updateProposal);

module.exports = router;