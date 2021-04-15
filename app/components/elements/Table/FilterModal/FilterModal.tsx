import { reduce } from 'lodash'
import { useMemo, useState } from 'react'
import { Filters, HeaderGroup } from 'react-table'
import { Box, Typography } from '@material-ui/core'
import { Clear, FilterListRounded, Search } from '@material-ui/icons'

import Modal from '@elements/Modal'
import Button from '@elements/Button/Button'
import { FiltersContainer, StyledCard } from './FilterModal.styled'

interface IFilterModalProps {
  open: boolean
  headerGroups: HeaderGroup<any>[]
  onClose: () => void
  setAllFilters: (updater: Filters<any>) => void
}

const FilterModal = ({ open, headerGroups, onClose, setAllFilters }: IFilterModalProps) => {
  const [values, setValues] = useState<Record<string, any>>({})
  const columns = useMemo(() => headerGroups.flatMap(hg => hg.headers), [headerGroups])

  const handleFilter = () => {
    const filters = reduce(values, (acc, value, key) => [...acc, { id: key, value }], [] as any[])
    setAllFilters(filters)
    onClose()
  }

  const handleClear = () => {
    setAllFilters([])
    setValues({})
    onClose()
  }

  return (
    <Modal keepMounted open={open} onClose={onClose}>
      <StyledCard>
        <Box display='flex' alignItems='center' gridGap='10px' marginBottom='20px'>
          <FilterListRounded />
          <Typography variant='h5'>Filters</Typography>
        </Box>

        <FiltersContainer>
          {columns.map(col =>
            col.Filter
              ? col.render('Filter', {
                  key: col.id,
                  setValue: (value: any) => setValues(prev => ({ ...prev, [col.id]: value })),
                  value: values[col.id]
                })
              : null
          )}
        </FiltersContainer>

        <Box marginTop='15px' justifyContent='flex-end' display='flex' gridGap='5px'>
          <Button onClick={handleFilter} startIcon={<Search />} variant='outlined'>
            Filter
          </Button>

          <Button startIcon={<Clear />} variant='outlined' onClick={handleClear}>
            Clear
          </Button>
        </Box>
      </StyledCard>
    </Modal>
  )
}

export default FilterModal
