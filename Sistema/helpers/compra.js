import compra from "../models/compra.js"

const ExisteCompraByIdC=async(id)=>{
    const existe=await compra.findById(id);

    if(!existe){
        throw new Error(`El Id no existe ${id}`);
    }
    
}
const ExisteByNumcomprobanteC=async(numerocomprobante)=>{
    const existe= await compra.findOne({numerocomprobante});
    if(existe){throw new Error(`Ya existe ese numero de comprabante `);
    }
}

export {ExisteCompraByIdC,ExisteByNumcomprobanteC}