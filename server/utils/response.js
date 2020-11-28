const successResponse = (res, status, body, message) => {
  res.status(status).json({
    message: message,
    body: body
  })
}

module.exports = successResponse