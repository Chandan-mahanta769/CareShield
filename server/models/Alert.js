import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({

  candidateId: String,

  name: String,

  type: String,

  severity: {
    type: String,
    enum: ["CRIT", "MED"]
  }

}, { timestamps: true });

export default mongoose.model(
  "Alert",
  alertSchema
);