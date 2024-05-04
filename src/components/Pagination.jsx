import React from 'react';

export default function Pagination({ currentPage, npage, prePage, nextPage, changeCPage }) {
    const numbers = [...Array(npage + 1).keys()].slice(1);

    return (
        <nav>
            <ul className='pagination justify-content-center'>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a href='#' className='page-link' onClick={prePage}>Prev</a>
                </li>
                {numbers.map((number) => (
                    <li className={`page-item ${currentPage === number ? 'active' : ''}`} key={number}>
                        <a href='#' className='page-link' onClick={() => changeCPage(number)}>{number}</a>
                    </li>
                ))}
                <li className={`page-item ${currentPage === npage ? 'disabled' : ''}`}>
                    <a href='#' className='page-link' onClick={nextPage}>Next</a>
                </li>
            </ul>
        </nav>
    );
}
