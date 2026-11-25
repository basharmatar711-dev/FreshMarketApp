import type { DeliveryCheckResult } from './WelcomeScreen'

/**
 * Demo stand-in for `GET /api/delivery/coverage?postcode=…`. Replace with the real API call.
 *   2000–2099 -> available · "0000" -> simulated network error · anything else -> unavailable
 */
export async function mockCheckDelivery(postcode: string): Promise<DeliveryCheckResult> {
  await new Promise((r) => setTimeout(r, 600))
  if (postcode === '0000') throw new Error('Network error')
  const n = Number(postcode)
  if (n >= 2000 && n <= 2099) return { status: 'available', postcode, nextSlot: 'Today, 4–6 PM' }
  return { status: 'unavailable', postcode }
}
