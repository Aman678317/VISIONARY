import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import firebaseConfig from "./firebase-applet-config.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: firebaseConfig.projectId,
  });
}

const db = getFirestore(firebaseConfig.firestoreDatabaseId);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/sections", async (req, res) => {
    try {
      const snapshot = await db.collection("sections").orderBy("order").get();
      const sections = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      if (sections.length === 0) {
          // Fallback to defaults or seed if empty
          return res.json([
            {
              id: "hero",
              title: "Hero",
              headline: "Where Vision Meets Scale",
              description: "A global destination experience that redefines luxury and commerce.",
              media: { type: "video", source: "youtube", url: "https://www.youtube.com/watch?v=kYI9C558p_w", autoplay: true, loop: true },
              order: 1
            }
          ]);
      }
      res.json(sections);
    } catch (error) {
      console.error("Error fetching sections:", error);
      res.status(500).json({ status: "error", message: "Failed to fetch segments" });
    }
  });

  app.get("/api/stats", async (req, res) => {
    try {
      const doc = await db.collection("config").doc("stats").get();
      if (doc.exists) {
        res.json(doc.data());
      } else {
        res.json({
          visitors: "85M+",
          size: "2.8M Sq Ft",
          brands: "1,200+",
          revenuePotential: "$5.2B"
        });
      }
    } catch (error) {
      res.json({ visitors: "85M+", size: "2.8M Sq Ft", brands: "1,200+", revenuePotential: "$5.2B" });
    }
  });

  app.post("/api/inquiry", async (req, res) => {
    try {
      const { name, email, business_type, interest_type, message } = req.body;
      const docRef = await db.collection("inquiries").add({
        name, email, business_type, interest_type, message,
        createdAt: FieldValue.serverTimestamp()
      });
      res.status(201).json({ status: "success", id: docRef.id });
    } catch (error) {
      console.error("Error saving inquiry:", error);
      res.status(500).json({ status: "error", message: "Failed to save inquiry" });
    }
  });

  // Admin Seed Route (Internal Use)
  app.post("/api/admin/seed", async (req, res) => {
      // Basic security check could go here
      const sections = [
        {
          title: "Hero",
          headline: "Where Vision Meets Scale",
          description: "A global destination experience that redefines luxury and commerce.",
          media: { type: "video", source: "youtube", url: "https://www.youtube.com/watch?v=kYI9C558p_w", autoplay: true, loop: true },
          order: 1
        },
        {
          title: "Vision & Concept",
          headline: "Architecting the Future",
          description: "More than just a destination, The Oasis is a testament to human ambition.",
          media: { type: "video", source: "youtube", url: "https://www.youtube.com/watch?v=J_D-I9UshZk", autoplay: true, loop: true },
          order: 2
        }
      ];
      
      const batch = db.batch();
      sections.forEach(s => {
          const ref = db.collection("sections").doc();
          batch.set(ref, s);
      });
      await batch.commit();
      res.json({ status: "seeded" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
