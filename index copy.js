import * as cheerio from 'cheerio';
import axios from 'axios';
import express from 'express'
import {db, Table} from './db.config.js'
import dotenv from 'dotenv'



const app = express()
const url = 'https://www.goodreads.com/author/quotes/8330589.Miyamoto_Musashi?page='
dotenv.config()

const webScrape = () => {
    for (let i =1; i < 9; i++){
        const params = {
                                    TableName: Table,
                                    Item: {"id": i,
                                            "quote": `hello i am number ${i}`,
                                            
                                        }
                                }
                        try{
                            await db.putItem(params).promise()
                            return { success: true }
                        } catch(error){
                            return { success: false}
                        }
        // axios(url + `${i}`)
        //     .then(response => {
        //         console.log(`--------- Page: ${i} --------`)
        //         const html = response.data
        //         const $ = cheerio.load(html)
        //         const quotes = []

        //         $('.quoteDetails', html).each( async function() {

        //             const paramsForId = {
        //                 TableName: Table
        //             }
        //             const { Items = [] } =   await db.scan(paramsForId).promise()
        //             const generateId = () => {
        //                 const maxId = Items.length > 0
        //                 ? Math.max(...Items.map(n => n.id))
        //                 : 0
        //                 return maxId + 1
        //             }

        //             let quote = $(this).children().first().text()  
        //             quotes.push({
        //                 quote
        //             })
        //             // if(quote.includes(".")){

        //             //     console.log(quote.substring(quote.indexOf('"'),quote.lastIndexOf('.') + 2));
        //             // } else {

        //             //     console.log(quote.substring(quote.indexOf('"'),quote.length + 1))
        //             // } 
                    
        //             //console.log(quotes)
                

        //         // quotes.map(async (quote) => {
                    

        //             const pushToDB = async (quote) => {
                    

                
        //                 quote = JSON.stringify(quote)
        //                 quote = quote.replace(/(\\n)/g, "").substring(quote.indexOf('"'),quote.lastIndexOf('.')).replace('"quote":"','')
        //                 console.log(`page: ${i}, quote:` + quote)
        //                 const params = {
        //                         TableName: Table,
        //                         Item: {"id": generateId(),
        //                                 "quote": `${quote}`,
                                        
        //                             }
        //                     }
        //             try{
        //                 await db.putItem(params).promise()
        //                 return { success: true }
        //             } catch(error){
        //                 return { success: false}
        //             }
        //         }
        //         quotes.forEach(pushToDB)
        //         })
        //         // })
        //         //console.log(quotes)
                

        //     } ).catch(err => console.log(err))

    }
}

webScrape();


const PORT = 3001
app.listen(PORT)
//console.log(`Server running on port ${PORT}`)