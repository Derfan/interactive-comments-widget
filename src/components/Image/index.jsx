import { useState, useEffect } from 'react';
import cns from 'classnames';
import PropTypes from 'prop-types';

import cn from './styles.module.sass';

const useUrls = ({ paths }) => {
    const [urls, setUrls] = useState(null);

    useEffect(() => {
        const imports = [
            import(`../../images/${paths.png}`),
            import(`../../images/${paths.webp}`),
        ];

        Promise.all(imports)
            .then((images) => {
                setUrls({
                    png: images[0].default,
                    webp: images[1].default,
                });
            });
    }, [paths]);

    return urls;
};

export const Image = ({ paths, size, className, alt }) => {
    const urls = useUrls({ paths });

    if (!urls) return null;

    return (
        <picture className={cn.root}> 
            <source srcSet={urls.webp} type="image/webp" />
            <source srcSet={urls.png} type="image/png" />
            <img
                src={urls.png}
                className={
                    cns(
                        { [cn.md]: size === 'md', [cn.sm]: size === 'sm'},
                        className,
                    )
                }
                alt={alt}
            />
        </picture>
    );
}

Image.defaultProps = {
    className: '',
    alt: 'image',
    size: 'md',
};

Image.propTypes = {
  paths: PropTypes.shape({
      png: PropTypes.string,
      webp: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md']),
};
