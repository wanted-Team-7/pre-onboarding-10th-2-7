import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { S } from './inputBoxstyled';
import { ReactComponent as Magnifier } from '../../assets/magnifier.svg';
import { ReactComponent as Delete } from '../../assets/delete.svg';
import { getSearchWord } from '../../api/client';
import { useDebounce } from '../../hooks/useDebounce';
import { handleExpireCache } from '../../util/expireCache';
import { SEARCH_LIST_MAX_LENGTH, DEBOUNCE_TIME } from '../../constants';

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const debounceValue: string = useDebounce(inputValue, DEBOUNCE_TIME);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length !== 0) {
      setIsInputValue(true);
    } else {
      setIsInputValue(false);
      setCurrentIndex(-2);
    }

    setInputValue(e.target.value);
  };

  useEffect(() => {
    const getSearchWordList = async () => {
      const result = await getSearchWord(debounceValue);
      setSearchList(
        result.length <= SEARCH_LIST_MAX_LENGTH ? result : result.slice(0, SEARCH_LIST_MAX_LENGTH)
      );
    };
    getSearchWordList();
  }, [debounceValue]);

  useEffect(() => {
    handleExpireCache();
  }, []);

  // const onClickDeleteBtn = () => {
  //   console.log(inputRef);
  //   setInputValue('');
  //   inputRef.current?.focus();
  // };

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
            ref={inputRef}
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
            <span onClick={() => console.log('hello')}>
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
