import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from '../components/Pagination';

function BookDetails({ data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const currentRecords = data.slice(firstIndex, lastIndex);
    const npage = Math.ceil(data.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function nextPage() {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
    }

    function changeCPage(number) {
        setCurrentPage(number);
    }

    return (
            <div className='container'>
                <h2 className='mt-5'>View Book Details</h2>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((item) => (
                            <tr key={item.Id}>
                                <td>{item.Id}</td>
                                <td>{item.Name}</td>
                                <td>{item.Author}</td>
                                <td>{item.Category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                currentPage={currentPage}
                npage={npage}
                prePage={prePage}
                nextPage={nextPage}
                changeCPage={changeCPage}
            />
            </div>
    );
}

export default BookDetails;
