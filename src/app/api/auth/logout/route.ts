import { cookies } from "next/headers";

export const POST = async () => {
  const cookieStore = cookies();

  const sessionToken = cookieStore.get("sessionToken");

  if (!sessionToken) {
    return Response.json(
      {
        message: "You are not logged in!",
      },
      {
        status: 401,
      }
    );
  }

  return Response.json(
    {
      message: "Logout successfully!",
    },
    {
      status: 200,
      headers: {
        "Set-Cookie": [
          `sessionToken=; HttpOnly; Path=/; SameSite=Strict; Secure`,
          `role=; HttpOnly; Path=/; SameSite=Strict; Secure`,
        ].join(", "),
      },
    }
  );
};
