import { Routes, Route, Navigate } from 'react-router-dom';
import { Login, Register, RegisteredUsers } from '../pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/registeredusers" element={<RegisteredUsers />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
