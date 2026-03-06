'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function DropdownPortal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Use requestAnimationFrame to ensure state update happens asynchronously
    // after the browser has painted, avoiding cascading renders
    const animationId = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
}
