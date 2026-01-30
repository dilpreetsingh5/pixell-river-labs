import Organization from '../Components/Organization/Organization';
import { organization } from '../data/Organization';

function OrganizationPage() {
    return <Organization roles={organization} />;
}

export default OrganizationPage;
