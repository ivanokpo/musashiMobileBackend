import * as cheerio from 'cheerio';
import axios from 'axios';
import express from 'express'
import {db, Table} from './db.config.js'
import dotenv from 'dotenv'



const app = express()
const url = 'https://www.goodreads.com/author/quotes/8330589.Miyamoto_Musashi?page='
dotenv.config()

const webScrape = async () => {
    for (let i =1; i < 9; i++){
        
                       
                        
        axios(url + `${i}`)
            .then( response => {
                console.log(`--------- Page: ${i} --------`)
                const html = response.data
                const $ = cheerio.load(html)
                const quotes = []
                // console.log(`--------- Page: ${i} --------`)
                // const params = {
                //                     TableName: Table,
                //                     Item: {"id": i,
                //                             "quote": `hi`,
                                            
                //                         }
                //                 }
                        
                //             await db.put(params).promise()
                

                $('.quoteText', html).each( async function() {

                    let quote = $(this).text() 
                    
                    quotes.push({
                        quote
                    })
                })
                
                quotes.forEach( async (quote, index) => {
                    
                    quote = JSON.stringify(quote)
                    quote = quote.replace(/(\\n)/g, "").substring(quote.indexOf('"'),quote.lastIndexOf('.')).replace('"quote":"','').replace('{','')
                    console.log(`page: ${i}, quote:` + quote)
                    const params = {
                            TableName: Table,
                            Item: {"id": index,
                                    "quote": `${quote}`,
                                    
                                }
                        }
                
                    await db.put(params).promise()
                
                    
                
            }
            )
                

            } ).catch(err => console.log(err))

    }
}

webScrape();


const PORT = 3001
app.listen(PORT)
//console.log(`Server running on port ${PORT}`)
 // if(quote.includes(".")){

                    //     console.log(quote.substring(quote.indexOf('"'),quote.lastIndexOf('.') + 2));
                    // } else {

                    //     console.log(quote.substring(quote.indexOf('"'),quote.length + 1))
                    // } 
                    
                    //console.log(quotes)
                

                // quotes.map(async (quote) => {
                    // })
                //console.log(quotes)