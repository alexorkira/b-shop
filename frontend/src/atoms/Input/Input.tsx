
import { TextField } from '@material-ui/core';
import React, { ChangeEvent, useRef } from 'react';

export interface InputProps {
    value: string | number;
    label?: string;
    type?: string;
    placeHolder?: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    autofocus?: boolean;
    iconType?: string;
    inputProps?: { [key: string]: number | string }
}

export const Input: React.FunctionComponent<InputProps> = (props: InputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div
            className={`d-flex w-100 position-relative`}
            onClick={() => inputRef.current?.focus()}
        >
            <TextField
                autoFocus={props.autofocus}
                className={`w-100`}
                value={props.value}
                placeholder={props.placeHolder}
                label={props.label}
                onChange={(event: ChangeEvent<HTMLInputElement>) => 
                    props.onChange(event.currentTarget.value)
                }
                type={props.type ?? "text"}
                disabled={props.disabled || false}
                InputProps={{ inputProps: props.inputProps }}
            />
        </div>
    );
};

