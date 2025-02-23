'use client'
import 'daisyui'
import { briefSchema } from './FormSchemas';
import { Formik, Form } from 'formik';
import * as yup from "yup";
import {FormikFileInput } from './FormikInput';
import { Upload } from 'lucide-react';

interface ModalProps {
    id: string
}


export const SendArtworkForm = ({ id }: ModalProps) => {
    type formSchema = yup.InferType<typeof briefSchema>;
    const initialValues = {
        file: null
    };

    const handleSubmit = async (
        values: formSchema,
        { resetForm }: { resetForm: () => void } // Accept resetForm from Formik
    ) => {
        try {
            console.log(values);
            resetForm(); // Reset form fields after successful submission
            document.getElementById(id).close(); // Close the modal

            // router.refresh(); (Uncomment this if needed)
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div>
            <dialog id={id} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h1 className="font-bold text-3xl flex justify-center">Send Artwork</h1>
                    <div className="m-auto w-full max-w-lg rounded-md bg-white p-6 shadow-sm">
                        <Formik
                            initialValues={initialValues}
                            // validationSchema={briefSchema}
                            onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                        >
                            {({ isSubmitting, resetForm, setFieldValue }) => (
                                <Form className="space-y-4" autoComplete="off">
                                    <FormikFileInput label="Draft" name="file" setFieldValue={setFieldValue} />
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`flex flex-row w-3/5 rounded px-4 py-3 text-white gap-x-2 focus:outline-none ${isSubmitting
                                                ? "cursor-not-allowed bg-gray-400"
                                                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
                                                }`}

                                        >
                                           <Upload size={24}/> Send With Watermark
                                        </button>

                                        <button className="w-1/2 rounded px-4 py-3 text-white bg-gradient-to-r
                                         from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
                                            type='button'
                                            onClick={() => { resetForm(); document.getElementById(id).close() }}
                                        >Cancel</button>

                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </dialog>
        </div>

    )
}
