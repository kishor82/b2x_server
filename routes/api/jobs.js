const express = require('express');
const router = express.Router();
const boom = require('boom');
const axios = require('axios');

router.post('/get', async (req, res, next) => {
  try {
    const response = await Promise.all(
      req.body.map(async (jobNumber) => {
        try {
          const jobData = await axios.post(
            'https://pre-prod-ccs-srt.b2x.com/ccs-xiaomi/pushWorkOrder',
            {
              jobNumber: jobNumber,
              repairStatus: '60',
              claimId: '',
              consent: true,
              partnerId: '1002901',
            }
          );
          return { jobNumber, data: jobData.data };
        } catch (err) {
          return { jobNumber, data: err.response.data };
        }
      })
    );
    res.status(201).send(response);
  } catch (err) {
    console.log(err);
    return next(boom.boomify(err));
  }
});

module.exports = router;
