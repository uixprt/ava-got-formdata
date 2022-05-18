import axios from 'axios';
import FormData from 'form-data';

import { File } from '../models';

export async function uploadPublicFileFromUrl(
  fileUrl: string,
  apiUrl: string,
  token: string,
): Promise<File> {
  try {
    const { data: stream } = await axios.get(fileUrl, {
      responseType: 'stream',
    });
    const form = new FormData();
    form.append('file', stream);
    const { data } = await axios.post(`${apiUrl}files/public`, form, {
      headers: {
        authorization: token,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(`un-handled error ${JSON.stringify(error, null, 2)}`);
  }
}
