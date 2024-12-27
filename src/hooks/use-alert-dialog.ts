import { useCallback } from 'react';

import type { TBaseAlertDialogProps } from '@/stores/alert-dialog.store';
import useAlertDialogStore from '@/stores/alert-dialog.store';

const defaultConfig: Partial<TBaseAlertDialogProps> = {
  message: 'Yes',
  loading: false,
  type: 'default',
  onClose() {},
};

export function useAlertDialog() {
  const props = useAlertDialogStore((state) => state.config);
  const { showAlert: showAlertRaw, closeAlert } = useAlertDialogStore();

  /**
   * Show global alert dialog
   * @param config
   */
  const showAlert = useCallback(
    (config: Partial<TBaseAlertDialogProps>) => {
      showAlertRaw({
        ...defaultConfig,
        ...config,
        onClose() {
          if (config.onClose) {
            config.onClose();
          }
          closeAlert();
        },
      });
    },
    [closeAlert, showAlertRaw]
  );

  /**
   * Show global alert dialog without automatically close
   */
  const showAlertDefault = useCallback(
    (config: Partial<TBaseAlertDialogProps>) => {
      showAlertRaw({
        ...defaultConfig,
        ...config,
      });
    },
    [showAlertRaw]
  );

  /**
   * Reusable alert delete confirm
   */
  const showAlertDeleteSuccess = useCallback(
    (config: Partial<TBaseAlertDialogProps>) => {
      showAlertRaw({
        ...defaultConfig,
        message: 'Data has been deleted',
        ...config,
      });
    },
    [showAlertRaw]
  );

  /**
   * Set alert loading
   */
  const setAlertLoading = useCallback(
    (loading: boolean) => {
      showAlertRaw({ loading });
    },
    [showAlertRaw]
  );

  return {
    props,
    showAlert,
    showAlertDefault,
    showAlertDeleteSuccess,
    setAlertLoading,
    closeAlert,
  };
}
