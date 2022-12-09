import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { auth, db } from '../lib/firebase';

// add role property to /users/{userID} document. And use that to conditionally render the status Dropdown when editing feedback.
// Also modify security rules to allow full edit in /feedback/{feedbackID} when the request.auth.uid corresponding user doc has a role of admin

interface Context {
	user: User | null;
	fullName: string;
	username: string;
	photoUrl: string;
	role: string;
}

const initialContextValue: Context = {
	user: null,
	fullName: '',
	username: '',
	photoUrl: '',
	role: '',
};

const AuthContext = createContext(initialContextValue);

interface Props {
	children: ReactNode;
}

export function AuthProvider({ children }: Props) {
	const [context, setContext] = useState(initialContextValue);
	const [authInitialized, setAuthInitialized] = useState(false);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const userRef = doc(db, `users/${user.uid}`);
				const extraInfo = (await getDoc(userRef)).data();
				setContext((context) => ({
					...context,
					user,
					...extraInfo,
				}));
			} else setContext(initialContextValue); // clears extra info on logout
			setAuthInitialized(true);
		});
		return unsubscribe;
	}, []);

	return (
		<AuthContext.Provider value={context}>
			{authInitialized ? children : null}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
