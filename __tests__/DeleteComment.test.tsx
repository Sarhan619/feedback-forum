import deleteComment from '@pages/feedback/api/deleteComment';
import fetchFeedback from 'hooks/useFeedback/api/fetchFeedback';
import { fetchFeedbackComments } from 'hooks/useFeedbackComments/api/fetchFeedbackComments';
import fetchFeedbacks from 'hooks/useFeedbacks/api/fetchFeedbacks';
import { auth } from 'lib/firebase';

describe('DeleteComment', () => {
	it('should successfully delete a comment', async () => {
		if (!auth.currentUser) return;
		const feedbacks = await fetchFeedbacks();
		const comments = await fetchFeedbackComments(feedbacks[0].id);
		await deleteComment({ commentId: comments[0].id, feedbackId: feedbacks[0].id });
		const feedback = await fetchFeedback(feedbacks[0].id);
		expect(feedback.commentCount).toBeLessThan(feedbacks[0].commentCount);
	});
});
