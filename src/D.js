import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentList from './components/CommentList';

const D = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [points, setPoints] = useState();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://hn.algolia.com/api/v1/items/${id}`);
                const { title, points, children } = response.data;
                setTitle(title);
                setPoints(points);
                setComments(children);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const [showComments, setShowComments] = useState(false);

    return (
        <div className="details-container">
            <h1>{title}</h1>
            <p className="article-points">Points: {points}</p>
            <button className="toggle-comments-button" onClick={() => setShowComments(!showComments)}>
                {showComments ? 'Hide Comments' : 'Show Comments'}
            </button>
            {loading && <div className="loading-spinner"></div>} {/* Show the loading spinner while loading */}
            {showComments && !loading && <CommentList comments={comments} />}
        </div>
    );
};

export default D;
