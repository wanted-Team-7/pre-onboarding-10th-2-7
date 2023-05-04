import { useState, useEffect } from 'react';
import React from 'react';
import { S } from './inputBoxstyled';
import { ReactComponent as Magnifier } from '../../assets/magnifier.svg';
import { ReactComponent as Delete } from '../../assets/delete.svg';
import { getSearchWord } from '../../api/client';
import { useDebounce } from '../../hooks/useDebounce';

interface Props {
  setSearchList: React.Dispatch<React.SetStateAction<[]>>;
  setIsFocus: React.Dispatch<React.SetStateAction<boolean>>;
  setIsInputValue: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  handleKeyboard: any;
  isFocus: boolean;
  isInputValue: boolean;
}

const InputBox = ({
  setSearchList,
  isFocus,
  setIsFocus,
  setIsInputValue,
  isInputValue,
  handleKeyboard,
  setCurrentIndex,
}: Props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const debounceValue: string = useDebounce(inputValue, 300);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length !== 0) {
      setIsInputValue(true);
    } else {
      setIsInputValue(false);
      setCurrentIndex(-2);
    }

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
      setSearchList(result.length <= 7 ? result : result.slice(0, 7));
    };
    getSearchWordList();
  }, [debounceValue]);

  return (
    <S.Container>
      <S.FormContainer isFocus={isFocus}>
        {!isFocus && !isInputValue ? (
          <S.NotFocus>
            <Magnifier width={16} height={16} color={'#A7AFB7'} />
            <div>질환명을 입력해 주세요.</div>
          </S.NotFocus>
        ) : null}
        <S.Focus>
          <input
            value={inputValue}
            onChange={handleChange}
            onFocus={() => setIsFocus(true)}
            onBlur={() => {
              setIsFocus(false);
              setCurrentIndex(-2);
            }}
            onKeyDown={handleKeyboard}
          />
          {isFocus ? (
            <span>
              <Delete width={16} height={16} />
            </span>
          ) : null}
        </S.Focus>
        <S.Button>
          <Magnifier width={20} height={20} color={'#fffff'} />
        </S.Button>
      </S.FormContainer>
    </S.Container>
  );
};

export default InputBox;
