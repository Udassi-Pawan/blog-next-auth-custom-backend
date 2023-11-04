"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const [response, setResponse] = useState<string | null>(null);
  const { data: session } = useSession();
  console.log(session);
  const sendHandler = async function () {
    console.log("sent", session);
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/access`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${session?.authToken}`,
        },
      }
    );
    const res = await result.json();
    console.log(res);
    setResponse(res.data);
  };
  return (
    <div className="flex flex-col gap-20 justify-center items-center h-screen">
      {session?.user && (
        <div className="flex flex-col gap-8">
          <p>You are signed in right now</p>
          <button
            onClick={async () => await signOut()}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 ease-in-out"
          >
            Sign Out
          </button>
        </div>
      )}

      {!session?.user && (
        <div className="flex flex-col gap-8">
          <p>You are not signed in right now</p>
          <button
            onClick={async () => await signIn("google")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-full flex items-center justify-center gap-2 transition-colors duration-300 ease-in-out"
          >
            <h1 className="text-xl">Sign In</h1>
          </button>
        </div>
      )}

      <p className="text-3xl text-center">
        {response
          ? response
          : "Send request now to check if you are authorised"}
      </p>
      <button
        onClick={sendHandler}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 ease-in-out"
      >
        <p className="text-xl">Send Request</p>
      </button>
    </div>
  );
}
