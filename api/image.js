const multer = require("multer");
const Image = require('../model/image')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/image");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const uploadImg = multer({ storage: storage }).single("image");


const newImage = (req, res) => {
    const newImage = new Image({
        image: req.file.path,
    })
    newImage.save((err, data) => {
        if (err) return res.json("Something is wrong. Please check again");
        return res.json(data);
    });

}


const downloadFiles = (req, res) => {
    const fileName = req.params.name;
    const path = __basedir + "/uploads/image/";

    res.download(path + fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "File can not be downloaded: " + err,
            });
        }
    });
};


module.exports = {

    uploadImg,
    newImage,
    downloadFiles

};