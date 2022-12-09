import addComment from '@pages/feedback/api/addComment';
import fetchFeedback from 'hooks/useFeedback/api/fetchFeedback';
import fetchFeedbacks from 'hooks/useFeedbacks/api/fetchFeedbacks';
import { auth } from 'lib/firebase';

describe('CreateComment', () => {
	it('should successfully create a comment', async () => {
		if (!auth.currentUser) return;
		const feedbacks = await fetchFeedbacks();
		await addComment({
			comment: {
				text: 'test',
				user: {
					fullName: 'test',
					photoUrl: '/images/anonymous1.jpg',
					uid: '123',
					username: 'johndoe',
				},
			},
			feedbackId: feedbacks[0].id,
		});
		const feedback = await fetchFeedback(feedbacks[0].id);
		expect(feedback.commentCount).toBeGreaterThan(feedbacks[0].commentCount);
	});
});
