`use strict`
const c_io=io(),
    $img=document.getElementById(`streaming`)

c_io.on(`reproducir_streaming`,(stream)=>{
    $img.src=stream
})