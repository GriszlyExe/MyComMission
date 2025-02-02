'use client'

import React, { useState } from 'react'
import { CreditCard, ChevronRight} from 'lucide-react';
// import Link from 'next/link';


export default function CreditCardForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    // Get the current year to generate year options
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear + i);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const data = {
            number: formData.get("number"),
            month: formData.get("month"),
            year: formData.get('year'),
            cvv: formData.get('cvv')

        };

        console.log(data);
    };

    return (
        <div>
            <button className='flex items-center bg-white border border-gray-300 rounded-md p-3'
                onClick={() => setIsOpen(true)}
            >Edit Payment Method <ChevronRight/></button>
            {isOpen &&
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="m-auto w-full rounded-md border-2 border-gray-400 bg-white p-6 shadow-md md:max-w-lg">
                        <h1 className="mb-6 text-center text-3xl font-bold">
                            <span className="flex items-center gap-3 w-full px-4 py-4 text-gray-700 text-center">
                                <CreditCard className="w-6 h-6 text-gray-600" />  Credit Card</span>
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">
                                    Number
                                </label>
                                <input
                                    type='number'
                                    name="number"
                                    placeholder="Required"
                                    required
                                    className="rounded-md peer block w-full border border-gray-500 py-[9px] pl-5 text-sm outline-2 placeholder:text-gray-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="month" className="mb-2 block text-sm font-bold text-gray-700">Expiration Month</label>
                                <select
                                    id="month"
                                    name='month'
                                    value={month}
                                    required
                                    onChange={(e) => setMonth(e.target.value)}
                                    className="rounded-md peer block w-full border border-gray-500 py-[9px] pl-5 text-sm outline-2 placeholder:text-gray-500"
                                >
                                    <option value=""
                                    >Select Month</option>
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <option key={i} value={i + 1}>
                                            {new Date(0, i).toLocaleString('en-US', { month: 'long' })}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="year" className="mb-2 block text-sm font-bold text-gray-700" >Expiration Year</label>
                                <select
                                    id="year"
                                    name='year'
                                    value={year}
                                    required
                                    onChange={(e) => setYear(e.target.value)}
                                    className="rounded-md peer block w-full border border-gray-500 py-[9px] pl-5 text-sm outline-2 placeholder:text-gray-500"
                                >
                                    <option value="">Select Year</option>
                                    {yearOptions.map((y) => (
                                        <option key={y} value={y}>
                                            {y}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-bold text-gray-700">
                                    CVV
                                </label>
                                <input
                                    type="number"
                                    name="cvv"
                                    placeholder="Security code"
                                    required
                                    className="rounded-md peer block w-full border border-gray-500 py-[9px] pl-5 text-sm outline-2 placeholder:text-gray-500"
                                />
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="w-full rounded  bg-blue-400 px-4 py-3 text-white hover:bg-blue-500 focus:outline-none"
                                >
                                    Done
                                </button>
                                <button
                                    className="border-2 w-full border-gray-400 rounded bg-white px-4 py-3 text-blue-600 hover:bg-gray-300 focus:outline-none text-center"
                                    onClick={() => { setIsOpen(false) }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>

                    </div>
                </div>}
        </div>
    );
}
