import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({

  name: String,

  candidateId: String,

  status: {
    type: String,
    enum: ["OK", "WATCH", "FLAGGED"],
    default: "OK"
  },

  lastEvent: String,

  integrityScore: {
    type: Number,
    default: 100
  }

}, { timestamps: true });

export default mongoose.model(
  "Candidate",
  candidateSchema
);