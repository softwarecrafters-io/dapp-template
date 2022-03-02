import * as React from "react";
import * as ReactDOM from "react-dom";
import detectEthereumProvider from '@metamask/detect-provider';

import "./index.scss";
import { KryptoApezApp } from "./components/KryptoApezApp";
import { Factory } from "./Factory";
import { EthereumProvider } from "hardhat/types";

function render(){
	ReactDOM.render(<KryptoApezApp/>, document.getElementById('root'))
}

function start(){
	Factory.setProvider(window.ethereum as EthereumProvider);
	Factory.getMetamaskService().requestAccounts().subscribe({ next: render, error: console.error });
}

start();