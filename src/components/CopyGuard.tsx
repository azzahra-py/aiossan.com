'use client';

import { useEffect } from 'react';

// Site-wide copy protection for the book content.
// Layers: text selection is disabled in CSS (globals.css), and this guard
// blocks the context menu, copy/cut events, drag, and the copy/save/print
// keyboard shortcuts. Form fields (input, textarea, select, contentEditable)
// stay fully usable: events originating inside them are left alone.
// This is a deterrent layer, not absolute DRM: it stops casual copying,
// which is the realistic goal for browser-delivered text.
export function CopyGuard() {
  useEffect(() => {
    const isEditableTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      return Boolean(
        target.closest('input, textarea, select, [contenteditable="true"]')
      );
    };

    const blockUnlessEditable = (event: Event) => {
      if (!isEditableTarget(event.target)) {
        event.preventDefault();
      }
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey)) return;
      const key = event.key.toLowerCase();
      if (['c', 'x', 's', 'p'].includes(key) && !isEditableTarget(event.target)) {
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', blockUnlessEditable);
    document.addEventListener('copy', blockUnlessEditable);
    document.addEventListener('cut', blockUnlessEditable);
    document.addEventListener('dragstart', blockUnlessEditable);
    document.addEventListener('selectstart', blockUnlessEditable);
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('contextmenu', blockUnlessEditable);
      document.removeEventListener('copy', blockUnlessEditable);
      document.removeEventListener('cut', blockUnlessEditable);
      document.removeEventListener('dragstart', blockUnlessEditable);
      document.removeEventListener('selectstart', blockUnlessEditable);
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return null;
}
