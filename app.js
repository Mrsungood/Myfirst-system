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
        var str = file.originalname
        var n = str.lastIndexOf('.')
        var str1 = str.slice(n)
        console.log(str1)

        // cb第二个参数：上传到服务器上的文件名字
        cb(null, Date.now() + str1)
    }
})
var upload = multer({ storage: storage })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.get('', (req, res) => {
    console.log('这是根目录');
})
app.post("/user/photo", upload.single('photo'), (req, res) => {
    console.log('user')

})
app.post('/register/post', (req, res) => {
    fs.readFile('question/user.txt', (err, data) => {
        var user = req.body;
        var password = req.body.password;
        var password01 = req.body.password01
        var str = data.toString().trim()
            // console.log(str)
            console.log(password01)
            console.log(password)
        var usersObj = JSON.parse('[' + str + ']');
        // console.log(usersObj)
        var isIn = false;
        usersObj.forEach(function(ele, ind) {
            if (user.name == ele.name) {
                isIn = true;
            }

        })
        if (isIn) {
           /*用户被占用*/
            res.status(200).send('err')
        } else {
            if (password01 == password) {
                // 成功注册
                var userStr = JSON.stringify(user);
                var douhao = data.toString().trim().length > 0 ? ',' : '';
                fs.appendFile('question/user.txt', douhao + userStr, (err) => {
                    res.status(200).send('1')
                })

            } else {
                // 两次密码不一样
                 res.status(200).send('0')

            }

        }


    })
})



app.listen(3000, () => {
    console.log('服务器正常起动');
})
