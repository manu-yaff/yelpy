import styles from './Toast.module.scss';
import { ToastProps } from '../../types/ToastProps';

const Toast = (props: ToastProps) =>{
	return (
		<div className={styles['toast']}>
			<p style={{ backgroundColor: props.backgroundColor, color: props.textColor }}>
				{props.content}
			</p>
		</div>
	)
}

export default Toast;
