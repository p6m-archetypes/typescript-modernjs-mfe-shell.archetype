import { loadRemote } from '@module-federation/modern-js/runtime';
import { Typography } from 'antd';
import React, { Suspense, useMemo } from 'react';

const { Title, Paragraph } = Typography;

interface ContentHandlerProps {
  name: string;
  title: string;
  componentPath: string;
}

export default function ContentHandler({ name, title, componentPath }: ContentHandlerProps) {
  const Component = useMemo<React.ComponentType>(
    () => React.lazy(() => loadRemote(componentPath) as Promise<{ default: React.ComponentType }>),
    [componentPath],
  );

  return (
    <div>
      <Title level={1}>{title}</Title>
      <Paragraph>
        This is the content for the <i>{name}</i> page.
      </Paragraph>
      <Suspense key={componentPath} fallback={<div>Loading...</div>}>
        <Component />
      </Suspense>
    </div>
  );
}
