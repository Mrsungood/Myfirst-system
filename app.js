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
app.post('/user/register', (req, res) => {
    req.body.ip = req.ip;
    req.body.time = new Date().getTime()
    console.log(req.body)
    var user = req.body;
    if (user.password == user.password01) {
        delete user.password01;
        console.log(user)
        fs.readFile('users/user.txt', (err, data) => {
            var users = data.toString().trim()
            var douhao = users.length > 0 ? "," : " ";
            var usersArr = JSON.parse('[' + users + ']')
            var isIn = usersArr.some(function(ele) {
                return (user.name == ele.name)
            })
            if (isIn) {
                res.status(200).json({ "code": "error", "content": "该用户名已被占用" })
            } else {
                fs.appendFile('users/user.txt', douhao + JSON.stringify(user), err => {
                    if (!err) {
                        res.status(200).json({ "code": "success", "content": "恭喜注册成功！" })
                    }

                })

            }
        })

    } else {
        res.status(200).json({ "code": "error", "content": "两次密码输入不一致" })

    }

})

app.post('/user/login',(req,res)=>{
    console.log(req.body)
    var user=req.body;
    fs.readFile('users/user.txt',(err,data)=>{
        var users=data.toString().trim()
        var usersArr=JSON.parse('['+users+']')
        var isIn=usersArr.some(function(ele){
            return (user.name==ele.name && user.password==ele.password)
        })
        if(isIn){
            res.status(200).json({code:'success',content:'登陆成功!',data:user})
        }else{
             res.status(200).json({code:'err',content:'用户名或密码错误'})
        }

    })

})



app.listen(3000, () => {
    console.log('服务器正常起动');
})
