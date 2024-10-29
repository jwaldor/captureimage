import express, { NextFunction } from "express";

import cors from "cors";
import { saveNewFile } from "./controllers/uploadS3";
import { upload } from "./services/multer";
import { attachUserMiddleware } from "./services/auth";
import { Request, Response } from "express";
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));
const PORT = process.env.PORT || 3000;

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Validate request using authRequestSchema
  // const parsedRequest = authRequestSchema.safeParse(req);
  // if (!parsedRequest.success) {
  //   res.status(400).json({ error: "Invalid request format" });
  //   return;
  // }

  console.log("Request here:", {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body,
  });
  next();
};

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.post(
  "/upload",
  loggerMiddleware,
  attachUserMiddleware,
  upload.single("file"),
  saveNewFile
);

app.get("/form", (req, res) => {
  res.send(`<form action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="file" accept="image/*">
  <button type="submit">Upload</button>
  </form>`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
