import styles from './Button.module.scss';
import { ButtonProps } from '../../types/ButtonProps';

const Button = ({ onClick, children }: ButtonProps) => {
	const handleClick = () => {
		onClick();
	};
	return (
		<>
			<button onClick={handleClick} type="button" className={styles['button']}>{children}</button>
		</>
	)
}

export default Button;
