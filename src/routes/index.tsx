import { Routes, Route, Navigate } from 'react-router-dom';
import { Login, Register } from '../pages';
import RegisteredUsersTable from '../pages/registeredUsers';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/registeredusers" element={<RegisteredUsersTable />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
