import React from 'react';
import { version } from '../../../../package.json';

function ConnectionPageFooter() {
  return (
    <footer className="footer">
      <p className="FooterText">© Kafka Lens Version {version} </p>
    </footer>
  );
}

export default ConnectionPageFooter;
