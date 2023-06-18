import React, { Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';

export default function Loader({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode | null | undefined;
}) {
  return (
    <Suspense fallback={fallback}>
      <ErrorBoundary fallback="err">{children}</ErrorBoundary>
    </Suspense>
  );
}
