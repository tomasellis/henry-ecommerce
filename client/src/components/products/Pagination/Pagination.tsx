import React from 'react';
import "./Pagination.css"

export default function Pagination ({currentPage, nextLength, gender}) {
  let route1=`/clothing/${gender}/${+currentPage - 1}`
  let route2=`/clothing/${gender}/${+currentPage + 1}`
    return(
        <div className="pagination">
              <a href = {route1}
              className={currentPage<=0 ? "disabled":""}
              >&laquo; Previous</a>
             <a href = {route2} className={nextLength===0? "disabled":""}
             >Next &raquo;</a>
        </div>
    )
}
