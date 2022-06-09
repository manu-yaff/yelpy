import styles from './Input.module.scss';
import { InputProps } from '../../types/InputProps';

const Input = (props: InputProps) => {
	return (
		<input
			className={`
				${styles['input']} ${props.roundedRight ?
					styles['input--right-rounded']: styles['input--left-rounded']}`
			}
			type="text"
			placeholder={props.placeholder} />
	)
}

export default Input;
