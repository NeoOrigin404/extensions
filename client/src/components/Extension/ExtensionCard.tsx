import ToggleButton from "./ToggleButton";

export default function ExtensionCard({ extension }: ExtensionsProps) {
  const URL = import.meta.env.VITE_API_URL;

  return (
    <section>
      <img src={`${URL}${extension.logo}`} alt={extension.name} />
      <h2>{extension.name}</h2>
      <p>{extension.description}</p>
      <button type="button">Remove</button>
      <ToggleButton />
    </section>
  );
}
