'use client';

import { InputFieldType } from '@/lib/types/components/common';

export default function TextAreaField({ hookRegister, inputProps, label, error }: InputFieldType) {
    const className = ['input-field__label', inputProps?.className].filter((className) => className).join(' ');
    return (
        <div className="input-field">
            {label ? <span className="input-field__label">{label}</span> : <></>}
            <textarea {...(inputProps || {})} {...(hookRegister || {})} className={className} />
            {!!error ? <span className="input-field__error">{error}</span> : <></>}
        </div>
    );
}
