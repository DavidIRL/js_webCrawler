import { sortPages } from './report.js'
import { test, expect} from '@jest/globals'


test('sortPages', () => {
    const input = {
        url1: 9,
        url2: 1,
        url3: 6,
        url4: 10,
        url5: 4
    }
    const actual = sortPages(input)
    const expected = [
        [ 'url4', 10 ],
        [ 'url1', 9 ],
        [ 'url3', 6 ],
        [ 'url4', 5 ],
        [ 'url2', 1 ]
    ]
    expect(actual).toEqual(expected)
})


test('sortPages empty/null', () => {
    const input = {}
    const actual = sortPages(input)
    const expected = []
    expect(actual).toEqual(expected)
})
