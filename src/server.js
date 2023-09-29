require("express-async-errors");

const AppError = require("./utils/AppErrors,");

const express = require("express");

const routes = require("./routes");

const app = express()
app.use(express.json())
app.use(routes);

app.use((error, request, response, next) => {
    console.log(error)
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });

    }
    return response.status(500).json({
        status: "error"
    })
});

const PORT = 4444;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))