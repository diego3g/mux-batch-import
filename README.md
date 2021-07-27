# Mux batch import

Import a list of videos to Mux with ease.

## Setup

Copy `.env.example` to `.env` and fill the environment variables based on the Mux access token you got from Mux dashboard.

## Running the migration

1. Clone the repository and install dependencies using NPM or Yarn;
2. Fill video list data inside `data/videos.json`;
3. Run `yarn run-migration` or `npm run run-migration`;

All of the videos from `videos.json` will be uploaded directly to Mux without saving them to the disk.

This process is kinda slow but, if you have a good internet connection and hardware, you can increment the concurrency inside `src/lib/queue.ts` to migrate more videos in parallel.

## Getting the Playback ID list

If you're not using signed URLs, you'll need the playback ID to play the videos.

1. Open up the file `src/GetPlaybackIds.ts`;
2. At line 18 you'll be able to change the page every time you run this script (for now you have to manually set the page number so if you have 850 assets you'll have to run this script 9 times);
3. Run `yarn get-playback-ids` or `npm run get-playback-ids`;

The script will fill the `data/export.csv` file with the data including the original video ID from `data/videos.json`, the playback ID e the duration.

