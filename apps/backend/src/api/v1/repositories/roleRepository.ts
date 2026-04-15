import type { CreateRoleInput, Role } from "../../../../../../shared/types/Role";
import { prisma } from "../../../db/prisma";

interface CreateRoleRecordInput extends CreateRoleInput {
  createdByUserId?: number;
}

async function getRoles(): Promise<Role[]> {
  return prisma.role.findMany({
    select: { firstName: true, lastName: true, role: true },
    orderBy: { role: "asc" }
  });
}

async function createRole(input: CreateRoleRecordInput): Promise<Role> {
  return prisma.role.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      role: input.role,
      createdBy: input.createdByUserId ? { connect: { id: input.createdByUserId } } : undefined
    },
    select: { firstName: true, lastName: true, role: true }
  });
}

export const roleRepository = {
  getRoles,
  createRole
};
