import { organization as seedOrganization } from '../data/Organization';
import type { CreateRoleInput, Role } from '../types/Role';

let roleStore: Role[] = [...seedOrganization];

function getRoles() {
    return [...roleStore];
}

function createRole(input: CreateRoleInput) {
    const newRole: Role = {
        firstName: input.firstName,
        lastName: input.lastName,
        role: input.role
    };

    roleStore = [...roleStore, newRole];
    return newRole;
}

function updateRole(oldRoleName: string, updatedRole: Role) {
    roleStore = roleStore.map(role =>
        role.role === oldRoleName ? updatedRole : role
    );
}

function deleteRole(roleName: string) {
    roleStore = roleStore.filter(role => role.role !== roleName);
}

export const organizationRepo = {
    getRoles,
    createRole,
    updateRole,
    deleteRole
};
