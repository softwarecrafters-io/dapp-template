import * as React from 'react';
import * as ReactDOM from 'react-dom';
import detectEthereumProvider from '@metamask/detect-provider';

import './index.scss';
import { KryptoApezApp } from './components/KryptoApezApp';
import { Factory } from './Factory';
import { EthereumProvider } from 'hardhat/types';
import { GreeterApp } from './components/GreeterApp';
import { BasicTokenApp } from './components/BasicTokenApp';
import { KittiesFactoryComponent } from './apps/kriptoKitties/views/components/KittiesFactoryComponent';
import { Router } from './apps/kriptoKitties/Router';

function render() {
	ReactDOM.render(<Router />, document.getElementById('root'));
}

function start() {
	Factory.setBrowserProvider(window.ethereum as EthereumProvider);
	Factory.getWalletService().requestAccounts().subscribe({ next: render, error: console.error });
}

start();
