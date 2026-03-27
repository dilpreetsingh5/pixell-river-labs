import type { Request, Response } from "express";
import { roleService } from "../services/roleService";

async function getRoles(_req: Request, res: Response): Promise<void> {
  try {
    const roles = await roleService.getRoles();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to load roles." });
  }
}

async function createRole(req: Request, res: Response): Promise<void> {
  const { firstName, lastName, role } = req.body ?? {};

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof role !== "string"
  ) {
    res.status(400).json({
      success: false,
      errors: {
        payload: "Invalid payload. firstName, lastName, role are required."
      }
    });
    return;
  }

  let result;
  try {
    result = await roleService.createRole({ firstName, lastName, role });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create role." });
    return;
  }

  if (!result.success) {
    res.status(400).json(result);
    return;
  }

  res.status(201).json(result);
}

export const roleController = {
  getRoles,
  createRole
};
