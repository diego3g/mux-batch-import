require('dotenv/config')

import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

import { mux } from './services/mux';

const QUEUE_LENGTH = Number(process.argv[2])

const isQueueLengthInvalid = isNaN(QUEUE_LENGTH)

if (!QUEUE_LENGTH) throw new Error('Videos quantity must be provided')

if (isQueueLengthInvalid) throw new Error('Queue length must be a number')

const TIMES_TO_RUN = Math.ceil(QUEUE_LENGTH / 100)

let times_ran = 0

const outStream = fs.createWriteStream(path.join(__dirname, '..', 'data', 'export.csv'), {
  flags: 'a',
});

async function getPlaybackIds(page: number) {
  const assets = await mux.Video.Assets.list({
    limit: 100,
    page, 
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

  times_ran++

  if (times_ran < TIMES_TO_RUN) {
    getPlaybackIds(times_ran + 1)
  }
}

getPlaybackIds(1)