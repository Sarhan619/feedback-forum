import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import ArrowDownIcon from '../../../assets/svgs/custom/ArrowDownIcon';
import commentsIconPath from '../../../assets/svgs/icon-comments.svg';
import { Badge } from '../../../components/styled-components/Badge';
import { Card } from '../../../components/styled-components/Card';
import { Flex } from '../../../components/styled-components/Flex';
import { gridStyles } from '../../../components/styled-components/Grid';
import WithUser from '../../../components/WithUser/WithUser';
import { Breakpoints } from '../../../constants/breakpoints';
import { routes } from '../../../constants/routes';
import { useAuth } from '../../../hooks/useAuth';
import { fetchFeedbackKey } from '../../../hooks/useFeedback/useFeedback';
import { fetchFeedbacksKey } from '../../../hooks/useFeedbacks/useFeedbacks';
import { Feedback } from '../../../types/feedback';
import toggleUpvote from './api';

interface Props {
	feedback: Feedback;
	mobileOnly?: boolean;
}

export default function FeedbackCard({ feedback, mobileOnly = false, ...props }: Props) {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const { title, upVotes, commentCount, category, details, id } = feedback;
	const upVoted = user?.uid ? upVotes[user?.uid] : false;

	const upVoteCount = useMemo(() => {
		return Object.keys(upVotes).length;
	}, [upVotes]);

	const { mutate: toggleUpvoteMutation, isLoading: togglingUpvote } = useMutation(
		'toggleUpvote',
		toggleUpvote,
		{
			onSuccess() {
				queryClient.invalidateQueries(fetchFeedbacksKey); // sync home page
				queryClient.invalidateQueries(fetchFeedbackKey); // sync feedback page
			},
		}
	);

	return (
		<Container className={mobileOnly ? 'mobile' : 'desktop'} {...props}>
			<Link href={`${routes.feedback}/${id}`} passHref>
				<Info>
					<Title>{title}</Title>
					<p>{details}</p>
					<Badge plain as={'div'}>
						{category}
					</Badge>
				</Info>
			</Link>

			<WithUser
				message='Sign in to Upvote a Feedback'
				onClick={() => toggleUpvoteMutation({ feedbackId: id })}
			>
				<Upvote $active={upVoted} disabled={togglingUpvote}>
					<StyledArrowIcon color={upVoted ? 'white' : 'blue'} />
					<h4>{upVoteCount}</h4>
				</Upvote>
			</WithUser>

			<Comments>
				<Image src={commentsIconPath} alt='' />
				<h4>{commentCount}</h4>
			</Comments>
		</Container>
	);
}

const Container = styled(Card)`
	display: grid;
	color: var(--gray);
	gap: 2rem 4rem;
	grid-template-columns: 1fr auto;
	padding-block: 2.5rem;

	&.desktop {
		@media ${Breakpoints.tabletUp} {
			grid-template-columns: auto 1fr auto;
		}
	}
`;

const Title = styled.h3`
	color: var(--blue-dark);
	transition: all 0.2s;
`;

const Info = styled.a`
	${gridStyles}
	grid-column: 1/-1;
	order: 1;
	justify-items: left;
	text-decoration: none;
	color: var(--gray);

	&:hover,
	&:focus {
		${Title} {
			color: var(--blue);
			.darkmode & {
				opacity: 0.8;
			}
		}
		outline-color: var(--blue);
	}

	&:focus {
		outline-offset: 7.5px;
	}

	.desktop & {
		@media ${Breakpoints.tabletUp} {
			order: 2;
			grid-column: unset;
		}
	}
`;

const StyledArrowIcon = styled(ArrowDownIcon)`
	transform: rotate(180deg);
`;

const Upvote = styled(Badge)`
	width: 5rem;
	color: var(--${(p) => (p.$active ? 'white' : 'blue-dark')});
	justify-items: center;
	gap: 0.8rem;
	padding: 1rem;
	display: flex;
	align-items: center;
	order: 2;
	justify-self: left;
	min-width: max-content;

	@media ${Breakpoints.tabletUp} {
		/* for mobile only prop. font size will increases on desktop so we add extra space */
		padding-inline: 1.2rem;
	}

	.desktop & {
		@media ${Breakpoints.tabletUp} {
			order: 1;
			align-self: flex-start;
			display: grid;
			padding: 1.5rem 1rem;
		}
	}
`;

const Comments = styled(Flex)`
	color: var(--blue-dark);
	order: 3;
`;
