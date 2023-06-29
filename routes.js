import express from 'express'
import { getRandomQuote} from './db.js'


const router = express.Router()

//get recipe by id
router.get('/quotes/:id', async(request, response) => {
    const id = Number(request.params.id)
    const { success, data } = await getRandomQuote(id)
    
    if (success){
        response.json({data});
    } else {
        response.status(404).end()
      }
    
})

export default router