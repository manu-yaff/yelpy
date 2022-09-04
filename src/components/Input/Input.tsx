import { FunctionComponent } from 'react';
import style from './Input.module.scss';

interface IProps {
	placeholder: string;
	icon: React.ReactNode;
	cornersStyle: 'left-rounded' | 'right-rounded';
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
			<div
				data-testid="input-container"
				className={`${style['input-container']} ${
					style[`input--${cornersStyle}`]
				}`}
			>
				{icon}
				<input
					type="text"
					placeholder={placeholder}
					className={`${style['input']}`}
					onChange={onChange}
					required
					data-testid="input"
				/>
			</div>
		</>
	);
};

export default Input;
