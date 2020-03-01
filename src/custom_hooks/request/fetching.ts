async function fetching(url: string, config?: Object): Promise<any> {
  return new Promise((resolve, reject) => {
    fetch(url, config)
      .then(res => res.json())
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
}

export default fetching;
