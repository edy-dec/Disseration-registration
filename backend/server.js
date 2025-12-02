import "dotenv/config";

import mongoose from "mongoose";
import { connectDB } from "./utilities/dbManager.js";

const uri = process.env.MONGO_URI;

connectDB(uri);
