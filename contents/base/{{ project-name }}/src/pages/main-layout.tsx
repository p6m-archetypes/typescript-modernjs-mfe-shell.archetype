import { Outlet, useLocation } from '@modern-js/runtime/router';
import { ConfigProvider, Layout } from 'antd';

const { Header, Content } = Layout;

const headerStyle = {
  backgroundColor: '#001529',
  color: 'white',
  padding: '0 24px'
};

export default function MainLayout() {
  const { pathname } = useLocation();

  return (
    <ConfigProvider>
      <Layout>
        <Header style={headerStyle}>
          {{project-name}}
        </Header>
        <Layout>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
