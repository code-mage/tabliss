import { Type } from '../interfaces';
import { registerPlugin } from '../registry';
import { Image, ImageSettings } from './image';
import { Unsplash, UnsplashSettings } from './unsplash';
import { Bing, BingSettings } from './bing';

registerPlugin({
  key: 'core/backgrounds/image',
  type: Type.BACKGROUND,
  title: 'Upload Images',
  Dashboard: Image,
  Settings: ImageSettings,
});

registerPlugin({
  key: 'extra/backgrounds/unsplash',
  type: Type.BACKGROUND,
  title: 'Unsplash',
  Dashboard: Unsplash,
  Settings: UnsplashSettings,
});

registerPlugin({
  key: 'extra/backgrounds/bing',
  type: Type.BACKGROUND,
  title: 'Bing',
  Dashboard: Bing,
  Settings: BingSettings,
});
