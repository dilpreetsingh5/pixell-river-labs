import { useOrganizationForm } from '../../hooks/useOrganizationForm';
import './OrganizationForm.css';

interface Props {
    onRoleCreated: () => void;
}

function OrganizationForm({ onRoleCreated }: Props) {
    const {
        firstNameInput,
        lastNameInput,
        roleInput,
        formError,
        handleSubmit
    } = useOrganizationForm({ onRoleCreated });

    return (
        <section className="organization-form">
            <h2>Add Organization Role</h2>

            {formError && <p className="error">{formError}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="organizationFirstName">First Name:</label>
                <input
                    type="text"
                    id="organizationFirstName"
                    value={firstNameInput.value}
                    onChange={firstNameInput.handleChange}
                />
                {firstNameInput.error && <p className="error">{firstNameInput.error}</p>}

                <label htmlFor="organizationLastName">Last Name:</label>
                <input
                    type="text"
                    id="organizationLastName"
                    value={lastNameInput.value}
                    onChange={lastNameInput.handleChange}
                />

                <label htmlFor="organizationRole">Role:</label>
                <input
                    type="text"
                    id="organizationRole"
                    value={roleInput.value}
                    onChange={roleInput.handleChange}
                />
                {roleInput.error && <p className="error">{roleInput.error}</p>}

                <button type="submit">Add Role</button>
            </form>
        </section>
    );
}

export default OrganizationForm;
