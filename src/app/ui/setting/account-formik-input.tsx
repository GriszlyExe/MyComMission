import { Field, ErrorMessage } from 'formik'
import React from 'react'


interface TextInputProps {
    label?: string;
    type: string;
    name: string;
    errors?: string;
    touched?: boolean;
}

export default function AccountFormikInput({ label, type, name, errors, touched }: TextInputProps) {
    return (
        <div>
            <label className="mb-1 block text-sm font-bold text-gray-700">
                {label}
            </label>
            <Field
                type={type}
                name={name}
                required
                className={`input input-bordered w-full ${errors && touched
                    ? "input-error"
                    : "input-primary"
                    }`}
            />
            <ErrorMessage
                name={name}
                component="p"
                className="text-xs text-red-500"
            />
        </div>
    )
}
