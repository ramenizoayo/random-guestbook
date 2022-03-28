import React, { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import useReducerHook from './modules/useReducerHook';
import { MessageResponse } from './modules/types';
import Loading from './components/Loading';
import Login from './components/Login';
import Main from './components/Main';
import Messages from './components/Messages';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 480px;
  padding: 2rem 0;
  .error {
    color: #d32f2f;
    margin-bottom: 1rem;
  }
`;

const AppBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: white;
`;

function App() {
  const { state, setLoading, setSuccess, setError, setField, setCookies } =
    useReducerHook();
  const [messages, setMessages] = useState<{
    dt: string;
    message: string;
    replys: string[];
  }>({
    dt: '',
    message: '',
    replys: [],
  });

  const getMessages = async (
    nick: string,
    friendId: string,
    friendNick: string,
    year: string,
    location: string
  ) => {
    setLoading();
    try {
      const response = await axios.post(
        'https://randomguestbook.ddns.net:5000/guestbook',
        {
          cookies: state.cookies,
          id: location === 'me' ? state.id : friendId,
          nick: location === 'me' ? nick : friendNick,
          friendNick: location === 'me' ? friendNick : nick,
          year,
        },
        { withCredentials: true }
      );

      const { dt, message, replys } = response.data as MessageResponse;
      console.log(dt, message, replys);

      setSuccess();
      setMessages({
        dt,
        message,
        replys,
      });
    } catch (err: unknown) {
      setError('해당하는 메시지가 없습니다.');
    }
  };

  return (
    <AppWrapper>
      <h2>랜덤 방명록 추출기</h2>
      <AppBlock>
        <Loading visible={state.loading} />
        <Login
          username={state.nick}
          setLoading={setLoading}
          setError={setError}
          setField={setField}
          setCookies={setCookies}
        />
        {state.cookies && (
          <Main
            nick={state.nick}
            setField={setField}
            getMessages={getMessages}
          />
        )}
        {state.error && <small className="error">{state.error}</small>}
        {(messages.message || messages.replys.length > 0) && (
          <Messages
            nick={state.nick}
            friendNick={state.friendNick}
            location={state.location}
            dt={messages.dt}
            message={messages.message}
            replys={messages.replys}
          />
        )}
      </AppBlock>
    </AppWrapper>
  );
}

export default App;
