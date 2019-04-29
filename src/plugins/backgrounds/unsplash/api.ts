import { UNSPLASH_API_KEY } from './constants';
import { Image, Settings } from './interfaces';

export const getImage = async function (
  settings: Settings,
  pushCallback: Function,
  popCallback: Function,
): Promise<Image> {
  // Setup
  const headers = new Headers();
  headers.append('Authorization', `Client-ID ${UNSPLASH_API_KEY}`);

  // Build search url
  let url = 'https://api.unsplash.com/photos/random?';
  url += 'orientation=landscape'
        + (`&query=animals`);

  // Fetch from API
  pushCallback();
  const res = await (await fetch(url, { headers })).json();
  const data = await (await fetch(res.urls.raw + '?q=85&w=1920')).blob();
  popCallback();

  return {
    data,
    image_link: res.links.html,
    location_title: res.location ? res.location.title : null,
    user_name: res.user.name,
    user_link: res.user.links.html,
  };
};
