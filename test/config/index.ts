import 'dotenv/config';

import process from 'process';

const BASE_URL = `${process.env.API_PROTOCOL}://${process.env.API_DOMAIN}/api/user/v3/`;
const USER = process.env.ADMIN_USERNAME;
const PASSWORD = process.env.ADMIN_PASSWORD;

export { BASE_URL, USER, PASSWORD };
