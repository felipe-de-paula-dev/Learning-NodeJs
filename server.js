/*

import { createServer } from 'node:http'

const server = createServer((req, res) => {
    res.write('oi')
    
    return res.end()
})

server.listen(3333)

// localhost:3333

*/

import { request } from 'http'
import { DatabaseMemory } from './database-memory.js'

import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

const database = new DatabasePostgres()

// Request Body

// GET Buscar informação, listagem etc
// POST Criar registro
// PUT Alterar
// DELETE Deletar

// Rout parameter

server.post('/videos', async (request, response) => {
    const { title, description, duration} = request.body


    await database.create({
        title: title,
        description: description,
        duration: duration,
    })


    return response.status(201).send()
})


server.get('/videos', async (request) => {
    const search = request.query.search
     
    console.log(search)

    const videos = await database.list(search)
    return videos
})

server.put('/videos/:id', async (request, response) => {
    const { title, description, duration} = request.body
    const videosId = request.params.id
    await database.update(videosId, {
    title,
    description,
    duration,
    })

    return response.status(204).send()
})

server.delete('/videos/:id', async (request, response) => {
    const videosId = request.params.id
    await database.delete(videosId)

    return response.status(204).send()
})

server.listen({
    port:3333,
})

