$(function () {
    /*
    登录功能思路
    1 给登录按钮注册点击事件
    2 阻止默认跳转事件(表单submit自动跳转页面)
    3 获取用户名和密码
    4 非空判断
    5 ajax发送请求
    6 处理响应结果 a.成功： 跳转管理系统管理 b 失败：提示用户
    */

    // 登录按钮注册点击事件
    $('.input_sub').click(function (e) {
        e.preventDefault();
        let username = $('.input_txt').val().trim();
        let password = $('.input_pass').val().trim();
        if (username == '' || password == '') {
            $('.modal-body>p').text('用户名和密码不能为空')
            // esc键关闭模态框
            $('#myModal').modal({ keyboard: true })
            return;
        };
        $.ajax({
            url: BigNew.user_login,
            type: 'post',
            dataType: 'json',
            data: {
                username: username,
                password: password
            },
            success: function (backData) {
                console.log(backData);
                if(backData.code==200){
                    $('.modal-body>p').text('登录成功')
                    // esc键关闭模态框
                    $('#myModal').modal({ keyboard: true })
                    // 
                    $('#myModal').on('hidden.bs.modal', function (e) {
                        localStorage.setItem('token', backData.token)
                        window.location.href='./index.html'
                      })

                }
                else{
                    alert(backData.msg)
                }

            }
        });
    })

})