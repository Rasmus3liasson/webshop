export async function POST(request: Request) {
  try {
    const { data } = await request.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Felaktig" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 400,
    });
  }
}

// route to retrevie data from database later on
export async function GET(request: Request) {
  try {
    const mockData = {
      hej: "nils",
    };
    return new Response(JSON.stringify(mockData), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
