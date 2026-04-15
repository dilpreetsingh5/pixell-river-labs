import type { CreateRoleInput, Role } from '../../../../shared/types/Role';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001/api/v1';

function createAuthHeaders(sessionToken?: string): HeadersInit {
    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    };

    if (sessionToken) {
        headers.Authorization = `Bearer ${sessionToken}`;
    }

    return headers;
}

async function getRoles(): Promise<Role[]> {
    const response = await fetch(`${API_BASE_URL}/roles`);
    if (!response.ok) {
        throw new Error('Failed to fetch roles');
    }
    return response.json();
}

async function createRole(input: CreateRoleInput, sessionToken: string) {
    const response = await fetch(`${API_BASE_URL}/roles`, {
        method: 'POST',
        headers: createAuthHeaders(sessionToken),
        body: JSON.stringify(input)
    });

    return response.json();
}

export const organizationRepo = {
    getRoles,
    createRole
};
