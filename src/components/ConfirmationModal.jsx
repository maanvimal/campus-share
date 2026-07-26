function ConfirmationModal({
  isOpen,
  title,
  message,
  cancelLabel = 'Cancel',
  confirmLabel = 'Delete',
  onCancel,
  onConfirm,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-2xl transition-all duration-200">
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{message}</p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
