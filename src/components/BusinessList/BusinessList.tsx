import { FunctionComponent } from 'react';
import { Business } from '../../types/Buesiness';
import BusinessCard from '../BusinessCard/BusinessCard';
import style from './BusinessList.module.scss';

interface IProps {
	list: Business[];
}

const BusinessesList: FunctionComponent<IProps> = ({ list }) => {
	if (!list.length) return <h1>No results found</h1>;
	return (
		<div className={style['business-list']}>
			{list.map((business) => {
				return <BusinessCard key={business.id} business={business} />;
			})}
		</div>
	);
};

export default BusinessesList;
