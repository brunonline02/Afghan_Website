import { useEffect, useState } from 'react';
import getEntries from '../Contentful';

export default function News() {
    
    const [news, setNews] = useState([]);

    useEffect(() => {
    
    getEntries('news')
      .then(items => setNews(items))
      .catch(console.error);

  }, []);

  return (
    <div>
      <section>
        <h2>News</h2>
        <ul>
        {news.map(item => (
          <li key={item.sys.id}>
            <h3>{item.fields.title}</h3>
            <p>{item.fields.body}</p>
          </li>
        ))}
      </ul>
      </section>
    </div>
  );
};