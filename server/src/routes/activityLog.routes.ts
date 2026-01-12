import express from "express";
import { TYPES } from "../di/types";
import container from "../di/container";
import { IActivityLogController } from "../core/interfaces/controllers/IActivityLogController";

const router = express.Router();

const controller = container.get<IActivityLogController>(TYPES.ActivityLogController);

router.get("/", controller.getAll);

export default router;
