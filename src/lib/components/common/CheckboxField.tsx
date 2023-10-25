'use client';

import { CheckboxFieldType } from '@/lib/types/components/common';

export default function CheckboxField({ hookRegister, inputProps, label, error }: CheckboxFieldType) {
    const className = ['input-field__label', inputProps?.className].filter((className) => className).join(' ');
    return (
        <div className="input-field">
            <div className="input-field--checkbox">
                <input {...(inputProps || {})} {...(hookRegister || {})} className={className} type="checkbox" />
                {label ? (
                    <label htmlFor={inputProps.id} className="input-field__label">
                        {label}
                    </label>
                ) : (
                    <></>
                )}
            </div>
            {!!error ? <span className="input-field__error">{error}</span> : <></>}
        </div>
    );
}
