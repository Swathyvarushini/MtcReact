import React from 'react';

const Filter = ({ filterCriteria, handleFilterChange }) => (
    <div className='filter-container'>
        <svg xmlns="http://www.w3.org/2000/svg" className="filter-icon" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M11 18q-.425 0-.712-.288T10 17t.288-.712T11 16h2q.425 0 .713.288T14 17t-.288.713T13 18zm-4-5q-.425 0-.712-.288T6 12t.288-.712T7 11h10q.425 0 .713.288T18 12t-.288.713T17 13zM4 8q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z" /></svg>
        <select value={filterCriteria} onChange={handleFilterChange} className="filter-select">
            <option value=''>All</option>
            <option value='admin'>Admin</option>
            <option value='user'>User</option>
        </select>
    </div>
);

export default Filter;
