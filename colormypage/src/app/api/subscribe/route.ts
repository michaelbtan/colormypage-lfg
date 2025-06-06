import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json() as { email?: string };

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    const beehiivRes = await fetch(
      `https://api.beehiiv.com/v2/publications/${process.env.NEXT_PUBLIC_BEEHIIV_PUBLICATION_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({ email, send_welcome_email: true }),
        cache: "no-store",
      },
    );

    const data = await beehiivRes.json();

    if (!beehiivRes.ok) {
      // log for server-side debugging
      console.error("Beehiiv error", beehiivRes.status, data);

      // forward details to the client
      return NextResponse.json(
        { message: data?.message ?? `Beehiiv responded ${beehiivRes.status}` },
        { status: beehiivRes.status },
      );
    }

    return NextResponse.json({ message: "Successfully subscribed" })
    } catch (error) {
      console.error("Subscription error", error);
      return NextResponse.json(
        { message: "An error occurred while subscribing. Please try again later." },
        { status: 500 },
      );
    }
  }