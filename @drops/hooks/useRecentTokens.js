import { useState, useEffect } from 'react'

export function useRecentTokens({ url, start = 0, end = 0, reverse = false }) {
  const [isLoading, setIsLoading] = useState(true)
  const [tokens, setTokens] = useState([])

  const getTokens = async ({ url, start, end, reverse }) => {
    // react-query / cache this part?
    let tokens = []
    try {
      tokens = await fetch(`${url}${start}...${end}`).then((r) => r.json())
      if (tokens.error) tokens = []
      if (!Array.isArray(tokens)) tokens = [tokens]
    } catch (e) {}
    setTokens(reverse ? tokens.reverse() : tokens)
    setIsLoading(false)
  }

  useEffect(() => {
    getTokens({ url, start, end, reverse })
  }, [])

  const update = ({ start, end }) => getTokens({ url, start, end, reverse })

  return {
    isLoading,
    tokens,
    update
  }
}
