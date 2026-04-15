import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '@clerk/react';
import { useFormInput } from './userFormInput';
import { organizationService } from '../services/organizationService';

interface UseOrganizationFormOptions {
    onRoleCreated: () => Promise<void>;
}

export function useOrganizationForm({ onRoleCreated }: UseOrganizationFormOptions) {
    const { getToken, isSignedIn } = useAuth();
    const firstNameInput = useFormInput('');
    const lastNameInput = useFormInput('');
    const roleInput = useFormInput('');
    const [formError, setFormError] = useState('');

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        setFormError('');

        const sessionToken = await getToken();
        if (!isSignedIn || !sessionToken) {
            setFormError('Please log in before creating an organization role.');
            return;
        }

        const firstNameIsValid = firstNameInput.validate(value => {
            if (value.trim().length < 3) {
                return 'First name must be at least 3 characters.';
            }
            return '';
        });

        if (!firstNameIsValid) {
            return;
        }

        const result = await organizationService.createRole({
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            role: roleInput.value
        }, sessionToken);

        if (!result.success) {
            if (result.errors?.firstName) {
                firstNameInput.setError(result.errors.firstName);
            }

            if (result.errors?.role) {
                roleInput.setError(result.errors.role);
            }

            if (!result.errors?.firstName && !result.errors?.role) {
                setFormError('Could not create organization role.');
            }

            return;
        }

        firstNameInput.reset();
        lastNameInput.reset();
        roleInput.reset();
        await onRoleCreated();
    }

    return {
        firstNameInput,
        lastNameInput,
        roleInput,
        formError,
        handleSubmit
    };
}
