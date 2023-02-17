import { useEffect, useState } from "react";
import getEntries from "../Contentful";

export default function Home() {
  const [about, setAbout] = useState([]);

  useEffect(() => {
    getEntries("about")
      .then((items) => setAbout(items[0].fields))
      .catch(console.error);
  }, []);

  return (
    <div>
      <img className="banner" src="/background.jpg" alt="organization banner" />
      <section>
        <h1 className="name">{about.name}</h1>
        <p className="text">{about.description}</p>
        <h2 className="title">About</h2>
        <p className="text">{about.aboutUs}</p>
      </section>
    </div>
  );
}
