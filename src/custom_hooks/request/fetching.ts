import { PromiseFun, FetchConfig } from './types';

const fetching: PromiseFun = (url: string, config: FetchConfig = {}) => {
  return new Promise((resolve, reject) => {
    fetch(url, config)
      .then(res => {
        console.log(res);
        return res.text();
      })
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};

export default fetching;
