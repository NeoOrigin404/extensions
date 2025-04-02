import ToggleButton from "./ToggleButton";
import { deleteExtension } from "../../services/request";
import { useRevalidator } from "react-router-dom";

export default function ExtensionCard({ extension }: ExtensionsProps) {
  const URL = import.meta.env.VITE_API_URL;
  const { revalidate } = useRevalidator();
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
      <button type="button" onClick={removeExtension}>
        Delete
      </button>
      <ToggleButton />
    </section>
  );
}
