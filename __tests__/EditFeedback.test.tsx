import createFeedback from '@pages/create-feedback/api';
import updateFeedback from '@pages/edit-feedback/api/updateFeedback';
import fetchFeedback from 'hooks/useFeedback/api/fetchFeedback';
import { FeedbackCategory } from '../types/feedback';

describe('EditFeedback', () => {
	it('should successfully modify a feedback', async () => {
		const testFeedbackRef = await createFeedback({
			category: FeedbackCategory.bug,
			title: 'Test',
			details: 'details...',
		});
		const testFeedback = await fetchFeedback(testFeedbackRef.id);
		await updateFeedback({ ...testFeedback, title: 'updated' });
		const testFeedbackUpdated = await fetchFeedback(testFeedbackRef.id);
		expect(testFeedbackUpdated.title).toEqual('updated');
	});
});
