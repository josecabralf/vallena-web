import { useState } from 'react';
import { Layout, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useAuth } from '../../hooks';
import { AuthService } from '../../services';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Content } from './Content';

const { Sider } = Layout;

const PrivateNavigationComponent = observer(function PrivateNavigation() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const { logged, setLogged, userName } = useAuth();

  if (!logged) {
    navigate('/login');
    return null;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header userName={userName} />

      <Layout>
        <Sider
          width={240}
          style={{ background: colorBgContainer }}
          collapsed={collapsed}
          onCollapse={setCollapsed}
        >
          <Sidebar
            onNavigate={key => {
              if (key === 'logout') {
                AuthService.logout().then(() => setLogged(false));
              } else {
                navigate(`/${key}`);
              }
            }}
          />
        </Sider>
        <Content />
      </Layout>
    </Layout>
  );
});

export default PrivateNavigationComponent;
