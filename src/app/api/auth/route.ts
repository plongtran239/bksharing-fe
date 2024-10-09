export const POST = async (request: Request) => {
  const res = await request.json();

  const sessionToken = res.sessionToken;
  const role = res.role;

  if (!sessionToken) {
    return Response.json(res, {
      status: 401,
    });
  }

  return Response.json(res, {
    status: 200,
    headers: {
      "Set-Cookie": [
        `sessionToken=${sessionToken}; HttpOnly; Path=/; SameSite=Strict; Secure`,
        `role=${role}; HttpOnly; Path=/; SameSite=Strict; Secure`,
      ].join(", "),
    },
  });
};
