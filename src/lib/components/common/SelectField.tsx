'use client';

import { SelectFieldType } from '@/lib/types/components/common';

export default function SelectField({ hookRegister, inputProps, label, error, options }: SelectFieldType) {
    const className = ['input-field__label', inputProps?.className].filter((className) => className).join(' ');
    return (
        <div className="input-field">
            {label ? <span className="input-field__label">{label}</span> : <></>}
            <select defaultValue={''} {...(inputProps || {})} {...(hookRegister || {})} className={className}>
                <option hidden value={''}>
                    ---- Selection ----
                </option>
                {options.map(({ value, label }, index) => (
                    <option value={value} key={index}>
                        {label}
                    </option>
                ))}
            </select>
            {!!error ? <span className="input-field__error">{error}</span> : <></>}
        </div>
    );
}
