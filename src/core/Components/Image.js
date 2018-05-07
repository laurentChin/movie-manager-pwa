import React from 'react';

const Image = ({src, alt}) => {

  const original = src;
  const medium = original.replace(/(.[a-z0-9]{3,4})$/, '-medium$1');
  const small = original.replace(/(.[a-z0-9]{3,4})$/, '-small$1');

  return (
    <picture>
      <source srcset={original} media="(min-width: 980px)"/>
      <source srcSet={medium} media="(min-width: 400px)"/>
      <img src={small} alt={alt} />
    </picture>
  );
}

export default Image;
