import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function HomePage() {
  return (
    <div>
      <Title level={1}>Welcome to {{project-title}}</Title>
    </div>
  );
}
