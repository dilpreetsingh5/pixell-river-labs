import { useState } from 'react';
import type { ChangeEvent } from 'react';

type Validator = (value: string) => string;

export function useFormInput(initialValue = '') {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState('');

    function handleChange(
        event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        setValue(event.target.value);

        if (error) {
            setError('');
        }
    }

    function validate(validator: Validator): boolean {
        const message = validator(value);
        setError(message);
        return message === '';
    }

    function reset() {
        setValue(initialValue);
        setError('');
    }

    return {
        value,
        error,
        handleChange,
        validate,
        reset,
        setValue,
        setError
    };
}
