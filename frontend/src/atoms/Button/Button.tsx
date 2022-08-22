
import React, { MouseEvent } from 'react';
import { Icon, IconId } from '../Icon/Icon';
import './Button.scss';

export enum ButtonSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    BIG = 'big'
}

export interface ButtonProps {
    label?: string;
    size?: ButtonSize;
    disabled?: boolean;
    setClick?: (event: MouseEvent) => void;
    styleClass?: string;
    containerClass?: string;
    icon?: { id: IconId, width?: number, height?: number };
    color?: string;
    textColor?: string;
}

export const Button: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => {
    const size = props.size ?? ButtonSize.MEDIUM;

    const onClick = (event: MouseEvent) => {
        if (props.setClick) {
            props.setClick(event);
        }
    };

    return (
        <div
            className={`button-container ${props.containerClass}`}
            style={{ borderColor: props.color }}
        >
            <button
                className={'button d-flex align-items-center justify-content-center '+
                    `classic ${size} ${props.styleClass ?? ''}`+
                    `${(!props.disabled && props.color) ? ' custom-hover' : ''}`
                }
                disabled={props.disabled}
                onClick={onClick}
                style={{
                    background: props.color
                }}
            >
                {props.icon &&
                    <Icon
                        styleName="mr-2"
                        iconId={props.icon.id}
                        width={props.icon.width}
                        height={props.icon.height}
                    />
                }
                <span
                    className={`h-100 ${props.disabled ? ' disabled' : ''}`}
                    style={{
                        color: props.disabled
                            ? undefined
                            : props?.textColor,
                        WebkitTextFillColor: props.disabled
                            ? undefined
                            : props?.textColor
                    }}
                >
                    {props.label}
                </span>
            </button>
        </div>
    );
};
