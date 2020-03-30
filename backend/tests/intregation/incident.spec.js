const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('INCIDENT', () => {
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async () => {
        await connection.destroy()
    })

    it('should be able to create a new incident', async () => {
        const response = await request(app).post('/incidents').set('Authorization', '684cca15').send({
            title: "Cadelinha atropelada",
            description: "Esta cadelinha foi atropelada em um acidente de trânsito.",
            value: 120
        })

        expect(response.body).toHaveProperty('id')
    })
})
