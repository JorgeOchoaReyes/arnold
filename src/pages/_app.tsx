import { GeistSans } from "geist/font/sans";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { ThemeProvider } from "~/components/sidebar/theme-provider";  
import { Toaster } from "~/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { api } from "~/utils/api";  

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >  
          <div className={GeistSans.className}>
            <Component {...pageProps} />
            <Toaster />
          </div> 
        </ThemeProvider>
      </SessionProvider> 
      <Analytics />
    </>
  );
};

export default api.withTRPC(MyApp);
