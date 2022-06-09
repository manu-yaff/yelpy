import styles from './Button.module.scss';
import { ButtonProps } from '../../types/ButtonProps';

const Button = (props: ButtonProps) => {
	const handleClick = () => {
		props.onClick()
	};
	return (
		<>
			<button onClick={handleClick} type="button" className={styles['button']}>Search</button>
		</>
	)
}

export default Button;
