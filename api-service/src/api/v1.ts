import cors from "cors";
import { Router } from "express";
import { currentMenu } from "..";
import { getDayFromWeek } from "../foodUtils";
import { Weekday } from "../types";
import { getCurrentDayIndex } from "../utils";
import { apiResponse } from "./apiResponse";

const api = Router();
api.use(cors());

api.get("/menu", (req, res) => {
  apiResponse(res, 200, { ...currentMenu });
});

api.get("/menu/today", (req, res) => {
  const today = getDayFromWeek(currentMenu, getCurrentDayIndex());

  apiResponse(res, 200, { ...today });
});


api.get("/menu/:dayId", (req, res) => {
  const dayId = +req.params.dayId;

  if (Object.hasOwn(Weekday, dayId)) {
    const day = getDayFromWeek(currentMenu, dayId);
    apiResponse(res, 200, { ...day });
  } else {
    apiResponse(res, 400, { msg: "Invalid dayId" });
  }
});

export default api;