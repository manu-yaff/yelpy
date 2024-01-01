import { businessReducer } from '../store/reducer';

describe('Reducer tests', () => {
	test('reducer returns initial state', () => {
		const startAction = { type: '', payload: '' };
		const result = businessReducer(undefined, startAction);
		expect(result.visitedBusiness).toEqual([]);
	});
	test('reducer adds a business to visited list', () => {
		const result = businessReducer(
			{ visitedBusiness: [] },
			{
				type: 'BUSINESS_ADDED',
				payload: '1',
			}
		);
		expect(result.visitedBusiness).toHaveLength(1);
		expect(result.visitedBusiness[0]).toEqual('1');
	});
});
