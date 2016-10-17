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
            // var str = file.originalname
            // var n = str.lastIndexOf('.')
            // var str1 = str.slice(n)
            // console.log(str1)
            // 获得coookie name
            // console.log(req.cookies)
            // cb第二个参数：上传到服务器上的文件名字
        cb(null, req.cookies.name + '.jpg')

    }
})
var upload = multer({ storage: storage })
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
    // 测试地址
app.get('', (req, res) => {
        console.log('这是根目录');
    })
    // 用户上传头像地址
app.post("/user/photo", upload.single('photo'), (req, res) => {
        console.log("成功")
            // res.status(200).json({code:"success"})
        res.status(200).json({ code: 'success', content: "上传头像成功!" })
    })
    // 用户注册地址
app.post('/user/register', (req, res) => {
        req.body.ip = req.ip;
        req.body.time = new Date().getTime()
            // console.log(req.body)
        var user = req.body;
        if (user.password == user.password01) {
            delete user.password01;
            // console.log(user)
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
    // 用户登录地址
app.post('/user/login', (req, res) => {
        console.log(req.body)
        var user = req.body;
        fs.readFile('users/user.txt', (err, data) => {
            var users = data.toString().trim()
            var usersArr = JSON.parse('[' + users + ']')
            var isIn = usersArr.some(function(ele) {
                return (user.name == ele.name && user.password == ele.password)
            })
            if (isIn) {
                res.status(200).json({ code: 'success', content: '登陆成功!', data: user })
            } else {
                res.status(200).json({ code: 'err', content: '用户名或密码错误' })
            }

        })

    })
    // 用户提问地址
app.post('/user/ask', (req, res) => {
        function formatIp(ip) {
            // startsWith()以什么开头
            if (ip.startsWith("::ffff:")) {
                return ip.slice(7)
            }
            if (ip == "::1") {
                return '192.168.1.1';
            }
        }

        var user = {}
        user.name = req.cookies.name;
        user.content = req.body.content;
        user.ip = formatIp(req.ip);
        user.time = new Date().getTime()
        console.log(user.content)
        var str = JSON.stringify(user)
        fs.appendFile('question/' + user.time + '.txt', str, (err, data) => {
            res.status(200).json({ code: 'success', content: "提交成功!" })
        })

    })
    // 用户回答问题
app.post('/user/answer', (req, res) => {
        var answer = req.body;
        console.log(answer)
        answer.name = req.cookies.name
        answer.ip = req.ip;
        answer.time = new Date().getTime();
        fs.readFile('question/' + answer.question + '.txt', (err, data) => {
            if (!err) {
                var askObj = JSON.parse(data.toString())
                if (typeof(askObj.answer) == "object") {
                    askObj.answer.push(answer)
                } else {
                    askObj.answer = []
                    askObj.answer.push(answer)
                }
                fs.writeFile('question/' + answer.question + '.txt', JSON.stringify(askObj), (err) => {
                    if (!err) {
                        res.status(200).json({ code: "success", content: "回答问题成功！" })
                    }

                })
            }
        })


    })
    // 打印下载文件
app.get('/question', (req, res) => {
    var questions = []
    fs.readdir('question', (err, files) => {
        // console.log(files)
        if (!err) {
            files.reverse()
            files.forEach(function(file) {
                fs.readFile('question/' + file, (err, data) => {
                    questions.push(JSON.parse(data.toString()))
                    if (questions.length == files.length) {
                        // console.log(questions)
                        res.status(200).json({ code: "success", data: questions })
                    }

                })
            });

        } else {

        }
    })

})
app.listen(3000, () => {
    console.log('服务器正常起动');
})
