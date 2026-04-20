import http from "http";
import app from "./app";
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { connectDB } from "./src/database/database";

dotenv.config();

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const databaseUrl = process.env.MONGO_URL as string;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

connectDB(databaseUrl);