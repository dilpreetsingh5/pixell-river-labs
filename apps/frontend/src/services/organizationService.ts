import { organizationRepo } from '../repositories/organizationRepo';
import type { CreateRoleInput, Role } from '../../../../shared/types/Role';

interface CreateRoleResult {
    success: boolean;
    roleRecord?: Role;
    errors?: {
        firstName?: string;
        role?: string;
    };
}

async function getRoles(): Promise<Role[]> {
    return organizationRepo.getRoles();
}

async function createRole(input: CreateRoleInput): Promise<CreateRoleResult> {
    const firstName = input.firstName.trim();
    const lastName = input.lastName.trim();
    const roleName = input.role.trim();

    if (firstName.length < 3) {
        return {
            success: false,
            errors: { firstName: 'First name must be at least 3 characters.' }
        };
    }

    if (!roleName) {
        return {
            success: false,
            errors: { role: 'Role is required.' }
        };
    }

    const result = await organizationRepo.createRole({
        firstName,
        lastName,
        role: roleName
    });

    return result;
}

export const organizationService = {
    getRoles,
    createRole
};
