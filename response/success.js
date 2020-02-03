exports.buildResponse = (res) => ({
    statusCode : 200,
    body : JSON.stringify(res),
    headers : {'Access-Control-Allow-Origin' : '*'},
})