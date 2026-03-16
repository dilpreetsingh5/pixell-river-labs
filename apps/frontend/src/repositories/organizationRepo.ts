import type { CreateRoleInput, Role } from '../../../../shared/types/Role';

const API_BASE_URL = 'http://localhost:3001/api/v1';

async function getRoles(): Promise<Role[]> {
    const response = await fetch(`${API_BASE_URL}/roles`);
    if (!response.ok) {
        throw new Error('Failed to fetch roles');
    }
    return response.json();
}

async function createRole(input: CreateRoleInput) {
    const response = await fetch(`${API_BASE_URL}/roles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
    });

    return response.json();
}

export const organizationRepo = {
    getRoles,
    createRole
};
