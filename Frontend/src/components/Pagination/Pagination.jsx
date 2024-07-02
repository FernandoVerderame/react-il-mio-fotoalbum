import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        }
    };

    return (
        <div aria-label="Page navigation">
            <ul className="pagination justify-content-center m-0 mt-5">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(page - 1)}>
                        &laquo;
                    </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i + 1} className={`page-item ${i + 1 === page ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                            {i + 1}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                        &raquo;
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
