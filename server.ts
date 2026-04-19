import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, serverTimestamp, query, where, orderBy, writeBatch } from "firebase/firestore";
import firebaseConfig from "./firebase-applet-config.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase (Client SDK bridge for resilient connectivity)
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp, (firebaseConfig as any).firestoreDatabaseId);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ==========================================
  // 1. STORY-DRIVEN CONTENT ENGINE
  // ==========================================
  app.get("/api/sections", async (req, res) => {
    try {
      const q = query(collection(db, "sections"), orderBy("order"));
      const snapshot = await getDocs(q);
      const sections = snapshot.docs.map(doc => {
          const data = doc.data();
          delete (data as any).system_key;
          return { id: doc.id, ...data };
      });
      
      // Default fallback if DB is empty
      if (sections.length === 0) {
        return res.json([
          {
            title: "Hero",
            headline: "The Heart of the World",
            subtext: "Experience the pinnacle of shopping, dining, and leisure.",
            media: {
              type: "video",
              source: "youtube",
              url: "https://www.youtube.com/watch?v=ahy5o5nT4oI",
              autoplay: true,
              loop: true,
              muted: true
            },
            layout_type: "fullscreen",
            order: 1
          }
        ]);
      }
      res.json(sections);
    } catch (error) {
      console.error("Error fetching sections (Client Bridge):", error);
      res.status(500).json({ error: "Failed to fetch storytelling sections" });
    }
  });

  // ==========================================
  // 2. HIGH-IMPACT DATA LAYER (Highlights)
  // ==========================================
  app.get("/api/highlights", async (req, res) => {
    try {
      const docSnap = await getDoc(doc(db, "config", "highlights"));
      if (docSnap.exists()) {
        res.json(docSnap.data());
      } else {
        // High-end stats for "Why Dubai Mall"
        res.json({
          visitors: "105M+",
          stores: "1,200+",
          area: "1.1M sqm",
          attractions: "15+"
        });
      }
    } catch (error) {
      res.json({ visitors: "105M+", stores: "1,200+", area: "1.1M sqm", attractions: "15+" });
    }
  });

  // ==========================================
  // 3. BUSINESS CONVERSION LAYER (Leads)
  // ==========================================
  app.post("/api/lead", async (req, res) => {
    try {
      const { name, email, company_name, interest_type, business_category, message } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ error: "Name and Email are required" });
      }

      const docRef = await addDoc(collection(db, "leads"), {
        name,
        email,
        company_name: company_name || "N/A",
        interest_type: interest_type || "leasing",
        business_category: business_category || "retail",
        message: message || "",
        timestamp: serverTimestamp(),
        system_key: process.env.INTERNAL_SYSTEM_KEY || 'visionary_bypass_2026'
      });

      console.log(`New business lead captured: ${docRef.id}`);
      res.status(201).json({ status: "success", id: docRef.id });
    } catch (error) {
      console.error("Error capturing lead:", error);
      res.status(500).json({ error: "Failed to process lead" });
    }
  });

  // ==========================================
  // 4. OPPORTUNITY SEGMENTATION API
  // ==========================================
  app.get("/api/opportunities", async (req, res) => {
    try {
      const { type } = req.query;
      const q = query(
        collection(db, "opportunities"),
        where("type", "==", type || "leasing")
      );
      const snapshot = await getDocs(q);
      const opportunities = snapshot.docs.map(doc => doc.data());
      
      if (opportunities.length === 0) {
          // Mock some deep product thinking content
          const mockData: any = {
              leasing: {
                  headline: "Premium Retail Spaces",
                  benefits: ["High footfall", "Global visibility", "Turnkey solutions"],
                  audience: "HNWIs, Global Tourists",
                  media_url: "https://www.youtube.com/watch?v=Rjf5BFxiOKA"
              },
              sponsorship: {
                  headline: "Own the Destination",
                  benefits: ["Brand dominance", "Integrated marketing", "Live activations"],
                  audience: "Mass Market",
                  media_url: "https://www.youtube.com/watch?v=upFoXg7myu8"
              }
          };
          return res.json([mockData[type as string] || mockData.leasing]);
      }
      res.json(opportunities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch opportunities" });
    }
  });

  // ==========================================
  // 5. EVENTS & ACTIVATION ENGINE
  // ==========================================
  app.get("/api/events", async (req, res) => {
    try {
      const q = query(collection(db, "events"), orderBy("date", "desc"));
      const snapshot = await getDocs(q);
      const events = snapshot.docs.map(doc => doc.data());
      
      if (events.length === 0) {
          return res.json([
              {
                  title: "Fashion Avenue Launch",
                  type: "past",
                  highlights: "Attendance by global style icons",
                  venue: "Main Atrium"
              },
              {
                  title: "Ice Rink Concert Series",
                  type: "capability",
                  highlights: "3,000 capacity seating",
                  venue: "Dubai Ice Rink"
              }
          ]);
      }
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  });

  // ==========================================
  // 6. ADMIN SEED (For Initial Setup)
  // ==========================================
  app.post("/api/admin/seed", async (req, res) => {
    try {
      const batch = writeBatch(db);

      // Seed Sections
      const dubaiSections = [
        { id: "hero", title: "Hero", headline: "Where Vision Meets Scale", subtext: "A Global Destination Landmark. Experience the intersection of luxury and innovation.", media: { type: "video", source: "youtube", url: "https://www.youtube.com/watch?v=RD0xom40iEE", autoplay: true, loop: true, muted: true }, layout_type: "fullscreen", order: 1 },
        { id: "vision", title: "Vision", headline: "Redefining Human Connectivity & Retail", subtext: "Inspired by the seamless integration of nature and urban luxury, The Oasis represents a paradigm shift. It is a canvas where global brands manifest their grandest visions.", details: [{ label: "Serenity", text: "1.5M Sq Ft of water features and green corridors." }, { label: "Innovation", text: "Next-gen immersive commercial spaces." }, { label: "Exclusivity", text: "A curated ecosystem of 500+ ultra-luxury boutiques." }], layout_type: "text-centric", order: 2 },
        { id: "scale", title: "Scale", headline: "Performance & Power: The Architecture of Influence", subtext: "Data that drives investment. We provide the platform; the world provides the audience.", media: { type: "video", source: "youtube", url: "https://www.youtube.com/watch?v=sARrB94jInQ", start_time: 52 }, layout_type: "split", order: 3 },
        { id: "retail", title: "Retail", headline: "The Stage of Commerce: Retail Evolved", subtext: "Beyond transaction, we provide a narrative platform. Our spaces are curated to transform brand stories into visceral consumer experiences.", items: [{ title: "Haute Couture", desc: "Flagship spaces for the world's most iconic fashion houses." }, { title: "Artisanal", desc: "Curated boutiques showcasing exceptional craftsmanship." }, { title: "Digital First", desc: "Experiential retail concepts for the next generation." }], layout_type: "grid", order: 4 },
        { id: "couture", title: "Couture", headline: "The Artisan Standard: Haute Couture & Digital Craft", subtext: "We define luxury through the lens of performance and precision. From the meticulous stitch of a bespoke garment to the silicon soul of immersive digital experiences.", layout_type: "split", order: 5 },
        { id: "entertainment", title: "Entertainment", headline: "Entertainment & Attractions: Spectacle Reimagined", subtext: "From high-octane energy of global sports to the ethereal beauty of digital art, we host the experiences that define the cultural zeitgeist.", items: [{ title: "Arena Vision", desc: "A 20,000-seat multi-purpose venue for global concert tours." }, { title: "Digital Odyssey", desc: "The world's largest immersive digital art auditorium." }, { title: "Sky Gallery", desc: "Premium events space with 360° views of the Dubai skyline." }], layout_type: "grid", order: 6 },
        { id: "lifestyle", title: "Lifestyle", headline: "The Experience: Life in High Definition", subtext: "Every space is a meeting point. Every corner is a social catalyst. Join a community where global trends are born and social memories are crafted.", layout_type: "split", order: 7 },
        { id: "design", title: "Design", headline: "Architecture & Design: Blueprints of the Sublime", subtext: "Our design philosophy is rooted in the 'Sublime'—an intersection of awe, scale, and technical perfection. Every line is intentional; every curve is a promise of comfort.", details: [{ label: "Fluid Architecture", text: "Organic forms that mimic the natural flow of water and wind." }, { label: "Smart Integration", text: "Seamless IoT and AI-driven infrastructure for hyper-efficiency." }, { label: "Sustainable Core", text: "Net-zero target through regenerative energy and biophilic design." }], layout_type: "featured", order: 8 }
      ];

      dubaiSections.forEach(({ id, ...s }) => {
        const ref = doc(db, "sections", id);
        batch.set(ref, { ...s, system_key: process.env.INTERNAL_SYSTEM_KEY || 'visionary_bypass_2026' });
      });

      // Seed Highlights
      batch.set(doc(db, "config", "highlights"), {
        visitors: "105M+",
        stores: "1,200+",
        area: "1.1M sqm",
        attractions: "15+",
        system_key: process.env.INTERNAL_SYSTEM_KEY || 'visionary_bypass_2026'
      });

      await batch.commit();
      res.json({ message: "Dubai Mall Backend Seeded Successfully" });
    } catch (error) {
      console.error("Seed error:", error);
      res.status(500).json({ error: "Seeding failed", detail: error instanceof Error ? error.message : String(error) });
    }
  });

  // Vite setup
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
    console.log(`Dubai Mall Backend running on port ${PORT}`);
  });
}

startServer();

