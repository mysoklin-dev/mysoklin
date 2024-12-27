import { create } from 'zustand';

export type TBaseAlertDialogProps = {
  open: boolean;
  message: string;
  loading: boolean;
  onClose: () => void | Promise<void>;
  type: 'default' | 'error' | 'success';
};

export type TBaseAlertDialogStore = {
  config: Partial<TBaseAlertDialogProps>;
  showAlert: (config?: Partial<TBaseAlertDialogProps>) => void;
  closeAlert: () => void;
};

const useAlertDialogStore = create<TBaseAlertDialogStore>((set) => ({
  config: {},
  showAlert(conf?: Partial<TBaseAlertDialogProps>) {
    set((state) => ({
      config: {
        ...state.config,
        ...conf,
        open: true,
      },
    }));
  },
  closeAlert() {
    set((state) => ({
      config: {
        ...state.config,
        open: false,
      },
    }));
  },
}));

export default useAlertDialogStore;
