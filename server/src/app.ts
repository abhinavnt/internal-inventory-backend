import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorMiddleWare";
import authRoutes from "./routes/auth.routes";
import dashboardRoutes from "./routes/dashboard.routes"
import productRoutes from "./routes/product.routes"
import promotionRoutes from "./routes/promotion.routes"
import saleRoutes from "./routes/sale.routes"
import capitalRoutes from "./routes/capital.routes"
import expensesRoutes from "./routes/expense.routes"
import activitylogsRoutes from "./routes/activityLog.routes"


dotenv.config();
connectDB();

const app = express();
const CLIENT_URL = process.env.CLIENT_URL;

app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [CLIENT_URL];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/products", productRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/capital", capitalRoutes);
app.use("/api/expenses",expensesRoutes)
app.use("/api/activity-logs",activitylogsRoutes)


app.use(errorHandler);

export default app;
