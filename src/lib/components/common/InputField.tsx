'use client';

import { InputFieldType } from '@/lib/types/components/common';
import clsx from 'clsx';

export default function InputField({
    hookRegister,
    inputProps,
    label,
    error,
    Icon,
    optional,
    prefix,
    suffix,
    onIconClick,
}: InputFieldType) {
    const className = ['input-field__label', inputProps?.className].filter((className) => className).join(' ');
    return (
        <div className={clsx('input-field', !!Icon && 'input-field__has-icon')}>
            {label ? (
                <span className="input-field__label">
                    {label}
                    {optional ? <span> (Optional)</span> : ''}
                </span>
            ) : (
                <></>
            )}
            <div className={clsx('input-field__input', !!prefix && 'has-prefix', !!suffix && 'has-suffix')}>
                {prefix ? <span className="input-field__prefix">{prefix}</span> : <></>}
                <input
                    {...(inputProps || {})}
                    {...(hookRegister || {})}
                    className={className}
                    onChange={(e) => {
                        (hookRegister || {}).onChange && (hookRegister || {}).onChange(e);
                        inputProps.onChange && inputProps.onChange(e);
                    }}
                    onBlur={(e) => {
                        (hookRegister || {}).onBlur && (hookRegister || {}).onBlur(e);
                        inputProps.onBlur && inputProps.onBlur(e);
                    }}
                />
                {suffix ? <span className="input-field__suffix">{suffix}</span> : <></>}
            </div>
            {!!Icon && (
                <i onClick={onIconClick}>
                    <Icon />
                </i>
            )}
            {!!error ? <span className="input-field__error">{error}</span> : <></>}
        </div>
    );
}
