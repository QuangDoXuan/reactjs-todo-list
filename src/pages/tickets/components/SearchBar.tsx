import { Button, Select } from 'antd'
import { TicketStatusEnum } from '../ticket.enum'

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export const SearchBar = ({onSearch}: SearchBarProps) => {
  return (
    <div className="search-bar">
      <Select
        onChange={(value) => onSearch(value)}
        showSearch
        style={{ width: 200 }}
        placeholder="Select to search"
        optionFilterProp="children"
        options={[...Object.values(TicketStatusEnum)].map(item => ({ value: item, label: item }))}
      />
    </div>
  )
}
