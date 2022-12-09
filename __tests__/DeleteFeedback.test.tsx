import createFeedback from '@pages/create-feedback/api';
import deleteFeedback from '@pages/edit-feedback/api/deleteFeedback';
import fetchFeedback from 'hooks/useFeedback/api/fetchFeedback';
import { FeedbackCategory } from 'types/feedback';

describe('DeleteFeedback', () => {
	it('should successfully delete a feedback', async () => {
		const testFeedbackRef = await createFeedback({
			category: FeedbackCategory.bug,
			title: 'Test',
			details: 'details...',
		});
		await deleteFeedback(testFeedbackRef.id);
		const testFeedback = await fetchFeedback(testFeedbackRef.id);
		expect(testFeedback).toBeNull();
	});
});
