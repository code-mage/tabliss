import { Type } from '../interfaces';
import { registerPlugin } from '../registry';

import { Css, CssSettings } from './css';
import { Js, JsSettings } from './js';
import { Links, LinksSettings } from './links';
import { Quote, QuoteSettings } from './quote';
import { Time, TimeSettings } from './time';

registerPlugin({
  key: 'core/widgets/css',
  type: Type.WIDGET,
  title: 'Custom CSS',
  Dashboard: Css,
  Settings: CssSettings,
});

// Only available on the web version due to extension's CSP
if (process.env.BUILD_TARGET === 'web') {
  registerPlugin({
    key: 'widgets/js',
    type: Type.WIDGET,
    title: 'Custom JS',
    Dashboard: Js,
    Settings: JsSettings,
  });
}

registerPlugin({
  key: 'core/widgets/links',
  type: Type.WIDGET,
  title: 'Quick Links',
  Dashboard: Links,
  Settings: LinksSettings,
});

registerPlugin({
  key: 'extra/widgets/quote',
  type: Type.WIDGET,
  title: 'Daily Quotes',
  Dashboard: Quote,
  Settings: QuoteSettings,
});

registerPlugin({
  key: 'core/widgets/time',
  type: Type.WIDGET,
  title: 'Time',
  Dashboard: Time,
  Settings: TimeSettings,
});
