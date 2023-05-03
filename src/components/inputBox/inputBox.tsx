import { useState, useEffect } from 'react';
import React from 'react';
import { S } from './inputBoxstyled';
import { ReactComponent as Magnifier } from '../../assets/magnifier.svg';
import { getSearchWord } from '../../api/client';
import { useDebounce } from '../../hooks/useDebounce';
import { SetSearchListProp } from '../../type';

const InputBox = ({ setSearchList }: SetSearchListProp) => {
  const [inputValue, setInputValue] = useState<string>('');
  const debounceValue: string = useDebounce(inputValue, 300);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // const checkCacheExpire = () => {
  //   setInterval(() => {
  //     // 만료시간 지난 캐시 삭제
  //     console.log('expire');
  //     for (let elem in localStorage) {
  //       const test = localStorage.getItem(elem);
  //       const localStorageElem: StorageItem = JSON.parse(test!);
  //       if (localStorageElem?.expireTime && localStorageElem?.expireTime <= Date.now()) {
  //         localStorage.removeItem(elem);
  //       }
  //     }
  //   }, 4000);
  // };

  // useEffect(() => {
  //   checkCacheExpire();
  // }, []);

  useEffect(() => {
    const getSearchWordList = async () => {
      const result = await getSearchWord(debounceValue);
      setSearchList(result);
    };

    getSearchWordList();
  }, [debounceValue]);

  return (
    <S.Container>
      <S.FormContainer>
        <S.NotFocus>
          <Magnifier width={16} height={16} color={'#A7AFB7'} />
          <input placeholder="질환명을 입력해 주세요." value={inputValue} onChange={handleChange} />
        </S.NotFocus>
        <S.Button>
          <Magnifier width={20} height={20} color={'#fffff'} />
        </S.Button>
      </S.FormContainer>
    </S.Container>
  );
};

export default InputBox;
