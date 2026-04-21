import Organization from '../Components/Organization/Organization';
import OrganizationForm from '../Components/OrganizationForm/OrganizationForm';
import { useRolesQuery } from '../queries/organizationQueries';

function OrganizationPage() {
    const rolesQuery = useRolesQuery();

    const roles = rolesQuery.data ?? [];
    const isLoading = rolesQuery.isLoading;
    const hasError = Boolean(rolesQuery.error);

    return (
        <>
            {isLoading && <p>Loading organization...</p>}
            {!isLoading && hasError && <p className="error">Could not load organization roles.</p>}
            <OrganizationForm />
            <Organization roles={roles} />
        </>
    );
}

export default OrganizationPage;
