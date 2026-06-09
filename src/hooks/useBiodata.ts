'use client';

import { useBiodataStore } from '@/lib/store';

export const useBiodata = () => {
  const store = useBiodataStore();

  return {
    state: store.state,
    updateState: store.updateState,
    updateNestedState: store.updateNestedState,
    resetToDefault: store.resetToDefault,
    clearDraft: store.clearDraft,
    saveToCloud: store.saveToCloud,
    isDirty: store.isDirty,
    setIsDirty: store.setIsDirty,
  };
};
