import request from "request";
import { mux } from "../services/mux";
import { QueueTask } from "./queue";

export async function worker({ videoId, url }: QueueTask) {
  const upload = await mux.Video.Uploads.create({
    cors_origin: '*', 
    new_asset_settings: {
      passthrough: videoId,
      playback_policy: 'public',
    }
  })

  const uploadId = upload.id;

  return await new Promise<string>((resolve, reject) => {
    request(url, { followAllRedirects: true })
      .on('complete', () => { 
        resolve(uploadId);
      })
      .on('error', (err) => { 
        reject(err);
      })  
      .pipe(request.put(upload.url))
  })
}