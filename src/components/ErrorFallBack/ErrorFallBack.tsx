import React from 'react';

import { Button } from 'antd';
import { FallbackProps } from 'react-error-boundary';

export const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error ? error.message : null}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
      <Button type="primary" onClick={() => (window.location.href = '/')}>
        Go home
      </Button>
    </div>
  );
};
