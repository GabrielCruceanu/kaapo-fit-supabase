import { User } from "@supabase/auth-helpers-nextjs";
import { GetStaticProps } from "next";
import { supabase } from "#/utils/supabase";

export default function ProtectedPage({ user }: { user: User }) {
  return (
    <>
      {/*<div>Protected content for {user.email}</div>*/}
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) console.log("error get lesson from [id]", error);

  return {
    props: {
      user,
    },
  };
};
