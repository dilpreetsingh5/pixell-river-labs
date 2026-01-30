import type { Role } from '../../types/Role';
import './Organization.css';

interface Props {
    roles: Role[];
}

function Organization({ roles }: Props) {
    return (
        <section className="organization">
            <h2>Leadership & Management</h2>
            <div className="organization-header">
                <span className="name">Name</span>
                <span className="role">Role</span>
            </div>
            <ul className="role-list">
                {roles.map((person, index) => (
                    <li key={index} className="role-item">
            <span>
              {person.firstName} {person.lastName}
            </span>
                        <span className="role-title">{person.role}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Organization;
