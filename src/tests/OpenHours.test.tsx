import OpenHours from '../components/OpenHours/OpenHours';
import { formatHour } from './utils';
import { testHours, testEmptyHours, renderComponent, weekday } from './utils';

describe('OpenHours component tests', () => {
	test('Open hours renders', () => {
		const component = renderComponent(<OpenHours hours={testHours} />).container;
		const elements = document.getElementsByClassName('open-hours-container__row')
		expect(elements).toHaveLength(7);
		for (const item of testHours[0].open) {
			expect(component).toHaveTextContent(weekday[item.day]);
			const formattedHour = `${formatHour(item.start)} - ${formatHour(item.end)}`;
			expect(component).toHaveTextContent(formattedHour);
		}
	});

	test('Open hours array is empty', () => {
		const component = renderComponent(<OpenHours hours={testEmptyHours} />).container;
		expect(component).toHaveTextContent('Open hours not available');
	});
});
