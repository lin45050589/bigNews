$(function(){
//         /**
//     $.ajaxSetup(): 为所有的ajax请求设置默认值
//     beforsSend(xhr).发送请求运行函数(这个函数可以根据后台x需求设置一些固定请求头)
//     */
//    $.ajaxSetup({
//     beforeSend(xhr) {
//         xhr.setRequestHeader("Authorization", localStorage.getItem('token'));
//     },
//     error(xhr, status, error) {
//         console.log(xhr.responseText);
//         console.log(status);//错误状态
//         console.log(error);//错误信息
//         if (error == 'Forbidden') {//用户未登录
//             alert('请先登录！')
//             window.location = './login.html';//跳转登陆页面
//         };

//     }
// });
// 统计数据
$.ajax({
    url: BigNew.data_info,
    type:'get',
    dataType:'json',
    data:'',
    success: function(backData){
        // console.log(backData);
        $('.scolor>em').text(backData.totalArticle)
        $('.scolor01>em').text(backData.dayArticle)
        $('.scolor03>em').text(backData.dayComment)
        $('.scolor02>em').text(backData.totalComment)
    }
});
// 日新增加文章数量统计
// $.ajax({
//     url: BigNew.data_article,
//     type:'get',
//     dataType:'json',
//     data:'',
//     success: function(backData){
//         console.log(backData);

//     }
// });

//
// 各类型文章数量统计
// $.ajax({
//     url: BigNew.data_category,
//     type:'get',
//     dataType:'json',
//     data:'',
//     success: function(backData){
//         console.log(backData);

//     }
// });

})