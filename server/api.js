const PORT = 8000;
const { response } = require('express');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.use(express.json({limit:'1mb'}));

const Alpaca = require('@alpacahq/alpaca-trade-api');


// !!!!! Endpoint Request & Responses !!!!!


app.post('/', (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    
    if (process.env.DB_USER === username && process.env.DB_PASS === password) {
        const alpaca = new Alpaca({
            keyId: process.env.ALPACA_API_KEY, 
            secretKey: process.env.ALPACA_SECRET_KEY, 
            paper: true});

            alpaca.getAccount().then((account) => {
                response.json(account);
                })
    }else {
        response.json('fail');
    }
});












app.listen(PORT, () => console.log(`server running on PORT: ${PORT}`));
