import React from 'react';
import { Link, Navigate } from 'react-router-dom';

const Nc = ({ article, key }) => {
    return (
        <div className='news-card'>
            <h3>{article.title}</h3>
            <h4><i>Authored by :~ {article.author}</i></h4>
            
            <Link to={`/details/${article.objectID}`}>Read More</Link>
        </div>
    );
};

export default Nc;
