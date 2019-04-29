import * as React from 'react';

interface Props {
  category?: string;
  onChange: (settings: { [key: string]: string|undefined }) => void;
}

class QuoteSettings extends React.PureComponent<Props> {
  render() {
    return (
      <div className="QuoteSettings">
      </div>
    );
  }
}

export default QuoteSettings;
