import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/index';
import { render } from '@testing-library/react';
import { Hour } from '../types/OpenHoursProps';
import { Review } from '../types/ReviewsProps';

// business card
export const testImage = "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
export const testBusinessListEmpty = [];
export const testBusinessList = [
	{
		id: "1",
		photos: testImage,
		name: "Google",
		location: {
			address1: "San Isidro 98",
			city: "San Francisco",
			country: "United States"
		},
		review_count: 1000,
		display_phone: "(332) 1098765",
	},
	{
		id: "2",
		photos: testImage,
		name: "Microsoft",
		location: {
			address1: "Mountain View",
			city: "San Francisco",
			country: "United States"
		},
		review_count: 3000,
		display_phone: "(332) 10987656",
	},
	{
		id: "3",
		photos: testImage,
		name: "Tacos",
		location: {
			address1: "Seattle",
			city: "Michigan",
			country: "United States"
		},
		review_count: 1200,
		display_phone: "(332) 1234567",
	}
];

// open hours
export const weekday: string[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
export const testHours: Hour[] = [
	{
		is_open_now: true,
		open: [
			{
				day: 0,
				start: "1000",
				end: "2200"
			},
			{
				day: 1,
				start: "1000",
				end: "2200"
			},
			{
				day: 2,
				start: "1000",
				end: "2200"
			},
			{
				day: 3,
				start: "1000",
				end: "2200"
			},
			{
				day: 4,
				start: "1000",
				end: "2200"
			},
			{
				day: 5,
				start: "1000",
				end: "2200"
			},
			{
				day: 6,
				start: "1000",
				end: "2200"
			}
		]
	}	
];
export const testEmptyHours: Hour[] = [
	{
		is_open_now: true,
		open: []
	}
]

// reviews
export const testReviews: Review[] = [
	{
		id: "1",
		rating: 5,
		text: "Tacos El Patron is THAT GIRL. \n\nThe veggie burrito was . That truly is my measure of how I rated this establishment. This tiny spade is pumping out some...",
		user: {
			name: "Jason W.",
			image_url: "https://s3-media1.fl.yelpcdn.com/photo/Z_t6kQmuXb0whM3z2XYlyw/o.jpg"
		}
	},
	{
		id: "2",
		rating: 4,
		text: "Don't you enjoy when you go somewhere and find something unique about it. \nCame here with bae we both were like yes to birria, it's a little pricey $5.25...",
		user: {
			name: "Jahmal P.",
			image_url: "https://s3-media2.fl.yelpcdn.com/photo/fn7QDGXHFJF68jWBA3wdkA/o.jpg"
		}
	}
];
export const testReviewsEmpty: Review[] = []

export const checkAm = (hour: number) => {
	if (hour > 12) return 'pm';
	return 'am'
};

export const formatHour = (hour: string) => {
	const [hours, min] = [hour.slice(0, 2), hour.slice(2)];
	return `${hours}:${min} ${checkAm(parseInt(hours))}`
};

export const renderComponent = (component: React.ReactNode) => {
	return render(<Provider store={store}>
			<BrowserRouter>
				{component}
			</BrowserRouter>
	</Provider>)
};