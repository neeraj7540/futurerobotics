const boom = require('boom');

const get = (res,status, message, resData) => {
  return res.json({
    status : status,
    message: message,
    body: resData
  });
}

const post = (res,status, message, resData) => {
  return res.json({

    status : status,
    message: message,
    body: resData
  });
}

const del = (res, status, message,resData) => {
  return res.json({
    status : status,
    message: message,
    body: resData
  });
}

const put = (res, status, message, resData) => {
  return res.status(200).json({
    status : status,
    message: message,
    body: resData
  });
}

const getError = (status,message,err) => {
  return {
    status:status,
    message: err,
    body: {}
  };
}

const unauthorized = (res,status, data) => {
  return res.status(401).json({
    status:status,
    message: 'User is Unauthorized',
    body: data
  });
}

const onError = (res,status, err, message) => {
  console.log(err);
 // console.log(boom.badRequest(message));
 //console.log(getError(message));
  return res.status(400).json(getError(status,message,err,message));
}

const noData = (res,status, err, message) => {
  return res.status(204).json({
    status:status,
    message: 'User is Unauthorized',
    body: {}
  });
}

module.exports = {
  get,
  post,
  put,
  del,
  onError,
  noData,
  unauthorized
}