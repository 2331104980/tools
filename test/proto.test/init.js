const fs=require('fs');
const path=require('path')
const init=async ()=>{
    let dir=path.join(__dirname,'../../src/proto');
    // console.log(dir)
    let files=fs.readdirSync(dir);
    for(let file of files){
        if(file.match('*.proto')){
            console.log(file)
        }else{
            console.log(`====`,file)
        }
    }
}

init();