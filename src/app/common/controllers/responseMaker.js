//Helper that builds a json response
function makeError(message = 'An unexpected error has occurred', status = 400) {
  return {
    headers: {
      'Content-Type': 'application/json',
      statusCode: status,
    },
    body: {
      error: message,
    },
  };
}
function makeSuccess(body = {}, status = 200) {
  {
    return {
      headers: {
        'Content-Type': 'application/json',
        statusCode: status,
      },
      body: {
        ...body,
      },
    };
  }
}

const responseMaker = {
  makeError,
  makeSuccess,
};

module.exports = responseMaker;
