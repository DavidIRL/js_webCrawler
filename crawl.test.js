const { normalizeURL } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL stripped', () => {
    const input = 'https://rickroll.it/rickroll.mp4'
    const actual = normalizeURL(input)
    const expected = 'rickroll.it/rickroll.mp4'
    expect(actual).toEqual(expected)
})


test('normalizeURL trailingSlash', () => {
    const input = 'https://rickroll.it/rickroll.mp4/'
    const actual = normalizeURL(input)
    const expected = 'rickroll.it/rickroll.mp4'
    expect(actual).toEqual(expected)
})


test('normalizeURL UPPER', () => {
    const input = 'https://RICKROLL.it/rickroll.mp4/'
    const actual = normalizeURL(input)
    const expected = 'rickroll.it/rickroll.mp4'
    expect(actual).toEqual(expected)
})


test('normalizeURL strip proto', () => {
    const input = 'ftp://rickroll.it/rickroll.mp4/'
    const actual = normalizeURL(input)
    const expected = 'rickroll.it/rickroll.mp4'
    expect(actual).toEqual(expected)
})
