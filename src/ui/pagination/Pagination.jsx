import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.css'

export const Pagination = ({ pageCount, handleNextPage }) => {
  const handlePageChange = (value) => {
    const { selected } = value // page selected
    handleNextPage(selected + 1)
  }

  return (
    <ReactPaginate
      previousLabel={'<'}
      nextLabel={'>'}
      breakLabel={'...'}
      pageCount={pageCount}
      containerClassName={styles.container_pagination}
      pageClassName={styles.page_item}
      activeClassName={styles['page_item--active']}
      pageLinkClassName={styles.page_link}
      nextLinkClassName={styles.page_link}
      previousLinkClassName={styles.page_link}
      previousClassName={styles.page_item}
      nextClassName={styles.page_item}
      onPageChange={handlePageChange}
    />
  )
}
