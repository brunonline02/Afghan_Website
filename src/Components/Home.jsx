import { useEffect, useState } from 'react';
import getEntries from '../Contentful';

export default function Home() {
  
  const [about, setAbout] = useState([]);

  useEffect(() => {
    
    getEntries('about')
      .then(items => setAbout(items[0].fields))
      .catch(console.error);

  }, []);

  return (
    <div>
      <section>  
        <h1 className='name'>{about.name}</h1>
        <p>{about.description}</p>
        <h2 className='title'>About</h2>
        <p>{about.aboutUs}</p>
      </section>
    </div>
  );
};