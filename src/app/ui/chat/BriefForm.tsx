'use client'
import 'daisyui'
import { briefSchema } from './FormSchemas';
import { Formik, Form } from 'formik';
import * as yup from "yup";
import { FormikInput, FormikCheckbox, FormikFileInput } from './FormikInput';
import { createCommission } from '@/service/commissionService';
import { useAppDispatch, useAppSelector } from "@/states/hook";
import { io } from "socket.io-client"
import { createMessage } from '@/service/chatService';
import { useState } from 'react';
import { isCommissionEnded } from './commissionState';

interface ModalProps {
    id: string
}

const socket = io(process.env.SERVER_ADDRESS);

export const BriefForm = ({ id }: ModalProps) => {

    const artistId = useAppSelector(state => {
        if (state.chat.activeRoom?.user2) {
            return state.chat.activeRoom.user2.userId;
        }
        return null;
    });

    const [message, setMessage] = useState<string>("");
    const [showOptions, setShowOptions] = useState(false);
    const loggedInUserId = useAppSelector(state => state.user.user!.userId);
    const activeRoomId = useAppSelector(state => {
        if (state.chat.activeRoom) {
            return state.chat.activeRoom.chatRoomId;
        }
        return null;
    });


    type formSchema = yup.InferType<typeof briefSchema>;


    const brief = {
        commissionName: '',
        briefDescription: '',
        dueDate: '',
        budget: 500,
        commercialUse: false,
        state: ''
    }

    const [commissionId, setCommissionId] = useState("");
    const [createNewBrief, setCreateNewBrief] = useState(false);
    if (commissionId == null || isCommissionEnded(brief.state)) {
        setCreateNewBrief(true);
    }

    const initialValues = {
        commissionName: brief.commissionName,
        briefDescription: brief.briefDescription,
        dueDate: brief.dueDate,
        budget: brief.budget,
        commercialUse: brief.commercialUse,
        // file: null
        artistId: artistId,
        chatRoomId: activeRoomId,
        // createNewBrief: createNewBrief
    };

    const handleSubmit = async (
        values: formSchema,
        { resetForm }: { resetForm: () => void } // Accept resetForm from Formik
    ) => {
        try {
            console.log(new Date());
            console.log(values);
            // resetForm(); // Reset form fields after successful submission

            const response = await createCommission(values);
            console.log(response);
            console.log(response.commission.commissionId);

            document.getElementById(id).close(); // Close the modal

            const CM = async () => {
                const res = await createMessage({
                    chatRoomId: activeRoomId!,
                    senderId: loggedInUserId,
                    content: response.commission.commissionId,
                    messageType: "BRIEF"
                })

                const newMessage = res.newMessage
                if (newMessage) {
                    socket.emit("send_message", { newMessage });
                }
            }

            CM()

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
                        <h1 className="font-bold text-3xl flex justify-center">Brief</h1>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={briefSchema}
                            onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                        >
                            {({ isSubmitting, errors, touched, resetForm, setFieldValue }) => (
                                <Form className="space-y-4" autoComplete="off">
                                    <FormikInput label='Name' type='text' name='commissionName' errors={errors.commissionName} touched={touched.commissionName}
                                        placeholder='Name of your artwork'
                                    />
                                    <FormikInput label='Details' type='textarea' name='briefDescription' errors={errors.briefDescription} touched={touched.briefDescription}
                                        placeholder='what do you want your artwork to be?' />
                                    <FormikInput label='deadline' type='date' name='dueDate' errors={errors.dueDate} touched={touched.dueDate}
                                        placeholder='Deadline of your artwork.'
                                    />
                                    <FormikInput label='Price' type='number' name='budget' errors={errors.budget} touched={touched.budget}
                                        placeholder='Price of your artwork (THB)' />
                                    <FormikCheckbox label='Commercial' name='commercialUse' errors={errors.commercialUse} touched={touched.commercialUse} />
                                    {/* <FormikFileInput label="Draft" name="file" setFieldValue={setFieldValue} /> */}
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
