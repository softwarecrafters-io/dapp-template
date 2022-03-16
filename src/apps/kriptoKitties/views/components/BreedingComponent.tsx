import React from 'react';
import { CatComponent } from './CatComponent';
import { ModalPortal } from './shared/Modal';
import { MyKittiesListComponent } from './MyKittiesComponent';

export const BreedingComponent = () => {
	return (
		<div>
			<div className={'container'}>
				<h1>Cats Breeding</h1>
				<div className={'breed-container'}>
					<div className="breed-box">
						<h3>Sire</h3>
						<h4>This kitty will be the Sire</h4>
						<img src={'https://swcrafters.fra1.cdn.digitaloceanspaces.com/Krypto/egg.png'} />
						<span>Select this cat as a sire</span>
					</div>
					<div className="breed-box">
						<h3>Dame</h3>
						<h4>This kitty will be preggers</h4>
						<img src={'https://swcrafters.fra1.cdn.digitaloceanspaces.com/Krypto/egg.png'} />
						<span>Select this cat as a dame</span>
					</div>
				</div>
				<button>Ok, give then some privacy</button>
				<ModalPortal isOpened={true}>
					<MyKittiesListComponent />
				</ModalPortal>
			</div>
		</div>
	);
};
