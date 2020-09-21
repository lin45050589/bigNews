/**
* @description: 文章评论
* @param {type} 
* @return: 
*/
$(function () {
    $.ajax({
        url: BigNew.comment_search,
        type: 'get',
        dataType: 'json',
        data: {
            page: 10,
            perpage: 10,
        },
        success: function (backData) {
            console.log(backData);
            $('.table>tbody').html(template('comment_list', backData));

            $('#pagination').twbsPagination('destroy');

            // 重新加载
            $('#pagination').twbsPagination({
                totalPages: backData.data.totalPage,
                startPage: 1,
                visiblePages: 6,
                first: '首页',
                prev: '上一页',
                next: '下一页',
                last: '尾页',
                onPageClick: function (event, page) {
                    getArticleList(page);
                }
            });

        }
    });

    /**
    * @description:  分页插件
    * @param {type} currentPage 点击页数
    * @return: 
    */
    //    $('#btnSearch').trigger('click');

    function getArticleList(currentPage) {
        $.ajax({
            url: BigNew.comment_search,
            type: 'get',
            dataType: 'json',
            data: {
                perpage: 10,
                page: currentPage,
            },
            success: function (backData) {
                $('.table>tbody').html(template('comment_list', backData))
            }
        });
    };
    // 拒绝
    $('body').on('click', '.btn-reject', function () {
        alert('点击了')
        let id=$(this).attr('data-id');
        $.ajax({
            url:BigNew.comment_reject,
            type:'post',
            dataType:'json',
            data:{
                id:id
            },
            success: function(backData){
                // console.log(backData);
                if(backData.code==200){
                    alert(backData.msg);
                    window.location.reload();
                }else{
                    alert(backData.msg);
                }
            }
        });
    })
    //   批准
    $('body').on('click', '.btn-pass', function () { 
        let id=$(this).attr('data-id');
        $.ajax({
            url:BigNew.comment_pass,
            type:'post',
            dataType:'json',
            data:{
                id:id
            },
            success: function(backData){
                // console.log(backData);
                if(backData.code==200){
                    alert(backData.msg);
                    window.location.reload();
                }else{
                    alert(backData.msg);
                }
            }
        });

    })

    // 删除
    $('body').on('click', '.btn-delete', function () {
        let id=$(this).attr('data-id');
        $.ajax({
            url:BigNew.comment_delete,
            type:'post',
            dataType:'json',
            data:{
                id:id
            },
            success: function(backData){
                console.log(backData);
                if(backData.code==200){
                    alert(backData.msg);
                    window.location.reload();
                }else{
                    alert(backData.msg);
                }
            }
        });

     })


})