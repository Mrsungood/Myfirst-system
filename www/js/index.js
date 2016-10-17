// 控制用户下拉菜单位置

function formatTime(val) {
    if (!val) {
        return ''
    }
    var data = new Date(val);
    var year = data.getFullYear();
    var month = data.getMonth() + 1;
    var day = data.getDate();
    var hour = data.getHours();
    var minute = data.getMinutes();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hour
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;

    return (year + '-' + month + '-' + day + ' ' + hour + ':' + minute);
}

function formatContent(val) {
    if (!val) {
        return ''
    }
    var str = val.replace(/</g, "&lt;");

    var str = str.replace(/>/g, "&gt;");

    return str;
}

function formatIp(ip) {
    if (!val) {
        return ''
    }
    if (ip.startsWith("::ffff:")) {
        return ip.slice(7)
    }
    if (ip == "::1") {
        return '192.168.1.1';
    }
}

$(function() {
    var name = $.cookie('name')
    console.log(name)
        // 判断cookie
    if (name) {
        $('.user-name').html('<span class="glyphicon glyphicon-user "></span>' + name).addClass('online')

    } else {
        $('.user-name').html('<span class="glyphicon glyphicon-user "></span>登录')

    }
    // 跳转提问页面
    $('.aske').click(function() {
            if (name) {
                location.href = 'ask.html'
            } else {
                location.href = 'login.html'

            }
        })
        // 跳转回答页面
    $('.messages').on('click', '.ask', function(e) {
        if (name) {
            var question = $(this).attr('data-time');
            $.cookie("question", question)
            location.href = "/answer.html?querstion=" + question;

        } else {
            location.href = 'login.html'
        }


    })

    $('body').on('click', '.user-name', function() {
        if ($(this).hasClass('online')) {
            $('.user-info').css({
                top: 50 + 'px',
                right: -10 + 'px'
            })
            $('.user-info').slideToggle()
        } else {
            location.href = '/login.html'
        }
    })

    $('.user-info a:eq(1)').click(function(e) {
        $.cookie('name', name, {
            expires: -1
        });
        $.popup1('退出成功', function() {
            location.href = 'index.html'
        })
    })
    $('.user-info a:eq(0)').click(function() {
        location.href = 'upload.html'

    })

})
