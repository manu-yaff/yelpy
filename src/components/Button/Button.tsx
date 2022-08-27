import { FunctionComponent } from 'react';
import style from './Button.module.scss';

interface IProps {
	handleClick?: () => void;
  type: "button" | "submit";
	children: React.ReactNode;
}

const Button: FunctionComponent<IProps> = ({ children, handleClick, type }) => {
	return (
		<button type={type} className={style['button']} onClick={handleClick}>
			{children}
		</button>
	);
};

export default Button;
