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
        <h1 className='name'>News</h1>
        <ul>
        {news.map(item => (
          <li key={item.sys.id}>
            <h2 className='title'>{item.fields.title}</h2>
            <p className='news-text'>{item.fields.body}</p>
          </li>
        ))}
      </ul>
      </section>
    </div>
  );
};