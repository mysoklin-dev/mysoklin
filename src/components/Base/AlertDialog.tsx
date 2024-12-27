import { Xmark } from 'iconoir-react';
import Image from 'next/image';
import React from 'react';
import { CgSpinner } from 'react-icons/cg';

import type { TBaseAlertDialogProps } from '@/stores/alert-dialog.store';

const BaseAlertDialog = ({
  type,
  message,
  open = false,
  loading,
  onClose,
}: Partial<TBaseAlertDialogProps>) => {
  return open ? (
    <div className="fixed left-0 top-0 z-[999999] h-full w-full bg-black/70">
      <div className="absolute inset-0 m-auto h-fit w-full max-w-sm rounded-2xl bg-white p-8">
        {!loading && (
          <button className="absolute right-4 top-4" onClick={onClose}>
            <Xmark width={26} height={26} />
          </button>
        )}

        {!loading ? (
          <div className="flex flex-col items-center justify-center gap-2.5 py-6">
            <Image
              src={`/assets/images/${
                type === 'success' ? 'amico.svg' : 'no-data.svg'
              }`}
              alt=""
              width={300}
              height={300}
            />
            <span className="text-2xl font-black">{message}</span>
            <button onClick={onClose} className="close">
              Close
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2">
            <CgSpinner size={36} className="animate-spin" />
            <span className="animate-pulse text-xl font-semibold">
              Loading....
            </span>
          </div>
        )}
      </div>
    </div>
  ) : null;
};

export default BaseAlertDialog;
