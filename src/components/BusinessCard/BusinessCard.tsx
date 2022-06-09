import styles from './BusinessCard.module.scss';

const BusinessCard = () => {
	return (
		<div className={styles['card']}>
			<img src="https://placeimg.com/360/230/any" alt="" />
			<div className={styles['flex-container']}>
				<h2>Tacos Pampas Zaragoza</h2>
				<p>icon</p>
			</div>
			<p className={styles['card__location']}>Location</p>
			<div className={styles['flex-container']}>
				<p>800 reviews</p>
				<p>4651075213</p>
			</div>
		</div>
	)
}

export default BusinessCard;
