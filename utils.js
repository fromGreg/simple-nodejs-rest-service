
function aggregateReqData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', chunk => body += chunk.toString());
            req.on('end', () => resolve(body));
        } catch (error) {
            reject(error);
        }
    });
}
const responseData = {
    getData: {
        id: 1,
        msg: 'Successfully received GET request'
    },
    postData: {
        id: 2,
        msg: 'Successfully received POST request'
    },
    patchData: {
        id: 3,
        msg: 'Successfully received PATCH request'
    },
    putData: {
        id: 4,
        msg: 'Successfully received PUT request'
    },
    updateData: {
        id: 5,
        msg: 'Successfully received UPDATE request'
    },
    deleteData: {
        id: 6,
        msg: 'Successfully received DELETE request'
    },
};
module.exports = { aggregateReqData, responseData };