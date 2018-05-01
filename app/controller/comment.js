let Comment = require('../models/comment');

// comment
exports.save = (req, res) => {
    var _comment = req.body.comment;

    console.log(_comment, '_comment.cid_comment.cid_comment.cid')
    var movieId = _comment.movie;
    var comment = new Comment(_comment);

    if(_comment.cid) {
        Comment.findById(_comment.cid, (err, comment) => {
            var reply = {
                from: _comment.from,
                to: _comment.tid,
                content: _comment.content
            }

            comment.reply.push(reply);

            comment.save((err, comment) => {
                if(err) {
                    console.log(err)
                }

                res.redirect('/movie/' + movieId);
            })
        }) 
    } else {
        comment.save((err, comment) => {
            if(err) {
                console.log(err);
            }
    
            res.redirect('/movie/' + movieId);
        })
    }
}





