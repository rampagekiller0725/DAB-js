import fetch from 'cross-fetch';
import { IC_URL_HOST } from '../constants/urls';

let use_ic_url = false;

/* eslint-disable no-param-reassign */
const wrappedFetchInternal = (resolve, reject, resource, ...initArgs): void => {
  if (use_ic_url) {
    resource = new URL(resource);
    resource.host = IC_URL_HOST;
  }
  fetch(resource, ...initArgs)
    .then(r => {
      if (!use_ic_url && r.headers['x-unavailable']) {
        use_ic_url = true;
        wrappedFetchInternal(resolve, reject, resource, ...initArgs);
        return;
      }
      resolve(r);
    })
    .catch(e => {
      reject(e);
    });
};

export const wrappedFetch = (
  ...args: Parameters<typeof fetch>
): Promise<Response> => {
  let reject;
  let resolve;

  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });

  wrappedFetchInternal(resolve, reject, ...args);

  return promise as Promise<Response>;
};