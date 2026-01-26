import { useState } from 'react';
import type { Department } from '../../types/Department';
import * as React from "react";
import './EmployeeForm.css';

// Function to add employee, passed from parent
interface Props {
    departments: Department[];
    onAddEmployee: (
        firstName: string,
        lastName: string,
        departmentName: string
    ) => void;
}

function EmployeeForm({ departments, onAddEmployee }: Props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [department, setDepartment] = useState('');
    const [error, setError] = useState('');

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (firstName.trim().length < 3) {
            setError('First name must be at least 3 characters.');
            return;
        }

        if (!department) {
            setError('Please select a department.');
            return;
        }

        onAddEmployee(firstName, lastName, department);

        // Clear form after success
        setFirstName('');
        setLastName('');
        setDepartment('');
    };

    return (
        <section className="employee-form">
            <h2>Add New Employee</h2>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />

                <label htmlFor="lastName">Last Name (optional):</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />

                <label htmlFor="department">Department:</label>
                <select
                    id="department"
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                        <option key={dept.name} value={dept.name}>
                            {dept.name}
                        </option>
                    ))}
                </select>

                <button type="submit">Add Employee</button>
            </form>
        </section>
    );

}

export default EmployeeForm;
