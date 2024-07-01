import { crawlPage } from './crawl.js'
import { printReport } from './report.js'

async function main() {
    if (process.array.length < 3) {
        console.log('no website provided for crawling')
        return
    }
    if (process.array.length > 3) {
        console.log('too many arguments provided, only 3 arguments expected')
        return
    }
    const base = process.argv[2]

    console.log(`starting web crawl of: ${base}...`)

    const pages = await crawlPage(base)

    printReport(pages)
}


main()
