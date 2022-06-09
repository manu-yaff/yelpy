import styles from './HomeScreen.module.scss';
import Input from '../../components/Input/Input';

const HomeScreen = () => {
	return (
		<>
			<div className={styles['inputs-container']}>
				<Input placeholder="Search" roundedRight={false} />
				<Input placeholder="Location" roundedRight={true} />
			</div>
		</>
	)
}

export default HomeScreen;
