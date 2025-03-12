'use client'
import 'daisyui'
import { briefSchema, proposalSchema } from './FormSchemas';
import { Formik, Form } from 'formik';
import * as yup from "yup";
import { FormikInput, FormikCheckbox, FormikFileInput } from './FormikInput';
import { createCommission, createProposal, getCommissionById } from '@/service/commissionService';
import { useAppDispatch, useAppSelector } from "@/states/hook";
import { io } from "socket.io-client"
import { createMessage } from '@/service/chatService';
import { useEffect, useState } from 'react';
import { isCommissionEnded } from './commissionState';

interface ModalProps {
    id: string,
    refresh: boolean
}

const socket = io(process.env.SERVER_ADDRESS);

export const ProposalForm = ({ id, refresh }: ModalProps) => {

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

    const latestCommission = useAppSelector(state => {
        if (state.chat.activeRoom?.latestCommission) {
            return state.chat.activeRoom.latestCommission;
        }
        return null;
    });

    console.log(latestCommission);

    type formSchema = yup.InferType<typeof proposalSchema>;
    
    const [initialValues, setCommission] = useState({
        expectedDate: new Date().toISOString().split("T")[0],
        proposalPrice: 500,
        chatRoomId: activeRoomId,
    });

    useEffect(() => {
        console.log("ppp");
        if (latestCommission && !isCommissionEnded(latestCommission.state)) {
            console.log(latestCommission);
            console.log(new Date(latestCommission.deadline).toISOString().split("T")[0]);
            setCommission({
                expectedDate: new Date(latestCommission.deadline).toISOString().split("T")[0],
                proposalPrice: latestCommission.budget,
                chatRoomId: activeRoomId
            });
            console.log(initialValues);
        }
    
    }, [refresh])

    const handleSubmit = async (
        values: formSchema,
        { resetForm }: { resetForm: () => void } // Accept resetForm from Formik
    ) => {
        try {
            console.log(new Date());
            console.log(values);
            // resetForm(); // Reset form fields after successful submission
            console.log(latestCommission.commissionId)
            const response = await createProposal(latestCommission.commissionId ,values);
            console.log(response);
            console.log(response.commission.commissionId);

            document.getElementById(id).close(); // Close the modal

            const CM = async () => {
                const res = await createMessage({
                    chatRoomId: activeRoomId!,
                    senderId: loggedInUserId,
                    content: latestCommission.commissionId,
                    messageType: "PROPOSAL"
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
                        <h1 className="font-bold text-3xl flex justify-center">Proposal</h1>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={proposalSchema}
                            enableReinitialize={true}
                            onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                        >
                            {({ isSubmitting, errors, touched, resetForm, setFieldValue }) => (
                                <Form className="space-y-4" autoComplete="off">
                                    <FormikInput label='expectedDate' type='date' name='expectedDate' errors={errors.expectedDate} touched={touched.expectedDate}
                                        placeholder='Expected finish date of your artwork.'
                                    />
                                    <FormikInput label='Price' type='number' name='proposalPrice' errors={errors.proposalPrice} touched={touched.proposalPrice}
                                        placeholder='Price of your artwork (THB)' />
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
