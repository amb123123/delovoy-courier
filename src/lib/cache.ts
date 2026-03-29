import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

const CACHE_TTL_SECONDS = 24 * 60 * 60 // 24 hours

export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const data = await redis.get<T>(key.toLowerCase())
    return data
  } catch (e) {
    console.error('Redis get error:', e)
    return null
  }
}

export async function setCached<T>(key: string, data: T): Promise<void> {
  try {
    await redis.set(key.toLowerCase(), data, { ex: CACHE_TTL_SECONDS })
  } catch (e) {
    console.error('Redis set error:', e)
  }
}
