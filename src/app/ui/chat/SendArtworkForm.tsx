'use client'
import 'daisyui'
import { artworkSchema, briefSchema } from './schemas/FormSchemas';
import { Formik, Form } from 'formik';
import * as yup from "yup";
import {FormikFileInput } from './FormikInput';
import { Upload } from 'lucide-react';
import { useAppSelector } from '@/stores/hook';
import { useState, useEffect } from 'react';
import { isCommissionEnded } from './commissionState';
// import { sendArtwork, uploadArtwork } from '@/service/commissionService';
import { createMessage } from '@/service/chatService';
import { io } from "socket.io-client"
import clsx from 'clsx';
import { sendArtWork } from '@/service/commissionService';

interface ModalProps {
    id: string,
    refresh: boolean
}


export const SendArtworkForm = () => {

    // const artistId = useAppSelector(state => {
    //     if (state.chat.activeRoom?.user2) {
    //         return state.chat.activeRoom.user2.userId;
    //     }
    //     return null;
    // });

    // const [message, setMessage] = useState<string>("");
    // const [showOptions, setShowOptions] = useState(false);
    // const loggedInUserId = useAppSelector(state => state.user.user!.userId);
    // const activeRoomId = useAppSelector(state => {
    //     if (state.chat.activeRoom) {
    //         return state.chat.activeRoom.chatRoomId;
    //     }
    //     return null;
    // });

    const latestCommission = useAppSelector(state => {
        if (state.chat.activeRoom?.latestCommission) {
            return state.chat.activeRoom.latestCommission;
        }
        return null;
    });

    if (!latestCommission) {
        return null;
    }  

    const handleSubmit = async (values: any) => {
        try {
            const { file } = values as any;

            await sendArtWork({ commissionId: latestCommission!.commissionId, artwork: file, artistId: latestCommission.artistId, });
            // @ts-ignore
            document.getElementById(`artwork-form-${latestCommission?.commissionId}`).close();
            // @ts-ignore
            
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div>
            <dialog id={`artwork-form-${latestCommission.commissionId}`} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h1 className="font-bold text-3xl flex justify-center">Artwork</h1>
                    <div className="m-auto w-full max-w-lg rounded-md bg-white p-6 shadow-sm">
                        <Formik
                            initialValues={{}}
                            // @ts-ignore 
                            onSubmit={(values, { resetForm }) => handleSubmit(values, { resetForm })}
                        >
                            {({ isSubmitting, resetForm, setFieldValue }) => (
                                <Form className="space-y-4" autoComplete="off">
                                    <FormikFileInput label="Draft" name="file" setFieldValue={setFieldValue} />
                                    <div className="flex flex-row items-center justify-center gap-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className={clsx(
                                                "flex flex-row w-1/2 rounded px-4 py-3 text-white gap-x-2 focus:outline-none",
                                                isSubmitting
                                                  ? "cursor-not-allowed bg-gray-400"
                                                  : "bg-gradient-to-r from-primary-content to-secondary-content hover:from-base-200 hover:to-base-300"
                                              )}

                                        >
                                           <Upload size={24}/> Send Artwork
                                        </button>

                                        <button className="w-1/2 rounded px-4 py-3 text-white bg-gradient-to-r
                                         from-primary-content to-secondary-content hover:from-base-200 hover:to-base-300"
                                            type='button'
                                            onClick={() => { resetForm();
                                                // @ts-ignore
                                                document.getElementById(`artwork-form-${latestCommission.commissionId}`).close() }}
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

