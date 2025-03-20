'use client'
import Breadcrumbs from "@/app/ui/setting/breadcrumbs";
import { SettingButton } from "@/app/ui/setting/button";
import { CircleUserRound, CreditCard, SlidersHorizontal, BellIcon, LockIcon,BadgeAlert } from "lucide-react";
import { usePathname } from "next/navigation";



export default function SettingsPage() {
    const pathname = usePathname();
    return (<>

        <div className="max-w-7/12 mx-auto p-6 space-y-2">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Home', href: '/home' },
                    {
                        label: 'Settings',
                        href: '/home/setting',
                        active: true,
                    },
                ]}
            />
            <SettingButton href={pathname + '/edit-profile'}><CircleUserRound className="w-6 h-6 text-gray-600" />
                <span className="text-sm font-medium">Edit Profile</span></SettingButton>
            <SettingButton href={pathname}><SlidersHorizontal className="w-6 h-6 text-gray-600" />
                <span className="text-sm font-medium">Preferences</span></SettingButton>


            <SettingButton href={pathname + '/payment'}><CreditCard className="w-6 h-6 text-gray-600" />
                <span className="text-sm font-medium">Payment</span></SettingButton>

            <SettingButton href={pathname + '/privacy-security'}><LockIcon className="w-6 h-6 text-gray-600" />
                <span className="text-sm font-medium">Privacy & Security</span></SettingButton>

            <SettingButton href={pathname}><BellIcon className="w-6 h-6 text-gray-600" />
                <span className="text-sm font-medium">Notifications</span></SettingButton>

            <SettingButton href={pathname + '/report'}><BadgeAlert className="w-6 h-6 text-gray-600" />
                <span className="text-sm font-medium">Report Problem</span></SettingButton>


        </div >
    </>
    );
};