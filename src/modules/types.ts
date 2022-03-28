export type LoginResponse = {
  cookies: {
    [x: string]: string;
  };
  nick: string;
};

export type MessageResponse = {
  dt: string;
  message: string;
  replys: string[];
};
