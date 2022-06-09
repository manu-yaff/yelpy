import styles from './Input.module.scss';
import { InputProps } from '../../types/InputProps';

const Input = (props: InputProps) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.onChange(e);
	}
	return (
		<input
			onChange={handleChange}
			className={`
				${styles['input']} ${props.roundedRight ?
					styles['input--right-rounded']: styles['input--left-rounded']}`
			}
			type="text"
			placeholder={props.placeholder} />
	)
}

export default Input;
