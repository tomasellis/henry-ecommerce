import React from 'react';


export default function Pagination ({articlesPerPage, articlesLength,paginate}) {
    const pageNumbers = [];
    for(let i=1; i<=Math.ceil(articlesLength / articlesPerPage); i++){
            pageNumbers.push(i);
        }
    return(
        <div>
            <nav  style={{display: "inline-block"}}>
                {pageNumbers && pageNumbers.map (number => (
                            <button onClick={() =>paginate(number)} key={number}>{number}</button>
                    ))
                }
            </nav>
        </div>
    )
}
