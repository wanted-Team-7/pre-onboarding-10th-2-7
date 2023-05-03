import styled from 'styled-components';

function SearchForm() {
  return (
    <Form>
      <Image src={`${process.env.PUBLIC_URL}/assets/search.svg`} alt="search" />
      <Input type="text" placeholder="질환명을 입력해 주세요." />
      <Button>검색</Button>
    </Form>
  );
}

export default SearchForm;

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 auto 20px;
  height: 50px;
`;

const Image = styled.img`
  position: absolute;
  width: 25px;
  height: 25px;
  left: 20px;
`;

const Input = styled.input`
  width: 420px;
  height: 100%;
  border: none;
  border-radius: 50px 0px 0px 50px;
  padding: 0px;
  padding-left: 50px;
  font-size: 18px;
`;

const Button = styled.button`
  position: absolute;
  right: 0;
  width: 80px;
  height: 100%;
  border: none;
  border-radius: 0 50px 50px 0;
  background-color: RoyalBlue;
  color: white;
  cursor: pointer;
  font-size: 18px;
`;
