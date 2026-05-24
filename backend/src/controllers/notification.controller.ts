import { Request, Response }
  from "express";

import { Notification }
  from "../models/Notification";

export const getNotifications =
  async (
    req: Request,
    res: Response
  ) => {
    const notifications =
      await Notification.find()
        .sort({
          createdAt: -1,
        })
        .limit(20);

    res.json({
      success: true,

      data: notifications,
    });
  };

export const markAsRead =
  async (
    req: Request,
    res: Response
  ) => {
    await Notification.findByIdAndUpdate(
      req.params.id,
      {
        read: true,
      }
    );

    res.json({
      success: true,
    });
  };