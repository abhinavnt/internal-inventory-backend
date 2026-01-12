"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorMiddleWare_1 = require("./middlewares/errorMiddleWare");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const genre_routes_1 = __importDefault(require("./routes/genre.routes"));
const event_routes_1 = __importDefault(require("./routes/event.routes"));
const booking_routes_1 = __importDefault(require("./routes/booking.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const supportTicket_routes_1 = __importDefault(require("./routes/supportTicket.routes"));
const viewTicket_routes_1 = __importDefault(require("./routes/viewTicket.routes"));
const testimonials_routes_1 = __importDefault(require("./routes/testimonials.routes"));
const newsletter_routes_1 = __importDefault(require("./routes/newsletter.routes"));
const contact_routes_1 = __importDefault(require("./routes/contact.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const CLIENT_URL = process.env.CLIENT_URL;
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const allowedOrigins = [CLIENT_URL];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use("/api/auth", auth_routes_1.default);
app.use("/api/genre", genre_routes_1.default);
app.use("/api/event", event_routes_1.default);
app.use("/api/booking", booking_routes_1.default);
app.use("/api/payment", payment_routes_1.default);
app.use("/api/support", supportTicket_routes_1.default);
app.use("/api/view-ticket", viewTicket_routes_1.default);
app.use("/api/testimonials", testimonials_routes_1.default);
app.use("/api/newsletter", newsletter_routes_1.default);
app.use("/api/contact", contact_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/dashboard", dashboard_routes_1.default);
app.use(errorMiddleWare_1.errorHandler);
exports.default = app;
