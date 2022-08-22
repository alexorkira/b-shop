
import React from 'react';
import './Dialog.scss';

export interface Position {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}

export interface DialogProps {
    title: string;
    children: React.ReactNode;
    show: boolean;
    setShow: (show: boolean) => void;
    noPadding?: boolean;
    noHeader?: boolean;
    noClose?: boolean;
    onClose?: (closed: string) => void;
    wildBody?: boolean;
    position?: Position;
    style?: any;
    class?: string;
}
export const Dialog: React.FunctionComponent<DialogProps> = (props: DialogProps) => {
   
    const closeDialog = () => {
        props.setShow(false);
    };

    return (
        props.show 
            ? <div
                className={`dialog ${props.class ?? ''}`}
                data-testid="dialog"
                onClick={() => !props.noClose && closeDialog()}
                style={ props.position ? props.position : { top: 0, right: 0, bottom: 0, left: 0 }}
            >
                <div
                    className={`dialog-content ${props.noPadding ? 'no-padding' : ''}`}
                    style={{...props.style}}
                    onClick={(e) => e.stopPropagation()}
                >
                    {!props.noHeader &&
                        <div className="dialog-header">
                            <div className="dialog-title">{props.title}</div>
                            {!props.noClose &&
                                <div
                                    className="dialog-close"
                                    onClick={() => closeDialog()}
                                />
                            }
                        </div>
                    }
                    <div className={`dialog-body ${props.wildBody ? 'w-100 p-0' : ''}`}>{props.children}</div>
                </div>
            </div> 
            : null
    );
};
