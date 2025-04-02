import { useLoaderData } from "react-router-dom";
import ExtensionCard from "../../components/Extension/ExtensionCard";

export default function ExtensionsHome() {
  const { extensions } = useLoaderData() as {
    extensions: ExtensionType[];
  };

  return (
    <main>
      <h1>All extensions</h1>
      {extensions.map((extension) => (
        <ExtensionCard key={extension.id} extension={extension} />
      ))}
    </main>
  );
}
