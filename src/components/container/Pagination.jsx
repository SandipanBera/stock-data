import ReactPaginate from "react-paginate";
function Pagination({ items, itemsPerPage, setStartIndex }) {
  const pageCount = Math.ceil(items.length / itemsPerPage);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newsStartIndex = (event.selected * itemsPerPage) % items.length;
    setStartIndex(newsStartIndex);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        className="text-white flex flex-row gap-6 justify-center p-2 rounded-full "
        pageClassName="w-7 h-7 rounded-full text-center hover:bg-sky-500"
      />
    </>
  );
}

export default Pagination;
