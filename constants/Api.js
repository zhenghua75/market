import { Constants } from 'expo';

export default getApiUrl = (para) => {
    const { manifest } = Constants;
    let api = Object.assign({}, manifest.extra.api);
    Object.assign(api,para);
    let url = manifest.extra.apiServer+'?'+Object.keys(api).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(api[k])}`).join('&');
    return url;
  };