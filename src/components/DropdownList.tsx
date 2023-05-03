import styled from 'styled-components';
import { DropdownListIcon } from '../icons/DropdownListIcon';

export default function DropdownList({ keyword }: { keyword: string }) {
  return (
    <KeywordContainer>
      <DropdownListIcon />
      {keyword}
    </KeywordContainer>
  );
}

const KeywordContainer = styled.li`
  display: flex;
  padding: 10px 12px;
  gap: 0.5rem;
`;
