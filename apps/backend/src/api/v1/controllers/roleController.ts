import type { Request, Response } from "express";
import { roleService } from "../services/roleService";

function getRoles(_req: Request, res: Response): void {
  const roles = roleService.getRoles();
  res.status(200).json(roles);
}

function createRole(req: Request, res: Response): void {
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

  const result = roleService.createRole({ firstName, lastName, role });

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
