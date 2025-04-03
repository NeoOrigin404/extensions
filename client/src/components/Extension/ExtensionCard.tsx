import ToggleButton from "./ToggleButton";
import { deleteExtension, updateExtension } from "../../services/request";
import { useRevalidator } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../../styles/ExtensionHome/extensionCard.scss";

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

  const [editExtension, setEditExtension] = useState({
    id: Number(),
    name: "",
    logo: "",
    description: "",
    is_active: false,
    is_premium: false,
  });

  const handleChangeExtensionForm = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEditExtension({ ...editExtension, [e.target.name]: e.target.value });
  };

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openModal = (extension: ExtensionType) => {
    setEditExtension(extension);
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    dialogRef.current?.close();
    document.body.style.overflow = "";
  };

  const handleEditExtension = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateExtension(editExtension.id, editExtension);
    revalidate();
    closeModal();
  };

  return (
    <article>
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
              Are you sure you want to delete{" "}
              <strong>{extensionToDelete?.name}</strong> ?
            </p>
            <div className="confirmation-buttons">
              <button
                type="button"
                className="confirm-button"
                onClick={() => extensionToDelete !== null && removeExtension()}
              >
                Confirm
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
      <ToggleButton />
      <button type="button" onClick={() => openModal(extension)}>
        Edit
      </button>
      <dialog
        ref={dialogRef}
        className="modal"
        onClick={closeModal}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            closeModal();
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
          {editExtension && (
            <form onSubmit={handleEditExtension} className="form-dashboard">
              <p>Name</p>
              <input
                type="text"
                value={editExtension.name}
                name="name"
                placeholder="Name"
                onChange={handleChangeExtensionForm}
              />
              <p>Logo</p>
              <input
                type="text"
                value={editExtension.logo}
                name="logo"
                id="logo"
                placeholder="URL"
                onChange={handleChangeExtensionForm}
              />
              <p>Description</p>
              <input
                type="text"
                value={editExtension.description}
                name="description"
                placeholder="Description"
                onChange={handleChangeExtensionForm}
              />
              <button type="submit" className="modify-form">
                Edit
              </button>
              <button
                type="submit"
                className="close-modal"
                onClick={closeModal}
              >
                Close
              </button>
            </form>
          )}
        </div>
      </dialog>
    </article>
  );
}
