'use client'

import Breadcrumbs from '@/app/ui/setting/breadcrumbs'
import EditAccountForm from '@/app/ui/setting/edit-account-form'
export default function EditAccount() {

    return (
        <div className="flex flex-row justify-center">
            <div className='max-w-2xl p-6 space-y-4'>
                <Breadcrumbs
                    breadcrumbs={[
                        { label: 'Home', href: '/home' },
                        { label: 'Settings', href: '/home/setting' },
                        { label: 'Edit Profile', href: '/home/setting/edit-profile', active: true },
                    ]}
                />
                <EditAccountForm />
            </div>
        </div>
    )
}
