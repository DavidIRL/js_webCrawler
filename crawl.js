import { JSDOM } from 'jsdom'


function getURLsFromHTML(html, baseURL) {
  const urls = []
  const dom = new JSDOM(html)
  const anchors = dom.window.document.querySelectorAll('a')

  for (const anchor of anchors) {
    if (anchor.hasAttribute('href')) {
      let href = anchor.getAttribute('href')

      try {
        // convert any relative URLs to absolute URLs
        href = new URL(href, baseURL).href
        urls.push(href)
      } catch(err) {
        console.log(`${err.message}: ${href}`)
      }
    }
  }

  return urls
}


function normalizeURL(url) {
  const urlObj = new URL(url)
  let fullPath = `${urlObj.host}${urlObj.pathname}`
  if (fullPath.slice(-1) === '/') {
    fullPath = fullPath.slice(0, -1)
  }
  return fullPath
}


async function fetchHTML(url) {
  let result
  try {
    result = await fetch(url)
  } catch (err) {
    throw new Error(`Got Network error: ${err.message}`)
  }

  if (result.status > 399) {
    throw new Error(`Got HTTP error: ${result.status} ${result.statusText}`)
  }

  const contentType = result.headers.get('content-type')
  if (!contentType || !contentType.includes('text/html')) {
    throw new Error(`Got non-HTML response: ${contentType}`)
  }

  return result.text()
}

// use default args to prime the first call
async function crawlPage(base, currentURL = base, pages = {}) {
  // if this is an offsite URL, bail immediately
  const currentObj = new URL(currentURL)
  const baseObj = new URL(base)
  if (currentObj.hostname !== baseObj.hostname) {
    return pages
  }

  // use a consistent URL format
  const normalizedURL = normalizeURL(currentURL)

  // if we've already visited this page
  // just increase the count and don't repeat
  // the http request
  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++
    return pages
  }

  // initialize this page in the map
  // since it doesn't exist yet
  pages[normalizedURL] = 1

  // fetch and parse the html of the currentURL
  console.log(`crawling ${currentURL}`)
  let html = ''
  try {
    html = await fetchHTML(currentURL)
  } catch (err) {
    console.log(`${err.message}`)
    return pages
  }

  // recur through the page's links
  const nextURLs = getURLsFromHTML(html, base)
  for (const nextURL of nextURLs) {
    pages = await crawlPage(base, nextURL, pages)
  }

  return pages
}

export {normalizeURL, getURLsFromHTML}

