import { S } from './searchBox.styled';
import { SearchElement } from '../../type';

const SearchBox = ({ searchList }: { searchList: SearchElement[] }) => {
  const list = searchList.length > 7 ? searchList.slice(0, 7) : searchList;
  return (
    <S.Container>
      <ul>
        {list.length === 0 ? (
          <div>검색어 없음</div>
        ) : (
          list.map(e => (
            <S.Element>
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
