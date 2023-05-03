import styled from 'styled-components';

function SearchList() {
  const result = [0, 1, 2];

  return (
    <List>
      <ListLabel>추천 검색어</ListLabel>
      {result.length === 0 ? (
        <div>검색어 없음</div>
      ) : (
        result.map(item => (
          <ListItem key={item}>
            <Image src={`${process.env.PUBLIC_URL}/assets/search.svg`} alt="search" />
            <p>{'sampleText' + item}</p>
          </ListItem>
        ))
      )}
    </List>
  );
}

export default SearchList;

const List = styled.div`
  border-radius: 15px;
  background-color: white;
  padding: 20px;
`;

const ListLabel = styled.p`
  font-size: 14px;
  color: darkgray;
  margin-bottom: 10px;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Image = styled.img`
  width: 25px;
  height: 25px;
`;
