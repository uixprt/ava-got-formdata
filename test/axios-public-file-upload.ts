import test from 'ava';
import axios from 'axios';
import FormData from 'form-data';
import { BASE_URL } from './config/';
import { getAuthorizationToken } from './utils';

test.only('public file upload', async (t) => {
  const jwt = await getAuthorizationToken();
  const imageName = `thumb-lorem-face-${Math.floor(
    Math.random() * 6796,
  )}_thumb.jpg`;
  const imageUrl = `https://faces-img.xcdn.link/${imageName}`;

  const { data: stream } = await axios.get(imageUrl, {
    responseType: 'stream',
  });
  
  const form = new FormData();
  form.append('file', stream);

  const { data } = await axios.post(`${BASE_URL}files/public`, form, {
    headers: {
      authorization: jwt,
    },
  });

  console.log(data);

  t.deepEqual(Object.keys(data as any), [
    'id',
    'name',
    'url',
    'resizeUrl',
    'type',
    'fileTypeId',
    'size',
    'isPrivate',
    'isPrivateResize',
    'filePath',
    'filePathResize',
    'bucketName',
  ]);
});
