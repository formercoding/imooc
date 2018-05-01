$(function() {
    $('.comment').click(function(e) {
        var target = $(this);
        var toId = target.data('tid');
        var commentId = target.data('cid');

        $('.cid').val(commentId);
        $('.tid').val(toId);
    })
})