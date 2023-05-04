import { S } from './searchBox.styled';

interface SearchElement {
  name: string;
  id: number;
}

interface Props {
  searchList: SearchElement[];
  currentIndex: number;
}

const SearchBox = ({ searchList, currentIndex }: Props) => {
  return (
    <S.Container>
      <ul>
        {searchList.length === 0 ? (
          <div>검색어 없음</div>
        ) : (
          searchList.map((e: SearchElement, idx: number) => (
            <S.Element key={e.id} isSelected={idx === currentIndex}>
              <S.SVG width={16} height={16} />
              <p>{e.name}</p>
            </S.Element>
          ))
        )}
      </ul>
    </S.Container>
  );
};

export default SearchBox;
