const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    console.log(error.message)
    if (error.name === 'CastError' && error.kind === 'ObjectID') {
        return res.status(404).send({ error: 'Malformatted ID' })
    }

    next(error)
}

// Logging here as well

module.exports = {
    unknownEndpoint,
    errorHandler
}
