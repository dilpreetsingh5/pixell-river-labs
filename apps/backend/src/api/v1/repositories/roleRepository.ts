import { organization } from "../data/Organization";
import type { CreateRoleInput, Role } from "../../../../../../shared/types/Role";

let roleStore: Role[] = [...organization];

function getRoles(): Role[] {
  return [...roleStore];
}

function createRole(input: CreateRoleInput): Role {
  const newRole: Role = {
    firstName: input.firstName,
    lastName: input.lastName,
    role: input.role
  };

  roleStore = [...roleStore, newRole];
  return newRole;
}

export const roleRepository = {
  getRoles,
  createRole
};
