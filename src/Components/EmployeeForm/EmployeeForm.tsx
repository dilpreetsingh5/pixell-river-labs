import { useState } from 'react';
import * as React from 'react';
import { useFormInput } from '../../hooks/userFormInput';
import { employeeService} from '../../services/employeeService';
import './EmployeeForm.css';

interface Props {
    departments: string[];
    onEmployeeCreated: () => void;
}

function EmployeeForm({ departments, onEmployeeCreated }: Props) {
    const firstNameInput = useFormInput('');
    const lastNameInput = useFormInput('');
    const departmentInput = useFormInput('');
    const [formError, setFormError] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
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

        const result = employeeService.createEmployee({
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            departmentName: departmentInput.value
        });

        if (!result.success) {
            if (result.errors?.department) {
                departmentInput.setError(result.errors.department);
            }
            if (result.errors?.firstName) {
                firstNameInput.setError(result.errors.firstName);
            }
            if (!result.errors?.department && !result.errors?.firstName) {
                setFormError('Could not create employee.');
            }
            return;
        }

        firstNameInput.reset();
        lastNameInput.reset();
        departmentInput.reset();
        onEmployeeCreated();
    };

    return (
        <section className="employee-form">
            <h2>Add New Employee</h2>

            {formError && <p className="error">{formError}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstNameInput.value}
                    onChange={firstNameInput.handleChange}
                />
                {firstNameInput.error && <p className="error">{firstNameInput.error}</p>}

                <label htmlFor="lastName">Last Name (optional):</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastNameInput.value}
                    onChange={lastNameInput.handleChange}
                />

                <label htmlFor="department">Department:</label>
                <select
                    id="department"
                    value={departmentInput.value}
                    onChange={departmentInput.handleChange}
                >
                    <option value="">Select Department</option>
                    {departments.map(department => (
                        <option key={department} value={department}>
                            {department}
                        </option>
                    ))}
                </select>
                {departmentInput.error && <p className="error">{departmentInput.error}</p>}

                <button type="submit">Add Employee</button>
            </form>
        </section>
    );
}

export default EmployeeForm;
