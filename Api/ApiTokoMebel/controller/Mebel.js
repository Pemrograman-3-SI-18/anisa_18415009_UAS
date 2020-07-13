const mebel = require('../model/Mebel')
const response = require('../config/response')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


exports.inputDataMebel = (data, gambar) =>
    new Promise(async (resolve, reject) =>{

        const mebelBaru = new mebel({
            kodeBarang: data.kodeBarang,
            namabarang: data.namabarang,
            hargabarang: data.hargabarang,
            jumlahbarang: data.jumlahbarang,
            tanggalmasukbarang: data.tanggalmasukbarang,
            gambar: gambar
        })

        await mebel.findOne({kodeBarang: data.kodeBarang})
            .then(mebel => {
               if (mebel){
                  console.log("kode mebel sudah ada")
               }else {
                   mebelBaru.save()
                       .then(r=>{
                           resolve(response.CommonSuccessMsg('Berhasil Menginput data'))
                       }).catch(err => {
                       reject(response.CommonErrorMsg('Mohon Maaf Input Data Mebel Gagal'))
                   })
               }
            }).catch(err => {
            reject(response.CommonErrorMsg('Mohon Maaf Terjadi kesalahaan pada server kami'))
        })
    })

exports.lihatDataMebel = () =>
    new Promise(async (resolve, reject)=>{
       await mebel.find({})
           .then(result => {
               resolve(response.commonResult(result))
           })
           .catch(()=>reject(response.CommonErrorMsg('Mohon Maaf Terjadi kesalahaan pada server kami')))
    })

exports.lihatDetailDataMebel = (kodeBarang) =>
    new Promise(async (resolve, reject)=>{
        await mebel.findOne({kodeBarang: kodeBarang})
            .then(result => {
                resolve(response.commonResult(result))
            })
            .catch(()=>reject(response.CommonErrorMsg('Mohon maaf terjadi kesalahan  pada server kami')))
    })

exports.updateMebel = (_id, data, gambar) =>
    new Promise(async (resolve, reject) => {
        await mebel.updateOne(
            {_id : ObjectId(_id)},
            {
                $set: {
                    kodeBarang: data.kodeBarang,
                    namabarang: data.namabarang,
                    hargabarang: data.hargabarang,
                    jumlahbarang: data.jumlahbarang,
                    tanggalmasukbarang: data.tanggalmasukbarang,
                    gambar: gambar
                }
            }
        ).then(mebel => {
            resolve(response.CommonSuccessMsg('Berhasil Mengubah data'))
        }).catch(err => {
            reject(response.CommonSuccessMsg('Mohon Maaf Terjadi kesalahaan pada server kami'))
        })
    })

exports.hapusmebel= (_id) =>
    new Promise(async (resolve, reject) =>{
        await mebel.remove({_id: ObjectId(_id)})
            .then(() => {
                resolve(response.CommonSuccessMsg('Berhasil Menghapus data'))
            }).catch(() => {
                reject(response.CommonErrorMsg('Mohon Maaf Terjadi kesalahaan pada server kami'))
            })
    })