import { useEffect, useState } from "react";
import getEntries from "../Contentful";

export default function Footer() {
  const [contact, setContact] = useState([]);

  useEffect(() => {
    getEntries("contact")
      .then((items) => setContact(items[0].fields))
      .catch(console.error);
  }, []);

  return (
    <div>
      <footer>
        <h2>Contact</h2>
        <p>{contact.email}</p>
        <p>{contact.phone}</p>
        <p>{contact.address}</p>
      </footer>
    </div>
  );
}
