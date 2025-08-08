import { loadRemote } from '@module-federation/modern-js/runtime';
import React, { useState, useEffect } from 'react';

interface ContentHandlerProps {
  name: string;
  title: string;
  componentPath: string;
}

export default function ContentHandler({ name, title, componentPath }: ContentHandlerProps) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    loadRemote(componentPath)
      .then((module: any) => {
        setComponent(() => module.default);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to load remote component:', error);
        setLoading(false);
      });
  }, [componentPath]);

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>{title}</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        This is the content for the <i>{name}</i> page.
      </p>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '32px 0' }}>Loading...</div>
      ) : Component ? (
        <Component />
      ) : (
        <div style={{ textAlign: 'center', padding: '32px 0', color: 'red' }}>Failed to load component</div>
      )}
    </div>
  );
}