import { useState } from 'react';
import type { FormEvent } from 'react';
import { useFormInput } from './userFormInput';
import { organizationService } from '../services/organizationService';

interface UseOrganizationFormOptions {
    onRoleCreated: () => void;
}

export function useOrganizationForm({ onRoleCreated }: UseOrganizationFormOptions) {
    const firstNameInput = useFormInput('');
    const lastNameInput = useFormInput('');
    const roleInput = useFormInput('');
    const [formError, setFormError] = useState('');

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        setFormError('');

        const firstNameIsValid = firstNameInput.validate(value => {
            if (value.trim().length < 3) {
                return 'First name must be at least 3 characters.';
            }
            return '';
        });

        if (!firstNameIsValid) {
            return;
        }

        const result = organizationService.createRole({
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            role: roleInput.value
        });

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
        onRoleCreated();
    }

    return {
        firstNameInput,
        lastNameInput,
        roleInput,
        formError,
        handleSubmit
    };
}
