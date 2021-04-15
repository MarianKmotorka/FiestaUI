import { TablePagination as MuiTablePagination } from '@material-ui/core'
interface IProps {
  page: number
  totalPages: number
  totalEntries: number

  pageSize: number
  goToPage: (page: number) => void
  setPageSize: (size: number) => void
}

const TablePagination = ({
  page,
  totalPages,
  totalEntries,
  pageSize,
  setPageSize,
  goToPage
}: IProps) => {
  return (
    <MuiTablePagination
      component='div'
      page={page}
      count={totalEntries}
      rowsPerPage={pageSize}
      labelRowsPerPage='Rows per page' //translate
      onChangePage={(_, x) => goToPage(x)}
      rowsPerPageOptions={[2, 5, 10, 25, 50, 100]}
      onChangeRowsPerPage={e => setPageSize(parseInt(e.target.value))}
      labelDisplayedRows={() => `${page + 1} of ${totalPages}`} //translate
    />
  )
}

export default TablePagination
