import './server/index.js';
import './scraper/index.js';
import './tokenRefresher/tokenRefresher.js';
import { createDataFile } from './database/initialise.js';
import dotenv from 'dotenv';

createDataFile();
dotenv.config();
