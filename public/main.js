'use strict';

import Router from './scripts/Router';
import Fetch from "./modules/fetch";
import {settings, responseStatuses, ROUTER, KEYWORDS} from './constants/config';
const {backend} = settings;
const {backendPort} = settings;
const {connection} = settings;

import './components/main.css';
import mainPageView from "./views/mainPageView";

const application = document.getElementById('application');
const baseBlock = document.createElement('div');
baseBlock.className = 'main';
application.appendChild(baseBlock);
const router = new Router(application);
const FetchModule = new Fetch();
FetchModule.setUrl(`${connection}://${backend}${backendPort}`);

router.register(ROUTER.mainPage, mainPageView, KEYWORDS.mainPage);
router.start();

export {router, FetchModule};