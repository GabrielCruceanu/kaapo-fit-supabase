import { Session } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { AppProps } from "next/app";
import { Auth } from "@supabase/ui";
import "#/styles/globals.css";
import { useRouter } from "next/router";
import { supabase } from "#/utils/supabase";

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [userLoaded, setUserLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [userRoles, setUserRoles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUserLoaded(session ? true : false);
      if (session?.user) {
        // signIn();
        router.push("/channels/[id]", "/channels/1");
      }
    });

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      const currentUser = session?.user;
      setUser(currentUser ?? null);
      setUserLoaded(!!currentUser);
      if (currentUser) {
        signIn(currentUser.id, currentUser.email);
        router.push("/channels/[id]", "/channels/1");
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Component {...pageProps} />
    </Auth.UserContextProvider>
  );
}
