import type { CreateRoleInput, Role } from "../../../../../../shared/types/Role";
import { prisma } from "../../../db/prisma";

async function getRoles(): Promise<Role[]> {
  return prisma.role.findMany({
    select: { firstName: true, lastName: true, role: true },
    orderBy: { role: "asc" }
  });
}

async function createRole(input: CreateRoleInput): Promise<Role> {
  return prisma.role.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      role: input.role
    },
    select: { firstName: true, lastName: true, role: true }
  });
}

export const roleRepository = {
  getRoles,
  createRole
};
