/**
* @description: 文章列表
* @param {type} 
* @return: 
*/
$(function () {
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            // console.log(backData);
            $('#selCategory').html(template('category_list', backData))

        }
    });

    $('#btnSearch').on('click', function (e) {
        //禁用表单默认提交事件
        e.preventDefault();
        $.ajax({
            url: BigNew.article_query,
            type: 'get',
            dataType: 'json',
            data: {
                state: $('#selStatus').val(),
                type: $('#selCategory').val(),
                perpage: 10,
                page: 10,
            },

            success: function (backData) {
                console.log(backData);
                $('.table>tbody').html(template('articlie_list', backData))
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
    });
    /**
    * @description:  分页插件
    * @param {type} currentPage 点击页数
    * @return: 
    */
    $('#btnSearch').trigger('click');
    function getArticleList(currentPage) {
        $.ajax({
            url: BigNew.article_query,
            type: 'get',
            dataType: 'json',
            data: {
                state: $('#selStatus').val(),
                type: $('#selCategory').val(),
                perpage: 10,
                page: currentPage,
            },
            success: function (backData) {
                $('.table>tbody').html(template('articlie_list', backData))
            }
        });
    }


    // 删除文章
    $('table>tbody').on('click', '.delete', function () {
        let id = $(this).attr('date-id');
        // console.log('id',$(this).attr('date-id'));
        $.ajax({
            url: BigNew.article_delete,
            type: 'post',
            dataType: 'json',
            data: { id: id },
            success: function (backData) {
                if (backData.code == 204) {
                    alert('删除成功');
                    window.location.reload()
                }
            }
        });
    })


    //发布文章
    $('#release_btn').click(function () {

        // parent.window.reload();
        $('.level02>li:eq(1)', window.parent.document).addClass('active').siblings().removeClass('active');
        // console.log(window.document);
     
    })
})           