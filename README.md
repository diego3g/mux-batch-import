# Mux batch import

Import a list of videos to Mux with ease.

## Setup

Copy `.env.example` to `.env` and fill the environment variables based on the Mux access token you got from Mux dashboard.

## Running the migration

1. Clone the repository and install dependencies using NPM or Yarn;
2. Fill video list data inside `data/videos.json`;
3. Run `yarn run-migration` or `npm run run-migration`;

All of the videos from `videos.json` will be uploaded directly to Mux without saving them to the disk.

This process is kinda slow but, if you have a good internet connection and hardware, you can increment the concurrency passing as argv argument to migrate more videos in parallel, following the example below.

```sh
$ yarn run-migration 3
```

## Getting the Playback ID list

If you're not using signed URLs, you'll need the playback ID to play the videos.

The mux assets list are paginated so you'll need to provide the number of the assets you want to reach.

```sh
# if you want to get 500 videos playbacks id

$ yarn get-playback-ids 500
```

The script will fill the `data/export.csv` file with the data including the original video ID from `data/videos.json`, the playback ID e the duration.

