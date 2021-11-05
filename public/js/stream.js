`use strict`
const c_io=io(),
    d=document,
    n=navigator,
    w=window,
    video=d.getElementById(`video`),
    canvas=d.getElementById(`canvas`),
    context=canvas.getContext(`2d`)

let camara=false

n.streaming=(
    n.getUserMedia ||//
    n.webkitGetUserMedia ||
    n.mozGetUserMedia ||
    n.msGetUserMedia
)

n.streaming({
    video:true,
    audio:true
},(stream)=>{
    camara=true
    video.srcObject=stream
    //video.src=w.URL.createObjectURL(stream)
},(err)=>{
    alert(`No se logró conectar la camara web ${err}`)
})

w.playVideo=((callback)=>{
    return w.requestAnimationFrame ||
        w.webkitRequestAnimationFrame ||
        w.mozRequestAnimationFrame ||
        w.msRequestAnimationFrame ||
        function(callback){w.setTimeout(callback,1000/100)}
})()

const streamVideo=(context,canvas,video)=>{
    let salidaStream=canvas.toDataURL(`image/jpeg`, .2)
    context.drawImage(video,0,0)

    if(camara)  c_io.emit(`streaming`,salidaStream)

    playVideo(()=>streamVideo(context,canvas,video))
}

w.addEventListener(`load`,()=>{
    video.autoplay=true
    video.classList.add(`none`)
    streamVideo(context,canvas,video)
})