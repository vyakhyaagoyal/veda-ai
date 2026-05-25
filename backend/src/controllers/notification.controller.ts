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

  export const clearAllNotifications =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      await Notification.deleteMany(
        {}
      );

      res.json({
        success: true,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
      });
    }
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