import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  const { email } = req.body

  if (!email) {
    return res.status(400).json({ message: "Email is required" })
  }

  try {
    const beehiivResponse = await fetch("https://api.beehiiv.com/v2/subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        publication_id: process.env.BEEHIIV_PUBLICATION_ID,
        send_welcome_email: true,
      }),
    })

    const data = await beehiivResponse.json()

    if (!beehiivResponse.ok) {
      return res.status(500).json({ message: data.message || "Beehiiv API error" })
    }

    return res.status(200).json({ message: "Successfully subscribed" })
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}
