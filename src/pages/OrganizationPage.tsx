import Organization from '../Components/Organization/Organization';
import OrganizationForm from '../Components/OrganizationForm/OrganizationForm';
import type { Role } from '../types/Role';

interface Props {
    roles: Role[];
    onRoleCreated: () => void;
}

function OrganizationPage({ roles, onRoleCreated }: Props) {
    return (
        <>
            <OrganizationForm onRoleCreated={onRoleCreated} />
            <Organization roles={roles} />
        </>
    );
}

export default OrganizationPage;
