
const http = require('http');
const { aggregateReqData, responseData } = require('./utils')

const PORT = 5000;

const server = http.createServer(async (req, res) => {
    try {
        // simple GET endpoint
        if (req.url === '/get' && req.method === 'GET') {
            console.log('Successfully received GET request');
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(responseData.getData));
        } else

        // simple POST endpoint
        if (req.url === '/post' && req.method === 'POST') {
            const raw = await aggregateReqData(req);
            const parsed = JSON.parse(raw);
            console.log('Successfully received POST request with data:');
            console.log(parsed);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(responseData.postData));
        } else

        // simple PATCH endpoint
        if (req.url.match(/\/patch\/[0-9]+/) && req.method === 'PATCH') {
            const id = req.url.split('/')[2];
            const raw = await aggregateReqData(req);
            const parsed = JSON.parse(raw);
            console.log(`Successfully received PATCH request, patching id ${id} with data:`);
            console.log(parsed);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(responseData.patchData));
        } else

        // simple DELETE endpoint
        if (req.url.match(/\/delete\/[0-9]+/) && req.method === 'DELETE') {
            const id = req.url.split('/')[2];
            console.log(`Successfully received DELETE request for deleting id ${id}`);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(responseData.getData));
        } else

        // invalid request
        {
            console.log(`received ${req.method} via invalid url \"${req.url}\"`);
            res.writeHead(404, {'Content-Length': 0});
            res.end();
        }

    } catch (error) {
        const err = {error: 'request handling failed', reason: error, method: req.method, url: req.url};
        console.error(err);
        console.error('Received raw data:');
        const raw = await aggregateReqData(req);
        console.error(raw);
        res.writeHead(400, { 'Content-Type': 'application/json'});
        res.end(JSON.stringify(err));
    }
});

server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});