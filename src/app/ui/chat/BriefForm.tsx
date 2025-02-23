'use client'
import 'daisyui'
import { briefSchema } from './FormSchemas';
import { Formik, Form } from 'formik';
import * as yup from "yup";
import { FormikInput, FormikCheckbox, FormikFileInput } from './FormikInput';

interface ModalProps {
    id: string
}


export const BriefForm = ({ id }: ModalProps) => {
    type formSchema = yup.InferType<typeof briefSchema>;
    const brief = {
        name: 'mona-lisa',
        details: 'monalisa fanart',
        deadline: '2025-04-16',
        price: 450,
        commercialUse: true
    }
    const initialValues = {
        name: brief.name,
        details: brief.details,
        deadline: brief.deadline,
        price: brief.price,
        commercialUse: brief.commercialUse,
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
                    <h1 className="font-bold text-3xl flex justify-center">Brief</h1>
                    {/* <div className="flex min-h-screen items-center justify-center"> */}
                    <div className="m-auto w-full max-w-lg rounded-md bg-white p-6 shadow-sm">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={briefSchema}
                            onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                        >
                            {({ isSubmitting, errors, touched, resetForm, setFieldValue }) => (
                                <Form className="space-y-4" autoComplete="off">
                                    <FormikInput label='Name' type='text' name='name' errors={errors.name} touched={touched.name}
                                        placeholder='Name of your artwork'
                                    />
                                    <FormikInput label='Details' type='textarea' name='details' errors={errors.details} touched={touched.details}
                                        placeholder='what do you want your artwork to be?' />
                                    <FormikInput label='deadline' type='date' name='deadline' errors={errors.deadline} touched={touched.deadline}
                                        placeholder='Deadline of your artwork.'
                                    />
                                    <FormikInput label='Price' type='text' name='price' errors={errors.price} touched={touched.price}
                                        placeholder='Price of your artwork (THB)' />
                                    <FormikCheckbox label='Commercial' name='commercialUse' errors={errors.commercialUse} touched={touched.commercialUse} />
                                    <FormikFileInput label="Draft" name="file" setFieldValue={setFieldValue} />
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-1/2 rounded px-4 py-3 text-white focus:outline-none ${isSubmitting
                                                ? "cursor-not-allowed bg-gray-400"
                                                : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700"
                                                }`}

                                        >
                                            Send
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
                        {/* </div> */}
                    </div>
                </div>
            </dialog>
        </div>

    )
}
