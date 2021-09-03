//Helper that builds an http response and sends it, so that controllers don't have to worry about it
export default function makeExpressCallback(controller) {
  return (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
      },
    }
    controller(httpRequest)
      .then((httpResponse) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers)
        }
        res.type('json')
        res.status(httpResponse.statusCode).send(httpResponse.body)
      })
      .catch((e) =>
        res.status(500).send({ error: 'An unkown error occurred.' })
      )
  }
}
