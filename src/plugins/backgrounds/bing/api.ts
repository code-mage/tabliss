import { BING_API_KEY } from './constants';
import { Image, Settings } from './interfaces';
import * as Search from 'azure-cognitiveservices-imagesearch';
import {CognitiveServicesCredentials} from 'ms-rest-azure';
const countryCodes: Coded[] = require('./countryCodes.json');

interface Coded {
  key: string;
}

export const getImage = async function (
  settings: Settings,
  pushCallback: Function,
  popCallback: Function,
): Promise<Image> {

  var apiKey = '';
  if (BING_API_KEY != undefined){
    apiKey = BING_API_KEY;
  }
  let credentials = new CognitiveServicesCredentials(apiKey);
  let imageSearchApiClient = new Search.ImageSearchClient(credentials);

  const sendQuery = async () => {
    var options = {
      freshness : 'Month',
      size: 'Wallpaper',
      imageType: 'Photo',
      countryCode: countryCodes[Math.floor(Math.random() * countryCodes.length)].key
    };
    return await imageSearchApiClient.imagesOperations.search('cute animals', options);
  };

  // Fetch from API
  pushCallback();

  let url = '';
  const res = await (await sendQuery());
  if (res != null && res.value != null) {
    let imageResult = res.value[Math.floor(Math.random() * res.value.length)];
    url = imageResult.contentUrl ? imageResult.contentUrl : '';
  }
  const data = await (await fetch(url)).blob();

  popCallback();

  return {
    data,
    image_link: url
  };
};
