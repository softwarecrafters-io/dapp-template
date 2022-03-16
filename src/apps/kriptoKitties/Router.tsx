import { Route, Switch } from 'react-router';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './Routes';
import { MyKittiesComponent } from './views/components/MyKittiesComponent';
import { KittiesFactoryComponent } from './views/components/KittiesFactoryComponent';
import { Layout } from './views/components/Layout';
import { BreedingComponent } from './views/components/BreedingComponent';

export function Router() {
	return (
		<BrowserRouter>
			<Switch>
				<Route
					exact
					path={Routes.kittiesFactory}
					children={
						<Layout>
							<KittiesFactoryComponent />
						</Layout>
					}
				/>
				,
				<Route
					exact
					path={Routes.myKitties}
					children={
						<Layout>
							<MyKittiesComponent />
						</Layout>
					}
				/>
				,
				<Route
					exact
					path={Routes.breading}
					children={
						<Layout>
							<BreedingComponent />
						</Layout>
					}
				/>
			</Switch>
		</BrowserRouter>
	);
}
