import { useGetToken } from "@/hooks/use-get-token";

export const POST = async () => {
  const sessionToken = useGetToken();

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
