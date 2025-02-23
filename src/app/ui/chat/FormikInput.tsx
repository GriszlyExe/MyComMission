import { Field, ErrorMessage } from "formik";
import React from "react";

interface TextInputProps {
    label?: string;
    type: string;
    name: string;
    errors?: string;
    touched?: boolean;
    placeholder?: string
}

export const FormikInput = ({ label, type, name, errors, touched, placeholder }: TextInputProps) => {
    return (
        <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
                {label}
            </label>

            {type === "textarea" ? (
                // If type is textarea, use a larger text area field
                <Field
                    as="textarea"
                    placeholder={placeholder}
                    name={name}
                    required
                    className={`textarea textarea-bordered w-full h-32 resize-none ${errors && touched ? "textarea-error" : "textarea-primary"}`}
                />
            ) : (
                // Default text input field
                <Field
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    required
                    className={`input input-bordered w-full ${errors && touched ? "input-error" : "input-primary"}`}
                />
            )}

            <ErrorMessage name={name} component="p" className="text-xs text-red-500" />
        </div>
    );
};



interface CheckboxProps {
    label?: string;
    name: string;
    errors?: string;
    touched?: boolean;
}

export const FormikCheckbox = ({ label, name, errors, touched }: CheckboxProps) => {
    return (
        <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700 font-bold">{label}</label>
            <Field
                type="checkbox"
                name={name}
                className={`checkbox checkbox-primary ${errors && touched ? "checkbox-error" : ""}`}
            />
            <p className="text-sm">commercial use</p>
            <ErrorMessage name={name} component="p" className="text-xs text-red-500" />
        </div>
    );
};



interface FileInputProps {
    label?: string;
    name: string;
    setFieldValue: (field: string, value: any) => void;
}

export const FormikFileInput = ({ label, name, setFieldValue }: FileInputProps) => {
    return (
        <div>
            {label && <label className="mb-2 block text-sm font-bold text-gray-700">{label}</label>}
            <input
                type="file"
                name={name}
                className="file-input file-input-bordered w-full"
                onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    setFieldValue(name, file); // Store file in Formik state
                }}
            />
        </div>
    );
};




