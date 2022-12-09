import createFeedback from '@pages/create-feedback/api';
import { getDoc } from 'firebase/firestore';
import fetchFeedbacks from '../hooks/useFeedbacks/api/fetchFeedbacks';
import { Feedback, FeedbackCategory } from '../types/feedback';

describe('GetFeedbacks', () => {
	it('should successfully return a list of feedbacks', async () => {
		const testFeedbackRef = await createFeedback({
			category: FeedbackCategory.bug,
			title: 'Test',
			details: 'details...',
		});
		const testFeedback = (await (await getDoc(testFeedbackRef)).data()) as Feedback;
		const feedbacks = await fetchFeedbacks();
		expect(feedbacks[0]).toEqual(testFeedback);
	});
});
