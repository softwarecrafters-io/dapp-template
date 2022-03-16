import { useHistory, useLocation, useParams } from 'react-router';

export type NavigationService = {
	navigate: (route: string) => void;
	navigateExternal: (route: string) => void;

	reload: () => void;
};

export function navigationService(): NavigationService {
	const history = useHistory();

	const navigate = (route: string) => {
		history.push(route);
	};

	const navigateExternal = (url: string) => {
		location.assign(url);
	};

	const reload = () => {
		location.reload();
	};

	return {
		navigate,
		navigateExternal,
		reload,
	};
}
