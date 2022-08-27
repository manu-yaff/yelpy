import { FunctionComponent } from 'react';
import { Business } from '../../types/Buesiness';
import BusinessCard from '../BusinessCard/BusinessCard';

interface IProps {
	list: Business[];
}

const BusinessesList: FunctionComponent<IProps> = ({ list }) => {
	if (!list.length) return <h1>No results found</h1>;
	return (
		<>
			{list.map((business) => {
				return <BusinessCard key={business.id} business={business} />;
			})}
		</>
	);
};

export default BusinessesList;
