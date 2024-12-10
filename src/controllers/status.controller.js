import ResponseBuilder from "../utlis/Builders/responseBuilder.js"
const getPingController = (req, res) => {
    try {
        const response = new ResponseBuilder()
        .setOK(true)
        .setStatus(200)
        .setMessage("Success")
        .setPayload({
            message: "Pong"
    })
        .build()
        res.json(response)
    }
    catch(error){
        const response = new ResponseBuilder()
        .setOK(false)
        .setStatus(500)
        .setMessage("Internal server error")
        .setPayload({
            detail: error.message
    })
    .build()
    res.status(500).json(response)
    }
    
}

export default getPingController