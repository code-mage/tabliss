import * as React from 'react';
import { defaultProps } from './constants';
import { Settings } from './interfaces';

interface Props extends Settings {
  onChange: (settings: Partial<Settings>) => void;
}

class UnsplashSettings extends React.PureComponent<Props> {
  static defaultProps = defaultProps;

  render() {
    return (
      <div className="UnsplashSettings">
        <label>
          Show a new photo
          <select
            value={this.props.timeout}
            onChange={event => this.props.onChange({ timeout: parseInt(event.target.value, 10) })}
          >
            <option value="0">Every new tab</option>
            <option value="900">Every 15 minutes</option>
            <option value="3600">Every hour</option>
            <option value="86400">Every day</option>
            <option value={Number.MAX_SAFE_INTEGER}>Pause</option>
          </select>
        </label>

        <label>
          Blur <br />
          <input
            type="range"
            min="0"
            max="50"
            step="5"
            value={typeof this.props.blur === 'boolean' ? 0 : this.props.blur}
            onChange={event => this.props.onChange({ blur: Number(event.target.value) })}
          />
        </label>

        <label>
          Darken <br />
          <input
            type="range"
            min="0"
            max="100"
            step="10"
            value={typeof this.props.darken === 'boolean' ? 0 : this.props.darken}
            onChange={event => this.props.onChange({ darken: Number(event.target.value) })}
          />
        </label>
      </div>
    );
  }
}

export default UnsplashSettings;
