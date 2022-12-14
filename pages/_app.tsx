import { getTheme } from 'lib/redux/slices/ui';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Fragment, ReactNode, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import styled from 'styled-components';
import ProgressBar from '../components/ProgressBar';
import ProtectRoutes from '../components/ProtectRoutes';
import { contentStyles } from '../components/styled-components/Content';
import WithUserPopup from '../components/WithUser/WithUserPopup';
import { Breakpoints } from '../constants/breakpoints';
import { unProtectedRoutes } from '../constants/routes';
import { AuthProvider } from '../hooks/useAuth';
import { persistor, store } from '../lib/redux/store';
import '../styles/globals.css';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<QueryClientProvider client={queryClient}>
					<AuthProvider>
						<Wrapper>
							<Component {...pageProps} />
						</Wrapper>
					</AuthProvider>
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	);
}

interface WrapperProps {
	children: ReactNode;
}

function Wrapper({ children }: WrapperProps) {
	const theme = useSelector(getTheme);

	useEffect(() => {
		document.documentElement.className = theme;
	}, [theme]);

	return (
		<Fragment>
			<ReactQueryDevtools initialIsOpen={false} />

			<Head>
				<title>Feedback Forum</title>
				<link rel='icon' href='/favicon_.ico' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0'
				/>
			</Head>

			<ProgressBar />
			<WithUserPopup />

			<ProtectRoutes unProtectedRoutes={unProtectedRoutes}>
				<Layout>{children}</Layout>
			</ProtectRoutes>
		</Fragment>
	);
}

const Layout = styled.div`
	padding-block: var(--app-padding);

	@media ${Breakpoints.tabletUp} {
		${contentStyles}
	}
`;
