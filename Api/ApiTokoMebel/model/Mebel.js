const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    kodeBarang: {
        type: String
    },
    namabarang: {
        type: String
    },
    hargabarang: {
        type: String
    },
    jumlahbarang: {
        type: String
    },
    tanggalmasukbarang: {
        type: String
    },
    gambar: {
        type: String
    }
})

module.exports = mongoose.model('mebel', userSchema)