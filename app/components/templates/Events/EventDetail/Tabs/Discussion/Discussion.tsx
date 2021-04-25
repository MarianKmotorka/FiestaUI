import { IUserDto } from 'domainTypes'
import { IEventDetail } from '../../EventDetailTemplate'
import Comment from './Comment/Comment'
import { comments } from './commentsMock'
import NewComment from './NewComment/NewComment'

interface IDiscussionProps {
  event: IEventDetail
}

export interface IComment {
  id: string
  text: string
  createdAt: string
  replyCount: number
  sender: IUserDto
  parentId?: string
}

const Discussion = ({ event }: IDiscussionProps) => {
  const submitComment = async (text: string) => {
    await new Promise(res => setTimeout(res, 1000))
  }

  return (
    <>
      <NewComment onSend={submitComment} />

      {comments.map(x => (
        <Comment key={x.id} comment={x} isOrganizerComment={x.sender.id === event.organizer.id} />
      ))}
    </>
  )
}

export default Discussion
