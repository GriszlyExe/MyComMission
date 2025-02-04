'use client'

import CreditCardForm from '@/app/ui/setting/add-credit-card'
import Breadcrumbs from '@/app/ui/setting/breadcrumbs';
import { CreditCardIcon } from 'hugeicons-react';
import { useState } from 'react';

// import React, { useState } from 'react'

export default function PaymentPage() {
  const [hasCreditCard, setHasCreditCard] = useState(true);
  function maskCreditCard(cardNumber: string) {
    const last4 = cardNumber.slice(-4); // Get the last 4 digits
    const masked = cardNumber.slice(0, -4).replace(/\d/g, '*'); // Mask all digits except the last 4
    return masked + last4;
  }
  const cardNumber = '1111222233334444'
  const maskedCardNumber = maskCreditCard(cardNumber)


  return (
    <div className='max-w-2xl mx-auto p-6 space-y-4'>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/home' },
          { label: 'Settings', href: '/home/setting' },
          { label: 'Payment', href: '/home/setting/payment', active: true },
        ]}
      />
      <div className='items-center gap-3 w-full px-4 py-4 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition'>
        <div className='items-center flex space-x-3'><CreditCardIcon className="w-6 h-6" />  <span>My Credit Card:</span></div>
        <div className='text-gray-500'>{hasCreditCard ? maskedCardNumber : 'You currently have no Credit Card'}
        </div></div>
      <CreditCardForm />
    </div>)
}
