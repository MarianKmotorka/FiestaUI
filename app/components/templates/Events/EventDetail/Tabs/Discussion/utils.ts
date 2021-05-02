import { ISkippedItemsResponse } from '@api/types'
import { InfiniteData, QueryClient } from 'react-query'
import { IComment } from './Discussion'

export const increaseReplyCount = (
  queryClient: QueryClient,
  queryKey: any,
  commentId: string,
  amount: number = 1
) => {
  queryClient.setQueryData<InfiniteData<ISkippedItemsResponse<IComment>>>(queryKey, prev => ({
    ...prev!,
    pages: prev!.pages.map((page, pageIndex) => ({
      ...page,
      entries: page.entries.map(e =>
        e.id === commentId ? { ...e, replyCount: e.replyCount + amount } : e
      )
    }))
  }))
}

export const addComment = (queryClient: QueryClient, queryKey: any, newComment: IComment) => {
  queryClient.setQueryData<InfiniteData<ISkippedItemsResponse<IComment>>>(queryKey, prev =>
    prev
      ? {
          ...prev,
          pages: prev.pages.map((page, pageIndex) => ({
            ...page,
            entries: pageIndex === 0 ? [newComment, ...page.entries] : page.entries
          }))
        }
      : { pages: [], pageParams: [] }
  )
}

export const editComment = (queryClient: QueryClient, queryKey: any, edited: IComment) => {
  queryClient.setQueryData<InfiniteData<ISkippedItemsResponse<IComment>>>(queryKey, prev => ({
    ...prev!,
    pages: prev!.pages.map((page, pageIndex) => ({
      ...page,
      entries: page.entries.map(e => (e.id === edited.id ? edited : e))
    }))
  }))
}

export const removeComment = (queryClient: QueryClient, queryKey: any, removed: IComment) => {
  queryClient.setQueryData<InfiniteData<ISkippedItemsResponse<IComment>>>(queryKey, prev => ({
    ...prev!,
    pages: prev!.pages.map(page => ({
      ...page,
      entries: page.entries.filter(e => e.id !== removed.id)
    }))
  }))
}
