"use client";
import ManagePostsBoosting from "@/app/ui/post/manage-posts-boost";
import Breadcrumbs from "@/app/ui/setting/breadcrumbs";
import React from "react";
export default function ManagePostsPage() {
	return (
        <div className="flex flex-row justify-center">
            <div className="p-6 md:min-w-[550px] lg:w-1/2 xl:w-1/3">
                <Breadcrumbs
                    breadcrumbs={[
                        { label: "Home", href: "/home" },
                        { label: "Settings", href: "/home/setting" },
                        {
                            label: "Manage Posts",
                            href: "/home/setting/manage-posts",
                            active: true,
                        },
                    ]}
                />

                <div className="w-full rounded-md bg-white sm:w-3/4 md:w-full">
                    <ManagePostsBoosting />
                </div>
            </div>

        </div>
	);
}
