onmessage = function (e) {
    let seconds = +e.data
    let timeout = null

    // prevent render timer with 00 counts
    if (seconds === 0) return postMessage([])

    const counts = [
        { count: 'day', sec: 86400 },
        { count: 'hour', sec: 3600, div: 24 },
        { count: 'min', sec: 60, div: 60 },
        { count: 'sec', sec: 1, div: 60 },
    ]

    const renderCounts = (seconds) => {
        let secondsLeft = seconds
        let result = []

        counts.reduce((acc, cur) => {
            const count = cur.count
            let divider = !cur.div ? Math.ceil(secondsLeft / cur.sec) : Math.ceil((secondsLeft / cur.sec) % cur.div)
            if (divider <= 9) divider = `0${divider}`
            result.push({ count, divider })
            return acc -= cur.sec // decrease seconds diff on each iteration
        }, secondsLeft)

        return result
    }

    // starts & clear timeout    
    (function() {
        clearTimeout(timeout)
        timeout = setTimeout(() => postMessage(renderCounts(seconds)), 1000)
    })()
}