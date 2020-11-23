let sha1 = require('sha1');

export default function () {
    const unixtime = Math.floor(Date.now() / 1000);
    const key = process.env.PODCASTINDEX_API_KEY;
    const secret = process.env.PODCASTINDEX_API_SECRET;
    const hash = sha1(key + secret + unixtime.toString());

    return {
        "X-Auth-Date": unixtime,
        "X-Auth-Key": key,
        "Authorization": hash
    }
}