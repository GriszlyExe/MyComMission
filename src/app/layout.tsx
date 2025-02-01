"use client"

import "@/app/ui/global/globals.css";
// import { Metadata } from "next";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/states/store";
// import { SessionProvider } from 'next-auth/react'

// export const metadata: Metadata = {
//   title: {
//     template: "%s | Lorem",
//     default: "Lorem",
//   },
//   description: "The official Next.js Course Dashboard, build with App Router.",
//   metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {/* <SessionProvider>{children}</SessionProvider> */}
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
