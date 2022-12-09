import createFeedback from '@pages/create-feedback/api';
import fetchFeedback from 'hooks/useFeedback/api/fetchFeedback';
import { FeedbackCategory } from 'types/feedback';

describe('CreateFeedback', () => {
	it('should successfully crate a feedback', async () => {
		const testFeedbackRef = await createFeedback({
			category: FeedbackCategory.bug,
			title: 'Test',
			details: 'details...',
		});
		const testFeedback = await fetchFeedback(testFeedbackRef.id);
		expect(testFeedback).not.toBeUndefined();
	});
});
