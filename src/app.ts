import express from 'express'



export function createApp() {

    const app = express()

    app.get('/',  (req, res) => {
        res.status(200).send('Hello')
    })    

    return app
}