import test from 'ava';
import got from 'got';
import type { Method, ResponseType } from 'got';
import path from 'path';
import { FormData as FormDataNode } from 'formdata-node';
import { fileFromPath } from 'formdata-node/file-from-path';
import { BASE_URL } from './config/';
import { getAuthorizationToken, downloadFile } from './utils';

test.only('public file upload', async (t) => {
  const expectKeys = [
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
  ];
  const jwt = await getAuthorizationToken();
  const fullPath = path.resolve('test/loremface/');
  const imageName = `thumb-lorem-face-${Math.floor(
    Math.random() * 6796,
  )}_thumb.jpg`;
  const imageUrl = `https://faces-img.xcdn.link/${imageName}`;

  const imagePath = await downloadFile(imageUrl, fullPath);
  console.log({imagePath});
  const form = new FormDataNode();
  form.set('file', await fileFromPath(imagePath, { type: 'image/jpeg' }));
  const reqOptions = {
    method: 'POST' as Method,
    body: form,
    url: `${BASE_URL}files/public`,
    headers: {
      authorization: jwt,
    },
    responseType: 'json' as ResponseType,
  };
  const { body, statusCode } = await got(reqOptions);
  console.log('response', { body, statusCode });

  t.deepEqual(Object.keys(body as any), expectKeys);
  t.is(statusCode, 201);
});
