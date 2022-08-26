import { FunctionComponent } from 'react';
import { Business } from '../../types/Buesiness';
import BusinessItem from '../BusinessItem/BusinessItem';

interface IProps {
	list: Business[];
}

const BusinessesList: FunctionComponent<IProps> = ({ list }) => {
	if (!list.length) return <h1>No results found</h1>;
	return (
		<>
			{list.map((business) => {
				return <BusinessItem key={business.id} business={business} />;
			})}
		</>
	);
};

export default BusinessesList;
