import { organizationRepo } from '../repositories/organizationRepo';
import type { CreateRoleInput, Role } from '../types/Role';

interface CreateRoleResult {
    success: boolean;
    roleRecord?: Role;
    errors?: {
        firstName?: string;
        role?: string;
    };
}

function getRoles() {
    return organizationRepo.getRoles();
}

function createRole(input: CreateRoleInput): CreateRoleResult {
    const errors: { firstName?: string; role?: string } = {};

    const firstName = input.firstName.trim();
    const lastName = input.lastName.trim();
    const roleName = input.role.trim();

    if (firstName.length < 3) {
        errors.firstName = 'First name must be at least 3 characters.';
    }

    if (!roleName) {
        errors.role = 'Role is required.';
    }

    const roleExists = organizationRepo
        .getRoles()
        .some(role => role.role.toLowerCase() === roleName.toLowerCase());

    if (roleExists) {
        errors.role = 'Role is already occupied.';
    }

    if (errors.firstName || errors.role) {
        return {
            success: false,
            errors
        };
    }

    const roleRecord = organizationRepo.createRole({
        firstName,
        lastName,
        role: roleName
    });

    return {
        success: true,
        roleRecord
    };
}

export const organizationService = {
    getRoles,
    createRole
};
