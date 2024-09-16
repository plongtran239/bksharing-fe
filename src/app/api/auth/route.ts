export const POST = async (request: Request) => {
  const res = await request.json();

  const sessionToken = res.sessionToken as string;

  return Response.json(res, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly`,
    },
  });
};
