import React from 'react';

export enum IconId {
    Basket = 'basket',
    Discount = 'discount',
    Minus = 'minus',
    Pen = 'pen',
    Plus = 'plus',
    Save = 'save',
    Trashcan = 'trashcan',
}

export interface IconProps {
    width?: number;
    height?: number;
    iconId: IconId;
    styleName?: string;
    color?: string;
    onClick?: (event: React.MouseEvent) => void;
}

export const Icon: React.FunctionComponent<IconProps> = ({
    width = 24,
    height = 24,
    iconId,
    styleName,
    color,
    onClick,
}) => {
    const iconUrl =`${process.env.REACT_APP_MEDIA_HOST}/styles/icons/${iconId}.svg`;
    return (
        <div
            className={`mask-icon icon-${iconId} ${styleName ?? ''}`}
            style={{
                maskImage: `url("${iconUrl}")`,
                WebkitMaskImage: `url("${iconUrl}")`,
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                width: width ?? 24,
                height: height ?? 24,
                backgroundColor: color,
            }}
            onClick={onClick}
        />
    );
};