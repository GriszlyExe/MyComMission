'use client'
import 'daisyui'
import { postPoneSchema } from './schemas/FormSchemas';
import { Formik, Form } from 'formik';
import * as yup from "yup";
import { FormikInput } from './FormikInput';

interface ModalProps {
    id: string
}


export const PostponeForm = ({ id }: ModalProps) => {
    type formSchema = yup.InferType<typeof postPoneSchema>;
    const date = {
        oldDeadline: '2025-04-16',
        newDeadline: '',

    }
    const initialValues = {
        newDeadline: ''
    };
    const formattedDate = new Date(date.oldDeadline).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
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
                    {/* <div className="flex min-h-screen items-center justify-center"> */}
                    <div className="m-auto w-full max-w-lg rounded-md p-2 bg-white">
                        <h1 className="font-bold text-3xl flex justify-center">Postpone Artwork</h1>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={postPoneSchema}
                            onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                        >
                            {({ isSubmitting, errors, touched, resetForm }) => (
                                <Form className="space-y-4" autoComplete="off">
                                    <div>
                                        <label className="mb-2 block text-sm font-bold text-gray-700">
                                            Old Deadline
                                        </label>
                                        <div className='shadow-sm rounded-lg p-3'>
                                            {formattedDate}
                                        </div>
                                    </div>
                                    <FormikInput label='New deadline' type='date' name='newDeadline' errors={errors.newDeadline} touched={touched.newDeadline}
                                        placeholder='Deadline of your artwork.'
                                    />
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={`w-1/2 rounded px-4 py-3 text-white focus:outline-none ${isSubmitting
                                                ? "cursor-not-allowed bg-gray-400"
                                                : "bg-gradient-to-r from-primary-content to-secondary-content hover:from-base-200 hover:to-base-300"
                                                }`}

                                        >
                                            Send
                                        </button>

                                        <button className="w-1/2 rounded px-4 py-3 text-white bg-gradient-to-r
                                         from-blue-500 to-purple-500 hover:from-base-200 hover:to-base-300"
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
