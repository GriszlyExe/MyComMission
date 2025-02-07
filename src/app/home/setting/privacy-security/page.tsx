'use client'
import Breadcrumbs from '@/app/ui/setting/breadcrumbs'
import ChangePasswordForm from '@/app/ui/setting/change-password-form'
import TwoFactorForm from '@/app/ui/setting/two-fa-form'

// import { BellIcon, LockIcon } from 'lucide-react'

// import React, { useState } from 'react'
export default function PrivacySecurityPage() {
    // const [openChangePassword, setOpenChangePassword] = useState(false);
    // const [open2fa, setOpen2fa] = useState(false);

    return (
        <div className='max-w-2xl mx-auto p-6 space-y-4'>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Home', href: '/home' },
                    { label: 'Settings', href: '/home/setting' },
                    { label: 'Privacy & Security', href: '/home/setting/privacy-security', active: true },
                ]}
            />
            <ChangePasswordForm />
            <TwoFactorForm/>



        </div>
    )
}
