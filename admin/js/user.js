/**
* @description: user 个人中心
* @param {type} 
* @return: 
*/


$(function () {
    $.ajax({
        url: BigNew.user_detail,
        type: 'get',
        dataType: 'json',
        data: '',
        success: function (backData) {
            for (let key in backData.data) {
                $('input.' + key).val(backData.data[key])
            }

            $('.user_pic').attr('src', backData.data.userPic)
        }
    });

    // 文件预览
    $('#exampleInputFile').change(function () {
        let file = this.files[0];
        let url = URL.createObjectURL(file);
        $('.user_pic').attr('src', url)

    });

    // 文件上传
    $('#form').on('submit', function (e) {
        //禁用表单默认提交事件
        e.preventDefault();
        $.ajax({
            url: BigNew.user_edit,
            type: 'post',
            dataType: 'json',
            data: new FormData(this),
            contentType: false,
            processData: false,
            success: function (backData) {
                console.log(backData);

                if (backData.code == 200) {
                    alert(backData.msg);
                    parent.window.location.reload();
                } 
            }
        });
    });
});
