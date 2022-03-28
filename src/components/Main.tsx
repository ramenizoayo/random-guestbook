import React, { useState } from 'react';
import styled from '@emotion/styled';

const MainBlock = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  h4 {
    margin: 0.5rem 0;
    align-self: center;
  }
  button {
    font-size: 1rem;
    padding: 0.125rem 0.25rem;
    margin: 1rem;
  }
`;

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  label {
    display: flex;
    justify-content: space-between;
    input {
      min-width: 2rem;
      padding: 0.25rem 0;
      margin-left: 0.5rem;
    }
  }
`;

const RadioBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }
`;

type MainProps = {
  nick: string;
  setField: (name: string, value: string) => void;
  getMessages: (
    nick: string,
    friendId: string,
    friendNick: string,
    year: string,
    location: string
  ) => void;
};

const Main = ({ nick, setField, getMessages }: MainProps) => {
  const [input, setInput] = useState({
    nick,
    friendId: 'ramenizoayo',
    friendNick: '라면이조아요',
    year: '',
  });
  const [location, setLocation] = useState('me');

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'nick' | 'friendId' | 'friendNick' | 'year'
  ) =>
    setInput({
      ...input,
      [field]: e.target.value,
    });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.nick || !input.friendId || !input.friendNick || !input.year)
      return;

    let loc = location;
    if (location === 'all') loc = Math.random() >= 0.5 ? 'me' : 'friend';
    setField('location', loc);
    setField('friendNick', input.friendNick);

    getMessages(input.nick, input.friendId, input.friendNick, input.year, loc);
  };

  return (
    <MainBlock onSubmit={onSubmit}>
      <InputBlock>
        <label htmlFor="year">
          년도
          <input
            id="year"
            type="string"
            maxLength={4}
            value={input.year}
            onChange={(e) => onChange(e, 'year')}
            required
          />
        </label>
        <label htmlFor="nick">
          내 닉네임
          <input
            id="nick"
            type="string"
            value={input.nick}
            onChange={(e) => onChange(e, 'nick')}
            required
          />
        </label>
        <label htmlFor="friendId">
          <span>친구 아이디</span>
          <input
            id="friendId"
            type="string"
            value={input.friendId}
            onChange={(e) => onChange(e, 'friendId')}
            required
          />
        </label>
        <label htmlFor="friendNick">
          친구 닉네임
          <input
            id="friendNick"
            type="string"
            value={input.friendNick}
            onChange={(e) => onChange(e, 'friendNick')}
            required
          />
        </label>
        <small>※ 방명록 작성 기준으로 입력해주세요.</small>
      </InputBlock>
      <hr />
      <h4>누구의 방명록에서 가져올까요?</h4>
      <RadioBlock>
        <label htmlFor="me">
          나
          <input
            id="me"
            type="radio"
            name="location"
            checked={location === 'me'}
            onChange={() => setLocation('me')}
          />
        </label>
        <label htmlFor="friend">
          친구
          <input
            id="friend"
            type="radio"
            name="location"
            checked={location === 'friend'}
            onChange={() => setLocation('friend')}
          />
        </label>
        <label htmlFor="all">
          랜덤!
          <input
            id="all"
            type="radio"
            name="location"
            checked={location === 'all'}
            onChange={() => setLocation('all')}
          />
        </label>
      </RadioBlock>
      <button type="submit">가져오기</button>
    </MainBlock>
  );
};

export default Main;
