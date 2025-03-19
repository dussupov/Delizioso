require('dotenv').config();
const express = require('express')
const cors = require('cors')
const sequelize = require('./src/config/db')

const userRoutes = require('./src/routes/userRoutes.js')


const app = express()



app.use(express.json())
app.use(cors())


app.use('/api/userRoutes', userRoutes)

const PORT = process.env.PORT || 3000

const start = async () => {
    try {
        await sequelize.authenticate()
        console.log('База данных подключена')

        await sequelize.sync({ alter: true })
        console.log('Базы синхронизировались')

        app.listen(PORT, () => {
            console.log(`Server started on port http://localhost:${PORT}`);
        })

    } catch (error) {
        console.log("Ошибка: " + error.message);
    }
}

start()