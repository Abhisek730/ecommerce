const app = require('.')
const { connectToDb } = require("./config/db")
const PORT = 5000
app.listen(PORT, async () => {
    console.log(`Server is running on PORT: ${PORT}`)
    await connectToDb()

})