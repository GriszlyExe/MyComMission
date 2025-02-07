'use client'

import { twoFactorCode } from '@/app/(auth)/Schemas';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TwoFactorAccessIcon } from 'hugeicons-react';
import React, { useState } from 'react'
import { ToggleSwitch } from './button';



export default function TwoFactorForm() {
    function maskEmail(email: string): string {
        const emailRegex = /^(.)(.*)(.@gmail\.com)$/; // Match first letter, hidden part, and domain
        return email.replace(emailRegex, (_, first, hidden, last) => {
            return `${first}${"*".repeat(hidden.length)}${last}`;
        });
    }
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const [open2faForm, setOpen2faForm] = useState(false);
    const user = {
        email: 'gungui@gmail.com',
    }
    const maskedEmail = maskEmail(user.email);

    return (
        <div>
            <div className='flex items-center gap-3 w-full px-4 py-4 text-gray-700 bg-white border rounded-lg'>
                <div className='flex w-full items-center gap-3'>


                    <TwoFactorAccessIcon className="w-6 h-6 text-gray-600" />


                    <span className="text-sm font-medium flex-grow">Two-factor authentication</span>
                    <div className='flex'>

                        <ToggleSwitch onToggle={() => {
                            if (isSwitchOn) setIsSwitchOn(false);
                            else if (!isSwitchOn)
                                setOpen2faForm(true);
                        }}
                            isOn={isSwitchOn}

                        />
                    </div>

                </div>
            </div>
            {open2faForm && <div className=' fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                <div className="m-auto w-full max-w-lg rounded-md  bg-white p-6 shadow-sm">
                    <h1 className="mb-6 text-center text-3xl font-bold">
                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                            Check your email
                        </span>
                    </h1>
                    <p className='mb-4 text-center'>Enter the code that we sent to {maskedEmail}</p>
                    <Formik
                        initialValues={{
                            code: '',
                        }}
                        validationSchema={twoFactorCode}
                        onSubmit={async (values, actions) => {
                            console.log("new info: ", values);
                            actions.resetForm();
                            setOpen2faForm(false);
                            setIsSwitchOn(true);
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form className="space-y-3 " autoComplete="off">
                                <div className="flex flex-col justify-between gap-3 relative">

                                    {/* <label className="mb-2 block text-sm font-bold text-gray-700">
                                        Old Password
                                    </label> */}
                                    <div className='relative'>
                                        <Field
                                            type='text'
                                            name="code"
                                            placeholder='code'
                                            required
                                            className={`input input-bordered w-full pr-10 ${errors.code && touched.code
                                                ? "input-error"
                                                : "input-primary"
                                                }`}
                                        />
                                        <ErrorMessage
                                            name="code"
                                            component="p"
                                            className="text-xs text-red-500"
                                        />
                                    </div>
                                </div>

                                <div className='flex gap-3'>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-1/2 rounded px-4 py-3 text-white focus:outline-none ${isSubmitting
                                            ? "cursor-not-allowed bg-gray-400"
                                            : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
                                            }`}
                                    >
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setOpen2faForm(false)}
                                        className={`w-1/2 rounded px-4 py-3 text-white focus:outline-none ${isSubmitting
                                            ? "cursor-not-allowed bg-gray-400"
                                            : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
                                            }`}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div >}
        </div >
    );
}
