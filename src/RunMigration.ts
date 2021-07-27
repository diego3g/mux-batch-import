require('dotenv/config');

import chalk from 'chalk';
import { queue } from './lib/queue';

import videos from '../data/videos.json';

async function populateQueue() {
  Object.entries(videos).forEach(async ([id, downloadUrl]) => {
    queue
      .push({ videoId: id, url: downloadUrl })
      .then((uploadId) => {
        console.log(chalk.green(`Uploaded: ${id} (Upload ID: ${uploadId})`));
      })
      .catch((err) => {
        console.log(chalk.red(`Error on video: ${id}`), err);
      });
  })
};

populateQueue();