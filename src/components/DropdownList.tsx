import styled from 'styled-components';
import { DropdownListIcon } from '../icons/DropdownListIcon';

export default function DropdownList({
  keyword,
  selectedIndex,
  dataIndex,
}: {
  keyword: string;
  selectedIndex: number;
  dataIndex: number;
}) {
  return (
    <KeywordContainer className={dataIndex === selectedIndex ? 'selected' : ''}>
      <DropdownListIcon />
      {keyword}
    </KeywordContainer>
  );
}

const KeywordContainer = styled.li`
  display: flex;
  padding: 10px 12px 15px 25px;
  gap: 0.5rem;
  align-items: center;

  &.selected {
    background-color: #dce1e6;
  }
`;
