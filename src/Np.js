import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Nc from './components/Nc';
import ReactPaginate from 'react-paginate';
import { useArticles } from './ArticlesContext';

const Np = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { articles, setArticles } = useArticles();
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const handlePageChange = (event) => {
    setCurrentPage(event.selected);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading to true when making a request
      try {
        const { data } = await axios.get("https://hn.algolia.com/api/v1/search", {
          params: { page: currentPage, query }
        });
        console.log(data);
        const { hits, nbPages } = data;
        setArticles(hits);
        setTotalPages(nbPages);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Set loading to false when the request is complete
      }
    };
    fetchData();
  }, [currentPage, query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(0);
    setQuery(searchInput);
  };

  return (
    <div className='container'>
      <h1>Hacker News</h1>
      <form className='search-form' onSubmit={handleSubmit}>
        <input
          placeholder='Search for the News'
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        ></input>
        <button type='submit'>Search</button>
      </form>
      <div className='news-container'>
        {isLoading ? (
          <div className="loader">
            
            
            <div className="spinner"></div>
          </div>
        ) : (
          articles.map((article) => <Nc article={article} key={article.objectID} />)
        )}
      </div>
      <ReactPaginate
        nextLabel=">>"
        previousLabel="<<"
        breakLabel="..."
        forcePage={currentPage}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
        onPageChange={handlePageChange}
        className='pagination'
        activeClassName='active-page'
        previousClassName='prev-page'
        nextClassName='next-page'
      />
    </div>
  );
};

export default Np;
