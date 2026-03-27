import { roleRepository } from "../repositories/roleRepository";
import type { CreateRoleInput, Role } from "../../../../../../shared/types/Role";

interface CreateRoleResult {
  success: boolean;
  roleRecord?: Role;
  errors?: {
    firstName?: string;
    role?: string;
  };
}

async function getRoles(): Promise<Role[]> {
  return roleRepository.getRoles();
}

async function createRole(input: CreateRoleInput): Promise<CreateRoleResult> {
  const errors: { firstName?: string; role?: string } = {};

  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const roleName = input.role.trim();

  if (firstName.length < 3) {
    errors.firstName = "First name must be at least 3 characters.";
  }

  if (!roleName) {
    errors.role = "Role is required.";
  }

  const roleExists = (await roleRepository.getRoles()).some(
    (role) => role.role.toLowerCase() === roleName.toLowerCase()
  );

  if (roleExists) {
    errors.role = "Role is already occupied.";
  }

  if (errors.firstName || errors.role) {
    return { success: false, errors };
  }

  const roleRecord = await roleRepository.createRole({
    firstName,
    lastName,
    role: roleName
  });

  return { success: true, roleRecord };
}

export const roleService = {
  getRoles,
  createRole
};
