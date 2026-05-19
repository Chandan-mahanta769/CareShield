import express from "express";
import Candidate from "../models/Candidate.js";

const router = express.Router();

router.get("/", async (req, res) => {

  try {

    const candidates =
      await Candidate.find();

    res.json(candidates);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

export default router;