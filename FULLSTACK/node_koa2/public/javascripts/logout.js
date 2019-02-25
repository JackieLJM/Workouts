
$(function(){
    $('#btnLogOut').on('click', function(){           
       /*
       if(!confirm('确认要退出吗?')){
            return;
       }
       */
        $.ajax({
            url: '/logout',
            type: 'POST',
            dataType: 'json',
            data: {},
            beforeSend: function (xhr) {},
            success: function (res) {
                if (res != null && res.code) {

                    var retVal = parseInt(res.code);

                    switch (retVal) {                           
                        case 0:
                            alert('失败');
                            break;
                        case 1:
                            //alert('成功!');
                            location.href = '/login'                                
                            break;                           
                    }
                }
                else {
                    alert('操作失败');
                }

            },
            complete: function (XMLHttpRequest, textStatus) {},
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert('操作失败');
            }
        });            
    })
});