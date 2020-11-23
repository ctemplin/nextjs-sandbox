import getAuthHeaders from '../../../../lib/podcastindex-api-auth-token.js'

export default async function handler(req, res) {
    var json
    try {
        const pdiReq  = await fetch(
            "https://api.podcastindex.org/api/1.0/recent/feeds?max=20&lang=en",
            {
                method: 'GET',
                headers: getAuthHeaders()
            }
        );
        json = await pdiReq.json()
    } catch (error) {
        console.log(error)
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(json))
}
