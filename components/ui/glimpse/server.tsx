const TITLE_REGEX = /<title[^>]*>([^<]+)<\/title>/
const OG_TITLE_REGEX = /<meta[^>]*property="og:title"[^>]*content="([^"]+)"/
const DESCRIPTION_REGEX = /<meta[^>]*name="description"[^>]*content="([^"]+)"/
const OG_DESCRIPTION_REGEX =
  /<meta[^>]*property="og:description"[^>]*content="([^"]+)"/
const OG_IMAGE_REGEX = /<meta[^>]*property="og:image"[^>]*content="([^"]+)"/

const EMPTY_GLIMPSE = {
  title: null,
  description: null,
  image: null,
} as const

const resolveUrl = (baseUrl: string, relativeUrl: string): string => {
  try {
    return new URL(relativeUrl, baseUrl).href
  } catch {
    return relativeUrl
  }
}

const extractContent = (match: RegExpMatchArray | null): string | null => {
  return match?.at(1) ?? null
}

export const glimpse = async (url: string) => {
  try {
    // Add timeout to prevent hanging requests
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; LinkPreview/1.0)" },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      return EMPTY_GLIMPSE
    }

    const data = await response.text()
    const titleMatch = data.match(TITLE_REGEX) || data.match(OG_TITLE_REGEX)
    const descriptionMatch =
      data.match(DESCRIPTION_REGEX) || data.match(OG_DESCRIPTION_REGEX)
    const imageMatch = data.match(OG_IMAGE_REGEX)

    const imageUrl = extractContent(imageMatch)
    const resolvedImageUrl = imageUrl
      ? resolveUrl(url, imageUrl)
      : "https://placehold.co/1200x630?text=Preview+Not+Found"

    return {
      title: extractContent(titleMatch),
      description: extractContent(descriptionMatch),
      image: resolvedImageUrl,
    }
  } catch (error) {
    // Silently handle fetch errors (network issues, timeouts, invalid URLs, etc.)
    return EMPTY_GLIMPSE
  }
}
