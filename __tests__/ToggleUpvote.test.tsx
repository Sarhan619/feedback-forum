import toggleUpvote from '../home/components/FeedbackCard/api';
import fetchFeedback from '../hooks/useFeedback/api/fetchFeedback';
import fetchFeedbacks from '../hooks/useFeedbacks/api/fetchFeedbacks';
import { auth } from '../lib/firebase';

describe('ToggleUpvote', () => {
	it('should successfully toggle the Upvote count of a feedback', async () => {
		const feedbacks = await fetchFeedbacks();
		await toggleUpvote({ feedbackId: feedbacks[0].id });
		const feedback = await fetchFeedback(feedbacks[0].id);
		auth.currentUser &&
			expect(feedback.upVotes[auth.currentUser?.uid]).not.toEqual(
				feedbacks[0].upVotes[auth.currentUser?.uid]
			);
	});
});
