import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey)

export interface SessionPayload {
  userId: string
  email: string
  expiresAt: Date
}

export async function createSession(userId: string, email: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  const session = await new SignJWT({ userId, email, expiresAt })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(encodedKey)

  const cookieStore = await cookies()
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.ENVIRONMENT === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  })

}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const cookie = cookieStore.get("session")?.value

  if (!cookie) return null

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ["HS256"],
    })
    return payload as unknown as SessionPayload
  } catch (error) {
    console.error("Failed to verify session:", error)
    return null
  }
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}