import test from 'ava';
import got, { type Method, type ResponseType } from 'got';
import path from 'path';
import { FormData as FormDataNode } from 'formdata-node';
import { fileFromPath } from 'formdata-node/file-from-path';
import { BASE_URL } from './config/';
import { getAuthorizationToken } from './utils';
// @todo using data response type
// import { PublicFile } from './models';

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
  const fullPath = path.resolve(
    'test/fixtures/thumb-lorem-face-3842_thumb.jpg',
  );
  const form = new FormDataNode();
  form.set('file', await fileFromPath(fullPath, { type: 'image/png' }));
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
