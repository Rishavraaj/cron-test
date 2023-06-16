import { signIn, signOut, useSession } from "next-auth/react";

export default function page() {
  const { data: session, status } = useSession();

  console.log(session);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const email = session?.user?.email;

  const ends = email?.substring(email?.lastIndexOf("@") + 1);

  console.log(ends);

  if (ends === "test.com") {
  }

  return (
    <div>
      {!session && (
        <>
          <h3>{session}</h3>
          <button onClick={() => signIn()}>Sign in </button>
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

// export async function getServerSideProps(context) {
//   const session = await unstable_getServerSession(
//     context.req,
//     context.res,
//     authOptions
//   );

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/api/auth/signin",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {
//       session,
//     },
//   };
// }
