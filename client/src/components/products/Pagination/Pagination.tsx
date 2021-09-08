import React from 'react';
import "./Pagination.css"

export default function Pagination ({articlesPerPage, articlesLength,paginate, currentPage}) {
    const pageNumbers = [];
    for(let i=1; i<=Math.ceil(articlesLength / articlesPerPage); i++){
            pageNumbers.push(i);
        }
    return(
        <div className="pagination">
              <a href="#" onClick={() =>paginate(currentPage - 1)}
              className={currentPage===1 ? "disabled":""}
              >&laquo;</a>
                {pageNumbers && pageNumbers.map (number => (
                      <a onClick={() =>paginate(number)}
                      className={number===currentPage ? "active":""}
                      key={number}>{number}</a>
                    ))
                }
             <a href="#"
             onClick={() =>paginate(currentPage + 1)}
             className={currentPage === pageNumbers[pageNumbers.length -1]? "disabled":""}
             >&raquo;</a>

        </div>
    )
}
