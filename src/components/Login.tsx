import React, { useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { LoginResponse } from '../modules/types';

const FormBlock = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  label {
    display: flex;
    justify-content: space-between;
  }
  input {
    min-width: 2rem;
    padding: 0.25rem 0;
    margin-left: 0.5rem;
  }
  button {
    padding: 0.25rem 0.5rem;
  }
`;

const UserBlock = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
`;

type LoginProps = {
  username: string;
  setLoading: () => void;
  setError: (error: string) => void;
  setField: (name: string, value: string) => void;
  setCookies: (cookies: { [x: string]: string }) => void;
};

const Login = ({
  username,
  setLoading,
  setError,
  setField,
  setCookies,
}: LoginProps) => {
  const [input, setInput] = useState({
    id: '',
    pw: '',
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'id' | 'pw'
  ) =>
    setInput({
      ...input,
      [field]: e.target.value,
    });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading();

    try {
      const response = await axios.post('https://randomguestbook.ddns.net:5000/login', {
        id: input.id,
        pw: input.pw,
      });
      const { cookies, nick } = response.data as LoginResponse;

      setField('id', input.id);
      setField('nick', nick);
      setCookies(cookies);
    } catch (err: unknown) {
      setError('로그인에 실패하였습니다.');
    }

    setInput({
      id: '',
      pw: '',
    });
  };

  if (username)
    return (
      <UserBlock>
        안녕하세요, <b>{username}</b>님!
      </UserBlock>
    );

  return (
    <FormBlock onSubmit={onSubmit}>
      <label htmlFor="id">
        아이디
        <input
          id="id"
          type="text"
          value={input.id}
          onChange={(e) => onChange(e, 'id')}
          required
        />
      </label>
      <label htmlFor="pw">
        패스워드
        <input
          id="pw"
          type="password"
          value={input.pw}
          onChange={(e) => onChange(e, 'pw')}
          required
        />
      </label>
      <button type="submit">로그인</button>
      <small>※ 개인정보는 어디에도 저장되지 않습니다.</small>
    </FormBlock>
  );
};

export default Login;
