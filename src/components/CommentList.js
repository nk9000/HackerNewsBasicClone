import React from 'react';

const CommentList = ({ comments }) => {
    const removeHtmlTags = (html) => {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    return (
        <div className="comment-list">
            {comments.map((comment, index) => (
                <div className="comment" key={index}>
                    <div className="comment-box">
                        <p className="comment-author"> <h3>Author: {comment.author}</h3></p>
                        <p className="comment-text">{removeHtmlTags(comment.text)}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommentList;
