import { FunctionComponent } from 'react';
import style from './Toast.module.scss';

interface IProps {
	children?: React.ReactNode;
	toastType: 'success' | 'error';
}

const Toast: FunctionComponent<IProps> = ({ children, toastType }) => {
	return (
		<div
			data-testid="toast"
			className={`${style['toast']} ${style[`toast--${toastType}`]}`}
		>
			{children}
		</div>
	);
};
export default Toast;
