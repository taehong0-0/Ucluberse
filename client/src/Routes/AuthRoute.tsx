import React, { ReactElement } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';

interface Props {
  children: ReactElement;
}

const AuthRoute = ({ children }: Props): React.ReactElement => {
  // const user = useResetRecoilState();
  const status = 'login';
  return status === 'login' ? (
    children
  ) : status === 'info' ? (
    <Navigate to="/login/info" />
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthRoute;
