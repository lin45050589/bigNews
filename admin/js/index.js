$(function () {
    /*
    1 查询个人信息
    2 页面一加载发送ajax请求
    3 响应数据以后渲染到页面
    */
    /**
    $.ajaxSetup(): 为所有的ajax请求设置默认值
    beforsSend(xhr).发送请求运行函数(这个函数可以根据后台x需求设置一些固定请求头)
    */
    $.ajaxSetup({
        beforeSend(xhr) {
            xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
        },
        error(xhr, status, error) {
            console.log(xhr.responseText);
            console.log(status);//错误状态
            console.log(error);//错误信息
            if (error == 'Forbidden') {//用户未登录
                alert('请先登录！')
                window.location = './login.html';//跳转登陆页面
            };

        }
    })
    
    $.ajax({
        url: BigNew.user_info,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            $('.user_info>img').attr('src',backData.data.userPic)
            $('.user_center_link>img').attr('src',backData.data.userPic)
            $('.user_info>span').text('欢迎 ' +backData.data.nickname)            
        }
    });

    // 退出登录
    // 删除token
    // 跳转登录页面
    $('.logout').click(function(){
        localStorage.removeItem('token');
        window.location.href='./login.html'
    })

    // 点击左侧导航栏效果
    $('.level01').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        if($(this).next().hasClass('level02')){
            // console.log('有ul');
            $(this).next().slideToggle();
            $(this).find('b').toggleClass('rotate0');
            $('.level02>li>a').first()[0].click();
            // console.log('点击了li');
        }else{
            $('.level02>li').removeClass('active')
        }
    })
//二级列表
$('.level02>li').click(function(){
    $(this).addClass('active').siblings().removeClass('active')
    // console.log('点击了');
})

})