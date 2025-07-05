import { LoginScreen } from '../screens';
import { observer } from 'mobx-react';
import { Route, Routes } from 'react-router-dom';

const PublicNavigationComponent = observer(function PublicNavigation() {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/*" element={<LoginScreen />} />
    </Routes>
  );
});

export default PublicNavigationComponent;
