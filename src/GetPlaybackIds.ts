require('dotenv/config')

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

import { mux } from './services/mux';

const outStream = fs.createWriteStream(path.join(__dirname, '..', 'data', 'export.csv'), {
  flags: 'a',
});

async function getPlaybackIds() {
  const assets = await mux.Video.Assets.list({
    limit: 100,

    // Change this from 1 to N based on how many assets you have and rerun the script
    page: 1, 
  })

  console.log(chalk.green(`Importing ${assets.length} videos.`));

  assets.forEach(asset => {
    const passthrough = asset.passthrough;
    const playbackId = asset.playback_ids?.[0].id;

    if (!passthrough) {
      console.log(chalk.yellow(`Passthrough not found for: ${asset.id}`));
      return;
    }

    if (!playbackId) {
      console.log(chalk.yellow(`Playback ID not found for: ${asset.id}`));
      return;
    }

    outStream.write(`${[
      passthrough,
      playbackId,
      Math.floor(Number(asset.duration)),
    ].join(',')}\n`);
  })
}

getPlaybackIds()