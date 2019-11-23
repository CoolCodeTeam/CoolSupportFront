'use strict';

import Router from './scripts/Router';
import Fetch from "./modules/fetch";
const componentsStorage = new ComponentsStorage();
import {settings, responseStatuses, ROUTER, KEYWORDS} from './constants/config';
const {backend} = settings;
const {backendPort} = settings;
const {connection} = settings;

import './components/main.css';
import mainPageView from "./views/mainPageView";
import ComponentsStorage from "./entities/ComponentsStorage";

const application = document.getElementById('application');
const baseBlock = document.createElement('div');
baseBlock.className = 'main';
application.appendChild(baseBlock);
const router = new Router(application);
const FetchModule = new Fetch();
FetchModule.setUrl(`${connection}://${backend}${backendPort}`);

router.register(ROUTER.mainPage, mainPageView, KEYWORDS.mainPage);
router.register(ROUTER.chat, chatView, KEYWORDS.chat);
router.start();


export {router,  componentsStorage,  FetchModule};
