'use client'
import ManagePostsBoosting from '@/app/ui/post/manage-posts-boost'
import Breadcrumbs from '@/app/ui/setting/breadcrumbs'
import React from 'react'
export default function ManagePostsPage() {
  return (


    <div className='max-w-2xl mx-auto p-6 space-y-4'>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Home', href: '/home' },
                    { label: 'Settings', href: '/home/setting' },
                    { label: 'Manage Posts', href: '/home/setting/manage-posts', active: true },
                ]}
            /> 

                <div className='w-full sm:w-3/4 bg-white rounded-md'>
                <ManagePostsBoosting/>
                </div>
    </div>
  )
}
