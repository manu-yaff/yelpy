import styles from './HomeScreen.module.scss';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import CardsList from '../../components/CardsList/CardsList';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_QUERY } from '../../graphql/queries';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, State } from '../../store'
import { bindActionCreators } from 'redux';

const HomeScreen = () => {
	const dispatch = useDispatch()

	const { deposit, withdraw, visitBusiness } = bindActionCreators(actionCreators, dispatch)
	const amount = useSelector((state: State) => state.bank);
	const businessList = useSelector((state: State) => state.visitBusiness);

	const [term, setTerm] = useState<string | undefined>();
	const [location, setLocation] = useState<string | undefined>();

	const [getSearch, { loading, error, data }] = useLazyQuery(SEARCH_QUERY, {
		variables: {
			term: term,
			location: location,
			limit: 10
		}
	});

	const handleClick = () => {
		console.log('click recibido');
		console.log(businessList);
		// getSearch();
		// meter al state

	};

	const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTerm(e.target.value);
	}

	const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocation(e.target.value);
	}


	if(loading) {
		return <p>Loading</p>
	}

	if (error) {
		return <p>Error</p>
	}


	return (
		<>
			this is the state: {amount}
			<div className={styles['main-container']}>
				<div className={styles['inputs-container']}>
					<Input onChange = {handleTermChange} placeholder="Search" roundedRight={false} />
					<Input onChange = {handleLocationChange} placeholder="Location" roundedRight={true} />
				</div>
				<Button onClick={handleClick} />
				<CardsList businesses={businessList} />
			</div>
		</>
	)
}

export default HomeScreen;
