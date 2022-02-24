const fs = require("fs/promises");
const path = require("path");
const Jimp = require('jimp');
const { User } = require("../models/user");


const avatarsDir = path.join(__dirname, "..", "public", "avatars");


const changeAvatar = async (req, res) => {

    const {_id} = req.user;
    const {path: tempUpload, filename} = req.file;
    Jimp.read(filename)
        .then(filename => {
          return filename
            .resize(256, 256)
        })
        .catch(err => {
          console.error(err);
        });

    try {
        const resultUpload = path.join(avatarsDir, filename);
        await fs.rename(tempUpload, resultUpload);
 
        const imageURL = path.join("public", "avatars", filename);
        
        const changeUserAvatar= await User.findByIdAndUpdate(_id, {avatar: imageURL});

        if(!changeUserAvatar) {res.status(404).json({
            status:'error',
            code: 404,
            message: 'Not found',
        })} else {
          res.json({
            status: 'success',
            code: 200,
            message: 'Avatar changed',
        })}

    } catch (error) {
        console.log(error);
        await fs.unlink(tempUpload);
    }
}

module.exports = changeAvatar;