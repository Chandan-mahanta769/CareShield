// Demo data for testing 
export const demoCandidates = [
  {
    _id: "demo-1",
    candidateId: "CAND001",
    name: "Raj Kumar",
    email: "raj@example.com",
    phone: "+91-9876543210",
    status: "FLAGGED",
    detectionMetrics: {
      facePresence: 0.92,
      eyeContact: 0.65,
      headMovement: 0.78,
      multiplePersons: false
    },
    violations: 3,
    createdAt: new Date(Date.now() - 600000).toISOString()
  },
  {
    _id: "demo-2",
    candidateId: "CAND002",
    name: "Priya Singh",
    email: "priya@example.com",
    phone: "+91-9876543211",
    status: "OK",
    detectionMetrics: {
      facePresence: 0.98,
      eyeContact: 0.92,
      headMovement: 0.45,
      multiplePersons: false
    },
    violations: 0,
    createdAt: new Date(Date.now() - 300000).toISOString()
  },
  {
    _id: "demo-3",
    candidateId: "CAND003",
    name: "Amit Patel",
    email: "amit@example.com",
    phone: "+91-9876543212",
    status: "FLAGGED",
    detectionMetrics: {
      facePresence: 0.45,
      eyeContact: 0.38,
      headMovement: 0.92,
      multiplePersons: false
    },
    violations: 5,
    createdAt: new Date(Date.now() - 120000).toISOString()
  },
  {
    _id: "demo-4",
    candidateId: "CAND004",
    name: "Neha Verma",
    email: "neha@example.com",
    phone: "+91-9876543213",
    status: "OK",
    detectionMetrics: {
      facePresence: 0.96,
      eyeContact: 0.88,
      headMovement: 0.52,
      multiplePersons: false
    },
    violations: 1,
    createdAt: new Date(Date.now() - 180000).toISOString()
  },
  {
    _id: "demo-5",
    candidateId: "CAND005",
    name: "Vikram Sharma",
    email: "vikram@example.com",
    phone: "+91-9876543214",
    status: "FLAGGED",
    detectionMetrics: {
      facePresence: 0.72,
      eyeContact: 0.42,
      headMovement: 0.85,
      multiplePersons: true
    },
    violations: 7,
    createdAt: new Date(Date.now() - 900000).toISOString()
  }
];

export const demoAlerts = [
  {
    _id: "alert-1",
    candidateId: "CAND001",
    candidateName: "Raj Kumar",
    type: "Multiple Persons Detected",
    severity: "HIGH",
    description: "Multiple faces detected in frame",
    createdAt: new Date(Date.now() - 120000).toISOString(),
    resolved: false
  },
  {
    _id: "alert-2",
    candidateId: "CAND003",
    candidateName: "Amit Patel",
    type: "No Face Detected",
    severity: "CRITICAL",
    description: "Face not visible in camera feed",
    createdAt: new Date(Date.now() - 90000).toISOString(),
    resolved: false
  },
  {
    _id: "alert-3",
    candidateId: "CAND002",
    candidateName: "Priya Singh",
    type: "Head Movement",
    severity: "MEDIUM",
    description: "Excessive head movement detected",
    createdAt: new Date(Date.now() - 60000).toISOString(),
    resolved: false
  },
  {
    _id: "alert-4",
    candidateId: "CAND005",
    candidateName: "Vikram Sharma",
    type: "Eye Contact Lost",
    severity: "HIGH",
    description: "Eyes not focused on screen",
    createdAt: new Date(Date.now() - 45000).toISOString(),
    resolved: false
  },
  {
    _id: "alert-5",
    candidateId: "CAND001",
    candidateName: "Raj Kumar",
    type: "Face Presence Low",
    severity: "MEDIUM",
    description: "Face partially out of frame",
    createdAt: new Date(Date.now() - 30000).toISOString(),
    resolved: false
  }
];
