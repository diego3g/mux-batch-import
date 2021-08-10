import fastq, { queueAsPromised } from "fastq"
import { worker } from './worker'

const DEFAULT_CONCURRENCY = 1

const CONCURRENCY = Number(process.argv[2]) || DEFAULT_CONCURRENCY

const isConcurrencyInvalid = isNaN(CONCURRENCY)

if (isConcurrencyInvalid && CONCURRENCY) throw new Error('Queue concurrency must be a number')

export type QueueTask = {
  videoId: string;
  url: string;
}

export const queue: queueAsPromised<QueueTask> = fastq.promise(worker, CONCURRENCY)