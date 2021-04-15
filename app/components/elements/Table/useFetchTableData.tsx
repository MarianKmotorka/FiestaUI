import { useQuery } from 'react-query'
import { Filters } from 'react-table'

import api from '@api/HttpClient'
import { IApiError, FilterOperation, IQueryDocument, IQueryResponse } from '@api/types'

export interface ITableEndpoint {
  url: string
}

interface UseFetchTableDataParams {
  endpoint: ITableEndpoint
  enabled: boolean
  page: number
  pageSize: number
  filters: Filters<any>
}

const useFetchTableData = ({
  endpoint,
  enabled,
  page,
  pageSize,
  filters
}: UseFetchTableDataParams) => {
  const queryDocument: IQueryDocument = {
    page,
    pageSize,
    filters: filters.map(x => ({
      fieldName: x.id,
      operation: FilterOperation.Contains,
      fieldValue: x.value
    })),
    sorts: []
  }

  const { data, isLoading, isFetching, refetch, error } = useQuery<
    IQueryResponse<Record<string, any>>,
    IApiError
  >(
    [endpoint, queryDocument],
    async () => {
      const res = await api.post(endpoint.url, { queryDocument })
      return res.data
    },
    {
      enabled,
      keepPreviousData: true,
      staleTime: 60_000
    }
  )

  return {
    data,
    error,
    loading: isLoading || isFetching,
    refetch: () => refetch()
  }
}

export default useFetchTableData
