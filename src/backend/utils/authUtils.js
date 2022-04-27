import { Response } from 'miragejs';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export const requiresAuth = function (request) {
  const encodedToken = request.requestHeaders.authorization;
  const decodedToken = jwt_decode(
    encodedToken,
    process.env.REACT_APP_JWT_SECRET
  );
  if (decodedToken) {
    const user = this.db.users.findBy({ username: decodedToken.username });
    return user;
  }
  return new Response(
    401,
    {},
    { errors: ['The token is invalid. Unauthorized access error.'] }
  );
};

export const formatDate = () => dayjs('2022-02-01').fromNow();
