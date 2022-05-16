import got from 'got';
import {pipeline} from 'node:stream/promises';
import {createWriteStream} from 'node:fs';

export async function downloadFile(url: string, dest: string): Promise<string> {
  const readStream = await got.stream(url);
  
  await pipeline(
    readStream,
    createWriteStream(`${dest}${readStream?.requestUrl?.pathname}`),
  );
  
  return `${dest}${readStream?.requestUrl?.pathname}`;
}
