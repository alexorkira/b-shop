import React from 'react';

interface MediaProps {
    media?: string;
}
export const Media: React.FunctionComponent<MediaProps> = (
    props: MediaProps
) => {
    return (
        <div className="product-media">
            {props.media && <img 
                className="media"
                alt="media"
                src={`${process.env.REACT_APP_MEDIA_HOST}${props.media}`}
            />}
        </div>
    );
};
