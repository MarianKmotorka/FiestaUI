import { IApiError, IQueryDocument, IQueryResponse } from '@api/types'
import { IUserDto, RoleEnum } from 'domainTypes'
import { useInfiniteQuery } from 'react-query'
import api from '@api/HttpClient'
import { Wrapper } from './AdminTemplate.styled'
import { CircularProgress } from '@material-ui/core'
import FetchError from '@elements/FetchError/FetchError'
import UserListItem from '@elements/UserListItem/UserListItem'
import Observer from '@elements/Observer'

interface IUser extends IUserDto {
  isDeleted: boolean
  emailConfirmed: boolean
  role: RoleEnum
}

const AdminTemplate = () => {
  const { data, isFetching, isLoading, error, hasNextPage, fetchNextPage } = useInfiniteQuery<
    IQueryResponse<IUser>,
    IApiError
  >(
    ['users', 'query'],
    async ({ pageParam = 0 }) => {
      const queryDocument: IQueryDocument = {
        page: pageParam,
        pageSize: 20
      }
      const res = await api.post('/users/query', {
        queryDocument
      })
      return res.data
    },
    {
      keepPreviousData: true,
      getNextPageParam: ({ hasMore, nextPage }) => (hasMore ? nextPage : false)
    }
  )

  if (isLoading) return <CircularProgress />
  if (error) return <FetchError error={error} />

  const { pages } = data!

  return (
    <Wrapper>
      {pages.map(page => page.entries.map(x => <UserListItem key={x.id} user={x} />))}
      <Observer callback={fetchNextPage} disabled={!hasNextPage || isFetching || isLoading} />
    </Wrapper>
  )
}

export default AdminTemplate
