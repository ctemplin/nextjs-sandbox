let sha1 = require('sha1');

exports.handler = async function(event, context) {
    const unixtime = Date.now()
    const key = process.env.PODCASTINDEX_API_KEY
    const secret = process.env.PODCASTINDEX_API_SECRET
    const hash = sha1(key + secret + unixtime)

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                "X-Auth-date": unixtime,
                "X-Auth-Key": key,
                "Authorization": hash
            }
        )
    };
}
