import * as React from "react";
import * as ReactDOM from "react-dom";
import detectEthereumProvider from '@metamask/detect-provider';

import "./index.scss";
import { KryptoApezApp } from "./components/KryptoApezApp";
import { Factory } from "./Factory";
import { EthereumProvider } from "hardhat/types";
import { GreeterApp } from "./components/GreeterApp";
import { BasicTokenApp } from "./components/BasicTokenApp";
import { KryptoKittiesApp } from "./apps/kriptoKitties/KryptoKittiesApp";

function render(){
	ReactDOM.render(<KryptoKittiesApp/>, document.getElementById('root'))
}

function start(){
	Factory.setProvider(window.ethereum as EthereumProvider);
	Factory.getWalletService().requestAccounts().subscribe({ next: render, error: console.error });
}

start();