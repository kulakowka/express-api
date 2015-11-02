import express from 'express'
import {urlencoded, json} from 'body-parser'
import {resolve} from 'path'
import {session, stylus, staticFiles, lockit} from './utils'
import routes from './routes'

var app = express()

app.use(urlencoded({ extended: false }))
app.use(json())
app.use(session)
app.use(stylus)
app.use(staticFiles)
app.set('views', resolve(__dirname, '..', 'views'))
app.set('view engine', 'jade')
app.disable('x-powered-by')
app.use(lockit.router)
app.use(routes)

app.listen(process.env.PORT || 3000)

export default app
