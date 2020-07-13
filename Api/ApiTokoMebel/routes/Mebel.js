const multer = require('multer')
const fs = require('fs')
const router = require('express').Router()
const mebel = require('../controller/Mebel')

var storage = multer.diskStorage({
    filename: function (req, file, cb) {
        let ext = file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length
        )
        cb(null, Date.now() + ext);
    },
    destination: function (req, file, cb) {
        cb(null, './gambar')
    }
})

var upload = multer({storage: storage}).single("gambar")


router.post("/input", upload, (req, res) => {

    mebel.inputDataMebel(req.body, req.file.filename)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.get("/datamebel", (req, res) =>{
    mebel.lihatDataMebel()
        .then((result)=> res.json(result))
        .catch((err)=>res.json(err))
})

router.get("/datamebel/:id", (req, res) =>{
    mebel.lihatDetailDataMebel(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})


router.delete("/hapus/:id", (req, res) =>{
    mebel.hapusmebel(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})


router.put("/ubah/:id", upload, (req, res)=>{
    mebel.updateMebel(req.params.id, req.body, req.file.filename)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

module.exports = router