import { loadRemote } from '@module-federation/modern-js/runtime';
import React, { useState, useEffect, CSSProperties } from 'react';

interface ContentHandlerProps {
  name: string;
  title: string;
  componentPath: string;
}

const containerStyle: CSSProperties = { padding: '24px' };
const titleStyle: CSSProperties = { fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' };
const descriptionStyle: CSSProperties = { color: '#666', marginBottom: '24px' };
const loadingStyle: CSSProperties = { textAlign: 'center', padding: '32px 0' };
const errorStyle: CSSProperties = { textAlign: 'center', padding: '32px 0', color: 'red' };

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
    <div style={containerStyle}>
      <h1 style={titleStyle}>{title}</h1>
      <p style={descriptionStyle}>
        This is the content for the <i>{name}</i> page.
      </p>
      {loading ? (
        <div style={loadingStyle}>Loading...</div>
      ) : Component ? (
        <Component />
      ) : (
        <div style={errorStyle}>Failed to load component</div>
      )}
    </div>
  );
}