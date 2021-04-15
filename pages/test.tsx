import { useAuth } from '@contextProviders/AuthProvider'
import TextFilter from '@elements/Table/Filters/TextFilter'
import Table from '@elements/Table/Table'
import TableProvider from '@elements/Table/TableProvider'
import DefaultLayout from '@layouts/DefaultLayout'
import { Avatar, Box } from '@material-ui/core'
import Link from 'next/link'
import { Column } from 'react-table'

// const data = [
//   {
//     id: 1,
//     username: 'Buran',
//     age: 44,
//     size: 98
//   },
//   {
//     id: 2,
//     username: 'Brko',
//     age: 11,
//     size: 98
//   },
//   {
//     id: 3,
//     username: 'Zisko',
//     age: 32,
//     size: 98
//   },
//   {
//     id: 'hex',
//     username: 'Buranko',
//     age: 65,
//     size: 98
//   },
//   {
//     id: 'Ada',
//     username: 'Buranko',
//     age: 65,
//     size: 98
//   },
//   {
//     id: 6,
//     username: 'Buranko',
//     age: 65,
//     size: 98
//   },
//   {
//     id: 7,
//     username: 'Buranko',
//     age: 65,
//     size: 98
//   },
//   {
//     id: 8,
//     username: 'Buranko',
//     age: 65,
//     size: 98
//   },
//   {
//     id: 9,
//     username: 'Buranko',
//     age: 65,
//     size: 98
//   },
//   {
//     id: 11,
//     username: 'Buranko',
//     age: 21,
//     size: 98
//   }
// ]

const columns: Column<any>[] = [
  {
    Header: 'Id',
    accessor: 'id',
    Filter: TextFilter
  },
  {
    Header: 'Name',
    accessor: 'username',
    Filter: TextFilter,
    Cell: ({ row: { original }, value }) => (
      <Link href={`/users/${original.id}`}>
        <Box display='flex' alignItems='center' gridGap='9px' style={{ cursor: 'pointer' }}>
          <Avatar src={original.pictureUrl} />
          <p>{value}</p>
        </Box>
      </Link>
    )
  }
]

const TableComponent = () => {
  const auth = useAuth()

  if (!auth.isLoggedIn) return <h1>Log in</h1>

  return (
    <Box paddingY='70px'>
      <Table
        columns={columns}
        dataOrEndpoint={{ url: `/users/${auth.currentUser.id}/friends/query` }}
        height='500px'
        selectable
      />
    </Box>
  )
}

const Test = () => {
  return (
    <DefaultLayout title='test'>
      <TableProvider>
        <TableComponent />
      </TableProvider>
    </DefaultLayout>
  )
}

export default Test
