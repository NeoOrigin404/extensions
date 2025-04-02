import ToggleButton from "./ToggleButton";
import { deleteExtension } from "../../services/request";
import { useRevalidator } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function ExtensionCard({ extension }: ExtensionsProps) {
  const URL = import.meta.env.VITE_API_URL;
  const { revalidate } = useRevalidator();
  const [extensionToDelete, setExtensionToDelete] =
    useState<ExtensionType | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const deleteDialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (showDeleteConfirmation && extensionToDelete) {
      deleteDialogRef.current?.showModal();
    }
  }, [showDeleteConfirmation, extensionToDelete]);

  const openDeleteModal = (extension: ExtensionType) => {
    setExtensionToDelete(extension);
    setShowDeleteConfirmation(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteConfirmation(false);
    setExtensionToDelete(null);
    deleteDialogRef.current?.close();
  };

  const removeExtension = async () => {
    try {
      await deleteExtension(extension.id);
      revalidate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <img src={`${URL}${extension.logo}`} alt={extension.name} />
      <h2>{extension.name}</h2>
      <p>{extension.description}</p>
      <button type="button" onClick={() => openDeleteModal(extension)}>
        Delete
      </button>
      {showDeleteConfirmation && (
        <dialog
          ref={deleteDialogRef}
          className="confirmation-modal"
          onClick={closeDeleteModal}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              closeDeleteModal();
            }
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            <p>
              Êtes-vous sûr de vouloir supprimer{" "}
              <strong>{extensionToDelete?.name}</strong> ?
            </p>
            <div className="confirmation-buttons">
              <button
                type="button"
                className="confirm-button"
                onClick={() => extensionToDelete !== null && removeExtension()}
              >
                Confirmer
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={closeDeleteModal}
              >
                Annuler
              </button>
            </div>
          </div>
        </dialog>
      )}
      <ToggleButton />
    </section>
  );
}
