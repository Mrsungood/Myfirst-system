// 自定义插件 首页引入才能使用
$.extend({
    popup: function(value, callback) {
            $(".popup").remove();
            $(".mask").remove();
            // 声明变量插入内容
            var html = "<div class=\"popup popup01\">" + " <div class=\"pop-close\">x</div>" + " <div class=\"pop-title\">提示信息</div>" + " <div class=\"pop-content\"></div>" + " <button class=\"yes\">是</button>" + " <button class=\"no\">否</button>" + "</div>" + "<div class=\"mask\"></div>";
            $("body").append(html);
            $(".pop-content").html(value);
            $(".popup").hide();
            $(".popup").fadeIn();
            $(".mask:eq(0)").fadeIn();
            $("body").on("click", ".pop-close", function() {
                $(this).parents(".popup").fadeOut('fast', function() {
                    this.remove();
                });
                $(".mask").fadeOut('fast', function() {
                    this.remove();
                    if (typeof callback == "function") {
                        // callback();
                        setTimeout(callback, 1000)
                    }
                });
            })

            $("body").on("click", ".no", function() {
                $(this).parents(".popup").fadeOut('fast', function() {
                    this.remove();
                });
                $(".mask").fadeOut('fast', function() {});
            })

            $("body").on("click", ".yes", function() {
                $(this).parents(".popup").fadeOut('fast', function() {
                    this.remove();
                });
                $(".mask").fadeOut('fast', function() {
                    this.remove();
                });
            })

        }
  })
$.extend({
   // 第二中弹窗
    popup1: function(value, callback) {
        $(".popup").remove();
        $(".mask").remove();
        // 声明变量插入内容
        var html = "<div class=\"popup popup01\">" 
        + " <div class=\"pop-close\">x</div>" 
        + " <div class=\"pop-title\">提示信息</div>"
         + " <div class=\"pop-content\"></div>" 
         + "</div>" + "<div class=\"mask\"></div>";
        $("body").append(html);
        $(".pop-content").html(value);
        $(".popup").hide();
        $(".popup").fadeIn();
        $(".mask:eq(0)").fadeIn();
        $("body").on("click", ".pop-close", function() {
            $(this).parents(".popup").fadeOut('fast', function() {
                this.remove();
            });
            $(".mask").fadeOut('fast', function() {
                this.remove();
                if (typeof callback == "function") {
                    // callback();
                    setTimeout(callback, 1000)
                }
            });
        })


    }

  })
