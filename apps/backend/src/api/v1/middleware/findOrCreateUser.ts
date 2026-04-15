import type { NextFunction, Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { prisma } from "../../../db/prisma";

async function findOrCreateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  const auth = getAuth(req);

  if (!auth.userId) {
    res.status(401).json({ success: false, message: "Authentication required." });
    return;
  }

  const user = await prisma.user.upsert({
    where: { clerkUserId: auth.userId },
    update: {},
    create: { clerkUserId: auth.userId }
  });

  req.clerkUserId = auth.userId;
  req.dbUserId = user.id;
  next();
}

export { findOrCreateUser };
