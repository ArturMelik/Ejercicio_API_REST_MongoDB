const express = require("express");
const router = express.Router();
const { createProvider, getAllProviders } = require("../services/providers.service");

router.get("/", async (req, res) => {
  const providers = await getAllProviders();
  res.json(providers);
});

router.post("/", async (req, res) => {
  try {
    const provider = await createProvider(req.body);
    res.status(201).json(provider);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
