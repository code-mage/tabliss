import get from 'lodash-es/get';
import * as React from 'react';
import { ActionCreator, connect } from 'react-redux';
import { Action, popPending, pushPending } from '../../../data';
require('./Quote.sass');

interface Props {
  local?: Data;
  popPending: ActionCreator<Action>;
  pushPending: ActionCreator<Action>;
  setLocal: (state: Data) => void;
}

interface Data {
  date: number;
  timestamp: number;
  quote: string;
  quoteBottom: string;
}

class Quote extends React.PureComponent<Props> {
  componentWillMount() {
      this.getQuote().then(quote => this.props.setLocal(quote));
  }

  componentWillReceiveProps(props: Props) {
    this.getQuote().then(quote => this.props.setLocal(quote));
  }

  render() {
    return (
      <div>
      <h4 className="Quote">
        {get(this.props, 'local.quote')}
      </h4>
      <div className="QuoteBottom">
        {get(this.props, 'local.quoteBottom')}
        </div>
      </div>
    );
  }

  // Get a quote
  private async getQuote(): Promise<Data> {
    if (this.shouldRotate()) {
      this.props.pushPending();

      const quote = await this.getQuoteFromDrive();
      this.props.popPending();

      return quote;
    }
    return {
      date: get(this.props, 'local.date'),
      timestamp: get(this.props, 'local.timestamp'),
      quote: get(this.props, 'local.quote'),
      quoteBottom: get(this.props, 'local.quoteBottom'),
    };
  }

  // Read from drive
  private async getQuoteFromDrive(): Promise<Data> {
    const res = await fetch('https://drive.google.com/uc?id=19OOidqGbMoCCHJ6fEsyYNS5GqsmiaBdk');
    const body = await res.json();

    if (res.status === 200) {
      return {
        date: new Date().getDate(),
        quote: get(body, 'quote'),
        quoteBottom: get(body, 'quoteBottom'),
        timestamp: Date.now(),
      };
    }

    return {
      date: 0,
      timestamp: 0,
      quote: "Go Get'm!",
      quoteBottom: ""
    };
  }

  /**
   * Should we rotate the currennt image.
   */
  private shouldRotate(props: Props = this.props) {
    return get(props, 'local.timestamp', 0) + (1000 * 1000) < Date.now();
  }
}

const mapDispatchToProps = { popPending, pushPending };

export default connect(null, mapDispatchToProps)(Quote);
