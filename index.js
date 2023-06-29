import * as cheerio from 'cheerio';
import axios from 'axios';
import express from 'express'
import {db, Table} from './db.config.js'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes.js'



const app = express()
const url = 'https://www.goodreads.com/author/quotes/8330589.Miyamoto_Musashi?page='
dotenv.config()

// const webScrape = async () => {
//     for (let i =1; i < 9; i++){                    
//         axios(url + `${i}`)
//             .then( response => {
//                 console.log(`--------- Page: ${i} --------`)
//                 const html = response.data
//                 const $ = cheerio.load(html)
//                 const quotes = []
//                 $('.quoteText', html).each( async function() {

//                     let quote = $(this).text()    
//                     quotes.push({
//                         quote
//                     })
//                 })
                
//                 quotes.forEach( async (quote, index) => {
                    
//                     quote = JSON.stringify(quote)
//                     quote = quote.replace(/(\\n)/g, "").substring(quote.indexOf('"'),quote.lastIndexOf('.')).replace('"quote":"','').replace('{','')
//                     console.log(`page: ${i}, quote:` + quote)
//                     const params = {
//                             TableName: Table,
//                             Item: {"id": index,
//                                     "quote": `${quote}`,
                                    
//                                 }
//                         }
                
//                     await db.put(params).promise()
                
                    
                
//             }
//             )
                

//             } ).catch(err => console.log(err))

//     }
// }

// webScrape();
//installs the cors package, allowing for communication between the client and server
app.use(cors({}))

//middleware for incoming request bodies
app.use(bodyParser.json())

//the home page address
app.use('/', routes)

//port
const PORT = 3001

//app listening on port 3001 for incoming requests
app.listen(PORT, () => {
    console.log(`Port listening on ${PORT}`)
})
