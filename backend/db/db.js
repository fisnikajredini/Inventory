const mongoose = require ('mongoose');
const cstring = 'mongodb+srv://edberdemiri:edin0123@clusterdb-5eqzj.mongodb.net/PhoneStoreDB?retryWrites=true&w=majority';

const initDB=()=>{
mongoose.connect(cstring , {useNewUrlParser:true,useUnifiedTopology: true},(err)=>{
    if(err){
        console.log('could not read from database');
        return;
    }
});
}

module.exports={
    initDB,
}