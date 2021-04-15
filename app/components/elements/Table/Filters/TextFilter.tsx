import TextBox from '@elements/TextBox/TextBox'
import { FilterProps } from 'react-table'

const TextFilter = ({ column: { Header }, setValue, value }: FilterProps<any>) => {
  return (
    <div>
      <TextBox
        fullWidth
        variant='outlined'
        color='secondary'
        label={Header?.toString()}
        value={value || ''}
        onChange={value => {
          setValue(value || undefined)
        }}
      />
    </div>
  )
}

export default TextFilter
