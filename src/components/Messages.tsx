import React from 'react';
import styled from '@emotion/styled';

const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem 0.5rem;
  border-radius: 0.5rem;
  background: #9bbbd4;
  white-space: pre-wrap;
  word-wrap: break-word;
  small {
    align-self: center;
  }
`;

const MessagesBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  .nick {
    align-self: flex-end;
  }
`;

const FriendMessage = styled.div`
  align-self: flex-start;
  padding: 0.5rem;
  max-width: 70%;
  border-radius: 0 1rem 1rem 1rem;
  background: white;
`;

const MyMessage = styled.div`
  align-self: flex-end;
  padding: 0.5rem;
  max-width: 70%;
  border-radius: 1rem 0 1rem 1rem;
  background: #fef01b;
`;

type MessagesProps = {
  location: string;
  nick: string;
  dt: string;
  friendNick: string;
  message: string;
  replys: string[];
};

const Messages = ({
  location,
  dt,
  nick,
  friendNick,
  message,
  replys,
}: MessagesProps) => {
  return (
    <MessagesWrapper>
      <small>{dt}</small>
      {location === 'me' ? (
        <MessagesBlock>
          <b className="friendNick">{friendNick}</b>
          <FriendMessage>{message}</FriendMessage>
          <b className="nick">{nick}</b>
          {replys && replys.length > 0 ? (
            replys.map((reply) => (
              <MyMessage key={reply.length}>{reply}</MyMessage>
            ))
          ) : (
            <MyMessage>답장이 없습니다.</MyMessage>
          )}
        </MessagesBlock>
      ) : (
        <MessagesBlock>
          <b className="nick">{nick}</b>
          <MyMessage>{message}</MyMessage>
          <b className="friendNick">{friendNick}</b>
          {replys && replys.length > 0 ? (
            replys.map((reply) => (
              <FriendMessage key={reply.length}>{reply}</FriendMessage>
            ))
          ) : (
            <FriendMessage>답장이 없습니다.</FriendMessage>
          )}
        </MessagesBlock>
      )}
    </MessagesWrapper>
  );
};

export default Messages;
