import { BING_API_KEY } from './constants';
import get from 'lodash-es/get';
import { Image, Settings } from './interfaces';
import * as Search from 'azure-cognitiveservices-imagesearch';
import {CognitiveServicesCredentials} from 'ms-rest-azure';
const countryCodes: Coded[] = require('./countryCodes.json');
const searchTerms: Coded[] = require('./searchTerms.json');

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

  const abc = await fetch('https://drive.google.com/uc?id=19OOidqGbMoCCHJ6fEsyYNS5GqsmiaBdk');
  const body = await abc.json();

  if (abc.status === 200) {
    var a = get(body, 'key');
    if (a != null){
      apiKey = a;
    }
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
    var term = searchTerms[Math.floor(Math.random() * searchTerms.length)].key;
    return await imageSearchApiClient.imagesOperations.search(term, options);
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
