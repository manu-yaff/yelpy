import {
  OpeningDayHours,
  formatHour,
  getFormattedHoursForDay,
  getTimePeriod,
  groupHoursByDay,
} from '../../components/DayHour.js';
import { getByText } from '@testing-library/dom';
import { hoursSampleResponse } from '../mocks/hoursResponse.js';

describe('DayHour', () => {
  describe('render', () => {
    it('should show weekday and hours', () => {
      const container = document.createElement('div');
      const openingDayHours = {
        weekday: 'Monday',
        hours: ['9:00 - 2:00pm', '4:00 - 6:00pm'],
      };

      const dayHour = OpeningDayHours(openingDayHours);

      getByText(dayHour.render(container), openingDayHours.weekday);
      getByText(dayHour.render(container), openingDayHours.hours);
    });
  });

  describe('getTimePeriod', () => {
    const testCases = [
      ['1', 'am'],
      ['12', 'pm'],
      ['13', 'pm'],
      ['23', 'pm'],
    ];

    testCases.forEach((testCase) => {
      it(`should return time period ${testCase[1]} for hour ${testCase[0]}`, () => {
        expect(getTimePeriod(testCase[0])).toBe(testCase[1]);
      });
    });
  });

  describe('formatHour', () => {
    const testCases = [
      ['0830', '8:30 am'],
      ['1200', '12:00 pm'],
      ['2330', '23:30 pm'],
      ['2305', '23:05 pm'],
    ];

    testCases.forEach((testCase) => {
      it(`should return formatted hour ${testCase[1]} for hour ${testCase[0]}`, () => {
        expect(formatHour(testCase[0])).toBe(testCase[1]);
      });
    });
  });

  describe('getFormattedHoursForDay', () => {
    const testCases = [
      [
        [
          'Monday',
          [
            { start: '0830', end: '1400' },
            { start: '1600', end: '2000' },
          ],
        ],
        ['Monday', '8:30 am - 14:00 pm', '16:00 pm - 20:00 pm'],
      ],
      [
        ['Tuesday', [{ start: '0900', end: '0200' }]],
        ['Tuesday', '9:00 am - 2:00 am'],
      ],
    ];

    testCases.forEach((testCase) => {
      it(`should return formatted hours ${JSON.stringify(testCase[1])} for ${JSON.stringify(
        testCase[0]
      )}`, () => {
        expect(getFormattedHoursForDay(testCase[0])).toEqual(testCase[1]);
      });
    });
  });

  describe('groupHoursByDay', () => {
    const expectedResult = {
      Monday: [
        {
          end: '1800',
          start: '0900',
          day: 0,
        },
        {
          end: '2000',
          start: '2300',
          day: 0,
        },
      ],
      Wednesday: [
        {
          end: '1800',
          start: '0900',
          day: 2,
        },
      ],
      Thursday: [
        {
          end: '1800',
          start: '0900',
          day: 3,
        },
      ],
    };

    const result = groupHoursByDay(hoursSampleResponse);

    expect(result).toEqual(expectedResult);
  });
});
