'use client'
import { SettingButton } from "@/app/ui/setting/button";
import { CircleUserRound, CreditCard,SlidersHorizontal,LanguagesIcon} from "lucide-react";
import { usePathname } from "next/navigation";



export default function SettingsPage() {
    const pathname = usePathname();
    return (<>

        <div className="max-w-2xl mx-auto p-6 space-y-2">
            <SettingButton href={pathname}><CircleUserRound className="w-6 h-6 text-gray-600" />
                <span className="text-sm font-medium">My Account</span></SettingButton>
            <SettingButton href={pathname}><SlidersHorizontal className="w-6 h-6 text-gray-600" />
                <span className="text-sm font-medium">Preferences</span></SettingButton>


            <SettingButton href={pathname + '/payment'}><CreditCard className="w-6 h-6 text-gray-600" />
                <span className="text-sm font-medium">Payment</span></SettingButton>



            <SettingButton href={pathname}><LanguagesIcon className="w-6 h-6 text-gray-600" />
                <span className="text-sm font-medium">Languages</span></SettingButton>

        </div >
    </>
    );
};

// export default SettingsPage;
