import { useAuth } from '@contextProviders/AuthProvider'
import TextFilter from '@elements/Table/Filters/TextFilter'
import Table from '@elements/Table/Table'
import TableProvider from '@elements/Table/TableProvider'
import DefaultLayout from '@layouts/DefaultLayout'
import { Avatar, Box } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { useMemo } from 'react'
import { Column } from 'react-table'

const TableComponent = () => {
  const auth = useAuth()
  const { t } = useTranslation('common')

  const columns: Column<any>[] = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id'
      },
      {
        Header: t('username'),
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
    ],
    [t]
  )

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
