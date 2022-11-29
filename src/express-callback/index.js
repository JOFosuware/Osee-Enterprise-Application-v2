module.exports = function makeExpressCallback(controller){
    return (req, res) => {
        const httpRequest = {
            data: req.body,
            serial: req.query.serial,
            username: req.query.username,
            clientId: req.query.id ? parseInt(req.query.id) : undefined,
            buffer: req.file ? req.file.buffer : null
        }

        console.log('Request ip',req.ip)

        controller(httpRequest)
            .then(httpResponse => {
                    res.status(httpResponse.statusCode).send(httpResponse.body) 
            })
            .catch(e => res.status(500).send({error: e.message}))
    } 
}