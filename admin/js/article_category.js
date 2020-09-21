/**
* @description: 文章类别管理
* @param {type} 
* @return: 
*/

$(function () {
    $.ajax({
        url: BigNew.category_list,
        type: 'get',
        dataType: 'json',
        // data:'',
        success: function (backData) {
            // console.log(backData);
            $('.category_table>tbody').html(template('art_cat', backData))
        }
    });

    // 模态框出现之前
    $('#myModal').on('show.bs.modal', function (e) {

        // 时间触发源
        let target = e.relatedTarget // Button that triggered the modal
        if (target == $('#xinzengfenlei')[0]) {
            $('#myModal .confirm').text('新增')
        } else {
            $('#myModal .confirm').text('编辑');
            $('#recipient-name').val($(target).parent().prev().prev().text());
            $('#message-text').val($(target).parent().prev().text());
            $('#myModal .confirm').attr('data-id', $(target).attr('data-id'))
        }

    })

    //取消 
    $('#myModal .cancel').on('click',function(e){
        // 清空文本
        $('#form')[0].reset();
        $('#myModal').modal('hide')
    })  

    // 新增加  
    $('#myModal .confirm').on('click',function(){
        if($(this).text()=='新增'){
            $.ajax({
                url:BigNew.category_add,
                type:'post',
                dataType:'json',
                data:{
                    name:$('#recipient-name').val(),
                    slug:$('#message-text').val(),
                },
                success: function(backData){
                    if(backData.code==201){
                        window.location.reload();
                    }else{
                        alert(backData.msg)
                    }
                }
            });
        }else{
            $.ajax({
                url:BigNew.category_edit,
                type:'post',
                dataType:'json',
                data:{
                    name:$('#recipient-name').val(),
                    slug:$('#message-text').val(),
                    id:$(this).attr('data-id')
                },
                success: function(backData){
                    // console.log(backData);
                    if(backData.code==200){
                        alert(backData.msg);
                        window.location.reload();
                    }else{
                        alert(backData.msg)
                    }
                }
            });
        }
    });

    // 删除
    $('.category_table>tbody').on('click','.delete',function(){
        $.ajax({
            url:BigNew.category_delete,
            type:'post',
            dataType:'json',
            data:{
                id:$(this).attr('data-id')
            },
            success: function(backData){
              if(backData.code==204){
                  alert(backData.msg);
                  window.location.reload();
              }else{
                  alert(backData.msg)
              }
            }
        });
    })
   
})
