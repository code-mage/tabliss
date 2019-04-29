import * as React from 'react';
import { ActionCreator, connect } from 'react-redux';
import Background from './Background';
import Homepage from './Homepage';
import Widgets from './Widgets';
import { Action, resetDashboard, toggleSettings } from '../../data';
import './Settings.sass';
const logo = require('./logo.svg');
const ESCAPE_KEY = 27;

interface Props {
  resetDashboard: ActionCreator<Action>;
  toggleSettings: ActionCreator<Action>;
}

class Settings extends React.PureComponent<Props> {
  componentWillMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  render() {
    return (
      <div className="Settings">
        <a onClick={this.props.toggleSettings} className="fullscreen" />

        <div className="plane">
          <h1><i dangerouslySetInnerHTML={{__html: logo}} /></h1>

          <Background />

          <Widgets />

          {process.env.BUILD_TARGET === 'firefox' && <Homepage />}

          <p><a onClick={this.reset}>Reset to default</a></p>
        </div>
      </div>
    );
  }

  private reset = () => {
    if (confirm('Are you sure you want to erase all your settings and reset to default?')) {
      this.props.resetDashboard();
    }
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === ESCAPE_KEY) {
      this.props.toggleSettings();
    }
  }
}

const mapDispatchToProps = { resetDashboard, toggleSettings };

export default connect(null, mapDispatchToProps)(Settings);
