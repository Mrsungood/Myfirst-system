const express = require('express'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    cookieParser = require('cookie-parser'),
    fs = require('fs'),
    app = express();
 app.use(express.static('www'));
// 调用方法diskStorage方法()有一个对象参数
// destination上传的目的地
// filename 上传的文件名字
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'www/uploads')
        },
        filename: function(req, file, cb) {
        	// file原始上传文件相关信息对象
        	console.log(file)
            var str=file.originalname
            var n=str.lastIndexOf('.')
            var str1=str.slice(n)
            console.log(str1)

        	// cb第二个参数：上传到服务器上的文件名字
            cb(null, Date.now()+str1)
        }
    })
var upload = multer({ storage: storage })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.get('', (req, res) => {
    console.log('这是根目录');
})
app.post("/user/photo",upload.single('photo'),(req,res)=>{
	console.log('user')
	

})



app.listen(3000, () => {
    console.log('服务器正常起动');
})
