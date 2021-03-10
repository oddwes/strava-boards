import React, {useState} from 'react';

import '../styling/footer.css';

const Footer = ({text, url}) => {
  const [footerText] = useState(url ? <a target="_blank" rel="noopener noreferrer" href={url}>{text}</a> : text);

  return(
    <div className="footer">
      <p style={{textAlign: 'center'}}>
        {footerText}
      </p>
    </div>
  )
}

export default Footer;