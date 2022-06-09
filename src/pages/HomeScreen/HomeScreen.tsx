import styles from './HomeScreen.module.scss';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';


const HomeScreen = () => {
	return (
		<>
			<div className={styles['main-container']}>
				<div className={styles['inputs-container']}>
					<Input placeholder="Search" roundedRight={false} />
					<Input placeholder="Location" roundedRight={true} />
				</div>
				<Button />
			</div>
		</>
	)
}

export default HomeScreen;
