"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { accountSchema } from "@/app/(auth)/Schemas";
// import { ClipLoader } from "react-spinners";
import Image from "next/image";
export default function EditAccountForm() {

    const user = {
        firstName: 'Gun',
        lastName: 'Gui',
        birthDate: '2003-12-12',
        email: 'gungui@gmail.com',
        phone: '0888888888',
        displayName: 'gun the gui',
        profilePic: '/post.jpeg'
    }
    
    const [previewPic, setPreviewPic] = useState(user.profilePic);
    const [showSubmitPopup, setshowSubmitPopup] = useState(false);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="m-auto w-full max-w-lg rounded-md  bg-white p-6 shadow-sm">
                <Formik
                    initialValues={{
                        firstName: user.firstName,
                        lastName: user.lastName,
                        birthDate: user.birthDate,
                        phone: user.phone,
                        displayName: user.displayName,
                        email: user.email,
                        profilePic: user.profilePic,

                    }}
                    validationSchema={accountSchema}
                    onSubmit={async (values, actions) => {
                        console.log("new info: ", values);
                        // actions.resetForm();

                        //show pop-up after save changes
                        setshowSubmitPopup(true);
                        setTimeout(() => {
                            setshowSubmitPopup(false);
                        }, 3000);

                    }}
                >
                    {({ isSubmitting, errors, touched, setFieldValue }) => (
                        <Form className="space-y-4 " autoComplete="off">
                            <div className="flex flex-col items-center">
                                <label className="mb-2 block text-sm font-bold text-gray-700">
                                    Profile Picture
                                </label>
                                <div className="w-24 h-24 overflow-hidden rounded-full border border-gray-300">
                                    <Image
                                        src={previewPic || "/avatar.png"}
                                        alt="Profile"
                                        className="w-full h-full object-cover overflow-hidden rounded-full border border-gray-300"
                                        width={100}
                                        height={100}
                                    />
                                </div>

                                <input
                                    type="file"
                                    name="profilePic"
                                    accept="image/*"
                                    onChange={(event) => {
                                        const file = event.target.files?.[0];
                                        if (file) {
                                            setFieldValue("profilePic", file);

                                            // Generate preview URL
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                if (typeof reader.result === "string") {
                                                    setPreviewPic(reader.result);
                                                }
                                            }
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    className="mt-2 text-sm p-3"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">
                                    Display Name
                                </label>
                                <Field
                                    type="text"
                                    name="displayName"
                                    required
                                    className={`input input-bordered w-full ${errors.displayName && touched.displayName
                                        ? "input-error"
                                        : "input-primary"
                                        }`}
                                />
                                <ErrorMessage
                                    name="displayName"
                                    component="p"
                                    className="text-xs text-red-500"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">Firstname</label>
                                <Field
                                    type="text"
                                    name="firstName"
                                    required
                                    className={`input input-bordered w-full ${errors.firstName && touched.firstName
                                        ? "input-error"
                                        : "input-primary"
                                        }`}
                                />
                                <ErrorMessage
                                    name="firstName"
                                    component="p"
                                    className="text-xs text-red-500"
                                />

                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">Lastname</label>
                                <Field
                                    type="text"
                                    name="lastName"
                                    required
                                    className={`input input-bordered w-full ${errors.lastName && touched.lastName
                                        ? "input-error"
                                        : "input-primary"
                                        }`}
                                />
                                <ErrorMessage
                                    name="lastName"
                                    component="p"
                                    className="text-xs text-red-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">
                                    Birth Date
                                </label>
                                <Field
                                    type='date'
                                    name="birthDate"
                                    required
                                    className={`input input-bordered w-full ${errors.birthDate && touched.birthDate
                                        ? "input-error"
                                        : "input-primary"
                                        }`}
                                />
                                <ErrorMessage
                                    name="birthDate"
                                    component="p"
                                    className="text-xs text-red-500"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">
                                    Phone Number
                                </label>
                                <Field
                                    type="tel"
                                    name="phone"
                                    required
                                    className={`input input-bordered w-full ${errors.phone && touched.phone
                                        ? "input-error"
                                        : "input-primary"
                                        }`}
                                />
                                <ErrorMessage
                                    name="phone"
                                    component="p"
                                    className="text-xs text-red-500"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    required
                                    className={`input input-bordered w-full ${errors.email && touched.email
                                        ? "input-error"
                                        : "input-primary"
                                        }`}
                                />
                                <ErrorMessage
                                    name="email"
                                    component="p"
                                    className="text-xs text-red-500"
                                />
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-1/2 rounded px-4 py-3 text-white focus:outline-none ${isSubmitting
                                        ? "cursor-not-allowed bg-gray-400"
                                        : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
                                        }`}
                                >
                                    Save Changes
                                </button>
                            </div>
                            {showSubmitPopup && (
                                <div className="fixed bottom-5 right-5 rounded bg-green-500 px-4 py-2 text-white shadow-lg">
                                    Changes have been saved successfully!
                                </div>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
