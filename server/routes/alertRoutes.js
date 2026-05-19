import express from "express";
import Alert from "../models/Alert.js";

const router = express.Router();

router.get("/", async (req, res) => {

  try {

    const alerts =
      await Alert.find()
        .sort({ createdAt: -1 });

    res.json(alerts);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

export default router;