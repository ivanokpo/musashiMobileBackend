import * as cheerio from "cheerio";
import axios from "axios";

const WebScrape = async () => {
  //webpage where quotes are hosted for book
  const url =
    "https://www.goodreads.com/author/quotes/8330589.Miyamoto_Musashi?page=";

  //for loop which goes through 8 pages of the website to find all quotes
  for (let i = 1; i < 9; i++) {
    axios(url + `${i}`)
      .then((response) => {
        //page number
        console.log(`--------- Page: ${i} --------`);

        //response is captured in html variable
        const html = response.data;

        //use cheerio library to instantiate html variable as an object
        const $ = cheerio.load(html);

        //empty array of quotes
        const quotes = [];

        //foreach quote found under the html tag .quoteText, add them to array of quotes
        $(".quoteText", html).each(async function () {
          let quote = $(this).text();
          quotes.push({
            quote,
          });
        });

        //for each quote in array, send to dynamodb
        quotes.forEach(async (quote, index) => {
          quote = JSON.stringify(quote);
          quote = quote
            .replace(/(\\n)/g, "")
            .substring(quote.indexOf('"'), quote.lastIndexOf("."))
            .replace('"quote":"', "")
            .replace("{", "");
          console.log(`page: ${i}, quote:` + quote);
          const params = {
            TableName: Table,
            Item: { id: index, quote: `${quote}` },
          };

          await db.put(params).promise();
        });
      })
      .catch((err) => console.log(err));
  }
};

export default WebScrape;
