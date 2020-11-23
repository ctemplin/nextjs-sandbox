let sha1 = require('sha1');
let fetch = require('node-fetch')

exports.handler = async function(event, context) {

    // TODO: move to shared location
    const unixtime = Math.floor(Date.now() / 1000);
    const key = process.env.PODCASTINDEX_API_KEY;
    const secret = process.env.PODCASTINDEX_API_SECRET;
    const hash = sha1(key + secret + unixtime.toString());
    var authHeaders = {
        "X-Auth-Date": unixtime,
        "X-Auth-Key": key,
        "Authorization": hash
    }

    var json
    try {
        const pdiReq  = await fetch(
            "https://api.podcastindex.org/api/1.0/recent/feeds?max=20&lang=en",
            {
                method: 'GET',
                headers: authHeaders
            }
        );
        json = await pdiReq.json()
    } catch (error) {
        console.log(error)
    }

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json.feeds)
    };
}
