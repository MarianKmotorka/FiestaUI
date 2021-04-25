import { IComment } from './Discussion'

export const comments: IComment[] = [
  {
    id: 'sdc',
    createdAt: '2021-04-25,8:00',
    text: 'Zvaram to fene co len ide',
    replyCount: 4,
    sender: {
      id: 'dsc',
      username: 'zvaraldko#10',
      fullName: 'Kundus Zvaral'
    }
  },
  {
    id: 'awda3054',
    createdAt: '2021-04-25',
    text: 'Zvaram to fene co len iode',
    replyCount: 0,
    sender: {
      id: '5a9154ee-8993-499f-b87e-6949a12b3054',
      username: 'gero_oref',
      fullName: 'Kundus Zvaral'
    }
  },
  {
    id: 'sawawdc',
    createdAt: '2021-04-18',
    text: 'Zvaram to fene co len iode',
    replyCount: 1,
    sender: {
      id: 'dsc',
      username: 'zvaraldko#10',
      fullName: 'Kundus Zvaral'
    }
  }
]
