import { normalizeURL, getURLsFromHTML } from './crawl.js'
import { test, expect } from '@jest/globals'

test('normalizeURL protocol', () => {
  const input = 'https://rickroll.it/rickroll.mp4'
  const actual = normalizeURL(input)
  const expected = 'rickroll.it/rickroll.mp4'
  expect(actual).toEqual(expected)
})

test('normalizeURL slash', () => {
  const input = 'https://rickroll.it/rickroll.mp4/'
  const actual = normalizeURL(input)
  const expected = 'rickroll.it/rickroll.mp4'
  expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
  const input = 'https://RICKROLL.it/rickroll.mp4'
  const actual = normalizeURL(input)
  const expected = 'rickroll.it/rickroll.mp4'
  expect(actual).toEqual(expected)
})

test('normalizeURL proto', () => {
  const input = 'ftp://rickroll.it/rickroll.mp4'
  const actual = normalizeURL(input)
  const expected = 'rickroll.it/rickroll.mp4'
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute', () => {
  const inputURL = 'https://rickroll.it/rickroll.mp4'
  const inputBody = '<html><body><a href="https://rickroll.it/blog"><span>Rickroll></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://rickroll.it/' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
  const inputURL = 'https://rickroll.it/'
  const inputBody = '<html><body><a href="/path/blog"><span>Rickblogged></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://rickroll.it/path/blog' ]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
  const inputURL = 'https://rickroll.it'
  const inputBody = '<html><body><a href="/path/blog"><span>Rickroll></span></a><a href="https://other.com/path/videos"><span>Other Videos></span></a></body></html>'
  const actual = getURLsFromHTML(inputBody, inputURL)
  const expected = [ 'https://rickroll.it/path/blog', 'https://other.com/path/videos' ]
  expect(actual).toEqual(expected)
})

