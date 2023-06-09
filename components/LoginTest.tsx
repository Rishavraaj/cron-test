import { signIn, signOut, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getProviders } from "next-auth/react";

export default function page() {
  const { data: session, status } = useSession();

  console.log(session);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const email = session?.user?.email;

  return (
    <div>
      {!session && (
        <>
          <h3>{session}</h3>
          <button onClick={() => signIn("google")}>Sign in </button>
        </>
      )}

      {session && (
        <>
          <h3>{session?.user?.name}</h3>
          <h3>{session.user?.email}</h3>
          <h3>{session.user?.image}</h3>
          <button onClick={() => signOut()}>Sign out pls</button>
        </>
      )}
    </div>
  );
}

// export async function getServerSideProps() {
//   const providers = await getProviders();
//   return {
//     props: { providers },
//   };
// }
