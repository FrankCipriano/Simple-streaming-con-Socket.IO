`use strict`
const express=require(`express`),
    app=express(),
    http=require(`http`).createServer(app),
    io=require(`socket.io`)(http),
    port=process.env.PORT || 3000,
    public_dir=express.static(`${__dirname}/public`)

http.listen(port,()=>{
    console.log(`Servidor corriendo en http://127.0.0.1:${port}`)
})

app.use(public_dir).get(`/`,(req,res)=>{
    res.sendFile(`${__dirname}/public/index.html`)
}).get(`/streaming`,(req,res)=>{
    res.sendFile(`${__dirname}/public/stream.html`)
})

io.on(`connection`,(socket)=>{
    socket.on(`streaming`,(stream)=>{
        io.emit(`reproducir_streaming`,stream)
    })
})