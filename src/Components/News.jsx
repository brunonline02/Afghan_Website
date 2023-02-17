import { useEffect, useState } from "react";
import getEntries from "../Contentful";
import ReactPaginate from "react-paginate";

export default function News() {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    getEntries("news")
      .then((items) => {
        const numPages = Math.ceil(items.length / 5);
        setTotalPages(numPages);
        setNews(items);
      })
      .catch(console.error);
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const startIndex = currentPage * 5;
  const endIndex = startIndex + 5;
  const visibleNews = news.slice(startIndex, endIndex);

  return (
    <div>
      <section>
        <h1 className="name">News</h1>
        <ul>
          {visibleNews.map((item) => (
            <li key={item.sys.id}>
              <h2 className="title">{item.fields.title}</h2>
              <p className="text">{item.fields.body}</p>
            </li>
          ))}
        </ul>
        {totalPages > 1 && (
          <ReactPaginate
            className="pagination"
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        )}
      </section>
    </div>
  );
}
