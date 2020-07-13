const userModel = require('../model/user.js')
const response = require('../config/response')
const bcrypt = require('bcrypt')

exports.registrasi = (data) =>
    new Promise((resolve, reject) => {
        console.log(data)
        userModel.findOne({userName: data.userName})
            .then(user => {
                if (user) {
                    resolve(response.CommonErrorMsg('Username sudah digunakan'))
                }else {
                    bcrypt.hash(data.password, 10, (err, hash)=>{
                 if (err){
                   reject(response.CommonErrorMsg)
                 }else{
                     data.password = hash
                     userModel.create(data)
                         .then(() => resolve(response.CommonSuccessMsg('Berhasil Registrasi')))
                         .catch(() => reject(response.CommonSuccessMsg('Mohon Maaf Registrasi Gagal')))
                 }
                    })
                }
            }).catch(() => reject(response.commonError))
    })


exports.login = (data) =>
    new Promise((resolve, reject) => {
        userModel.findOne({
            userName: data.userName
        }).then(user => {
            if (user){
                if (bcrypt.compareSync(data.password, user.password)){
                    resolve(response.commonResult(user))
                }else {
                    reject(response.CommonErrorMsg('Pasword Salah'))
                }

            }else {
                reject(response.CommonErrorMsg('User Name Tidak ditemukan'))
            }
        })
    })
