import express from "express";
import http from "http";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

import Candidate from "./models/Candidate.js";
import Alert from "./models/Alert.js";

import candidateRoutes from "./routes/candidateRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";

dotenv.config();

const app = express();

const server = http.createServer(app);

const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL];



// SOCKET
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// MIDDLEWARE
app.use(express.json());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

// ROUTES
app.use("/candidates", candidateRoutes);
app.use("/alerts", alertRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("CareShield Backend Running");
});

// DB CONNECT
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    startRealtimeSimulation();

  })
  .catch((err) => {
    console.log(err);
  });

// SOCKET EVENTS
io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.on("detection-event", async (data) => {
    try {
      const { candidateId, name, type, severity } = data;

      // SAVE ALERT
      const alert = await Alert.create({
        candidateId,
        name,
        type,
        severity,
      });

      // STATUS
      const status = severity === "CRIT" ? "FLAGGED" : "WATCH";

      // UPDATE CANDIDATE
      const candidate = await Candidate.findOneAndUpdate(
        { candidateId },
        {
          name,
          status,
          lastEvent: type,
          $inc: {
            integrityScore: severity === "CRIT" ? -5 : -2,
          },
        },
        {
          new: true,
          upsert: true,
        },
      );

      // BROADCAST
      io.emit("new-alert", alert);

      io.emit("candidate-update", candidate);
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

const PORT = process.env.PORT || 5000;

// FAKE REALTIME EVENTS

const candidatePool = [
  {
    candidateId: "C001",
    name: "Arjun Mehta",
  },

  {
    candidateId: "C002",
    name: "Priya Sharma",
  },

  {
    candidateId: "C003",
    name: "Rahul Verma",
  },

  {
    candidateId: "C004",
    name: "Sneha Iyer",
  },

  {
    candidateId: "C005",
    name: "Amit Patel",
  },

  {
    candidateId: "C006",
    name: "Kavya Nair",
  },

  {
    candidateId: "C007",
    name: "Rohan Gupta",
  },

  {
    candidateId: "C008",
    name: "Divya Reddy",
  },
];

const eventPool = [
  {
    type: "Phone Detected",
    severity: "CRIT",
  },

  {
    type: "Tab Switch",
    severity: "CRIT",
  },

  {
    type: "Face Not Visible",
    severity: "CRIT",
  },

  {
    type: "Gaze Drift",
    severity: "MED",
  },

  {
    type: "Audio Detected",
    severity: "MED",
  },

  {
    type: "Multiple Faces",
    severity: "CRIT",
  },
];




server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
