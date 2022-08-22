
import React from 'react';
import './AddNewButton.scss';

interface AddNewButtonProps {
    label: string
    onClick: () => void;
    media: string;
    alt: string;
    doubleImg?: boolean;
}

export const AddNewButton: React.FunctionComponent<AddNewButtonProps> = (
    props: AddNewButtonProps
) => {
    const renderImg = () => <img alt={props.alt} src={props.media} />;

    return (
        <div className="add-new-button" onClick={() => props.onClick()} >
            {renderImg()}
            <span>{props.label}</span>
            {props.doubleImg && renderImg()}
        </div>
    );
};
