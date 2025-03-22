'use client'
import 'daisyui'
import { artworkSchema, briefSchema } from './schemas/FormSchemas';
import { Formik, Form } from 'formik';
import * as yup from "yup";
import {FormikFileInput } from './FormikInput';
import { Upload } from 'lucide-react';
import { useAppSelector } from '@/states/hook';
import { useState, useEffect } from 'react';
import { isCommissionEnded } from './commissionState';
import { sendArtwork, uploadArtwork } from '@/service/commissionService';
import { createMessage } from '@/service/chatService';
import { io } from "socket.io-client"

interface ModalProps {
    id: string,
    refresh: boolean
}

const socket = io(process.env.SERVER_ADDRESS);

export const SendArtworkForm = ({ id, refresh }: ModalProps) => {

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
    useEffect(() => {
        console.log("aaa");
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

    type formSchema = yup.InferType<typeof artworkSchema>;
    
    const [initialValues, setCommission] = useState({
        expectedDate: new Date().toISOString().split("T")[0],
        proposalPrice: 500,
        chatRoomId: activeRoomId,
        // file: null
    });

    const handleSubmit = async (
        values: formSchema
    ) => {
        try {
            const { file, ...others } = values;

            const formData = new FormData();

            if (file) {
                formData.append("picture", file);
            }

            console.log(file);

            const { imageUrl } = await uploadArtwork(formData);
            
            const data = {
                imageUrl: imageUrl,
                artistHide: false
            };

            const response = sendArtwork(latestCommission.commissionId, data);

            console.log(response.data)

            const CM = async () => {
                const res = await createMessage({
                    chatRoomId: activeRoomId!,
                    senderId: loggedInUserId,
                    content: imageUrl,
                    messageType: "IMAGE"
                })

                const newMessage = res.newMessage
                if (newMessage) {
                    socket.emit("send_message", { newMessage });
                }
            }

            CM()
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
                                           <Upload size={24}/> Send Artwork
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
