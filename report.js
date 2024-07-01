// Takes a directory of pages and prints to console
// in a human-friendly format

function printReport(pages) {
    console.log('==========')
    console.log('  REPORT  ')
    console.log('==========')

    const sortedPages = sortPages(pages)
    for (const sortedPage of sortedPages) {
        const url = sortedPage[0]
        const count = sortedPage[1]
        console.log(`Found ${count} internal links to ${url}`)
    }
}


function sortPages(pages) {
    const pagesArr = Object.entries(pages)
    pagesArr.sort((page1, page2)) => {
        if (page2[1] === page1[1]) {
            return page1[0].localeCompare(pages2[0])
        }
        return page2[1] - page1[1]
    })
    return pagesArr
}


module.export = {
        sortPages,
        printReport,
}
