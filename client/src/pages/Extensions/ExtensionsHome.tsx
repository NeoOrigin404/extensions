import { useLoaderData } from "react-router-dom";
import ExtensionCard from "../../components/Extension/ExtensionCard";
import "../../styles/ExtensionHome/extensionHome.scss";

export default function ExtensionsHome() {
  const { extensions } = useLoaderData() as {
    extensions: ExtensionType[];
  };

  return (
    <section className="section-extension">
      <h1>Extensions list</h1>
      <div className="wrap">
        {extensions.map((extension) => (
          <ExtensionCard key={extension.id} extension={extension} />
        ))}
      </div>
    </section>
  );
}
