import { FunctionComponent } from 'react';
import style from './Input.module.scss';

interface IProps {
	placeholder: string;
	icon: React.ReactNode;
	cornersStyle: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FunctionComponent<IProps> = ({
	placeholder,
	icon,
	cornersStyle,
	onChange,
}) => {
	return (
		<>
			<div className={`${style['input-container']} ${style[cornersStyle]}`}>
				{icon}
				<input
					type="text"
					placeholder={placeholder}
					className={`${style['input']}`}
					onChange={onChange}
				/>
			</div>
		</>
	);
};

export default Input;
