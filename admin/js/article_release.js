/**
* @description: 文章发布
* @param {type} 
* @return: 
*/

$(function () {
    // 日期插件
    jeDate("#testico", {
        format: "YYYY-MM-DD",
        isTime: true,
        minDate: "2014-09-19 00:00:00"
    });
    // 富文本
    let E = window.wangEditor
    let editor = new E('#editor')
    // 或者 let editor = new E( document.getElementById('editor') )
    editor.create();

    // 文章分类
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        // data:{id:id},
        success: function (backData) {
            // console.log(backData);
            $('.category').html(template('atr-list', backData));

        }
    });
    // 文件预览:固定四步走
    $('#inputCover').change(function (e) {
        // 阻止表单默认跳转
        e.preventDefault();
        let file = this.files[0];
        let url = URL.createObjectURL(file);
        // console.log(url);
        $('.article_cover').attr('src', url)
    });


    $('.btn-release').click(function(e){
          // 阻止表单默认跳转
          e.preventDefault();
          releaseArticle('已发布')

    })

    $('.btn-draft').click(function(e){
        // 阻止表单默认跳转
        e.preventDefault();
        releaseArticle('草稿')

  })
    // 文件上传： 
  function releaseArticle(state){
      
        //创建FormData对象；参数是表单dom对象
        let fd= new FormData($('form')[0]);
        fd.append('date',$('#testico').val());
        fd.append('content', editor.txt.html());
        fd.append('state', state);
     
           $.ajax({
               url:BigNew.article_publish,
               type:'post',
               dataType:'json',
               data:fd,
               contentType: false,
               processData: false,
               success: function(backData){
                   console.log(backData);
                // 返回文章列表
                if(backData.code==200){
                    // window.location.href='./article_list.html'  //跳转刷新
                    alert('添加成功');
                    $('.level02>li:eq(0)', window.parent.document)
                    .addClass('active')
                    .sibling()
                    .removeClass('active');


                    window.history.back()  //回退不会刷新
                }else{
                    alert(backData.msg)
                }
               }
       });
    }
})