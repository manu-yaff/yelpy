import { FunctionComponent } from 'react';
import style from './Button.module.scss';

interface IProps {
	onClick: () => void;
	children: React.ReactNode;
}

const Button: FunctionComponent<IProps> = ({ children, onClick }) => {
	const handleClick = () => {
		onClick();
	};

	return (
		<button type="button" className={style['button']} onClick={handleClick}>
			{children}
		</button>
	);
};

export default Button;
