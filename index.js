const cheerio = require("cheerio");
const axios = require("axios");
const express = require('express')

const app = express()
const url = 'https://www.goodreads.com/author/quotes/8330589.Miyamoto_Musashi'

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const quotes = []

        $('.quoteDetails', html).each(function() {

            const quote = $(this).children().first().text()
           
            //console.log($(this))
            quotes.push({
                quote
            })

            if(quote.includes(".")){
                console.log(quote.substring(quote.indexOf('"'),quote.lastIndexOf('.') + 2));
            } else {
                console.log(quote.substring(quote.indexOf('"'),quote.length + 1))
            } 
            
            console.log("quote:")
        })
        //console.log(quotes)
        

    } )

const PORT = 3001
app.listen(PORT)
//console.log(`Server running on port ${PORT}`)