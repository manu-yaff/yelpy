import { FunctionComponent } from 'react';
import style from './Button.module.scss';

interface IProps {
	handleClick: () => void;
	children: React.ReactNode;
}

const Button: FunctionComponent<IProps> = ({ children, handleClick }) => {
	return (
		<button type="button" className={style['button']} onClick={handleClick}>
			{children}
		</button>
	);
};

export default Button;
