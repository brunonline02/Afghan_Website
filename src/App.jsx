import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import getEntries from './Contentful';
import './App.css';

const App = () => {
  const [about, setAbout] = useState([]);
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [contact, setContact] = useState([]);

  useEffect(() => {
    
    getEntries('about')
      .then(items => setAbout(items[0].fields))
      .catch(console.error);
    
    getEntries('news')
      .then(items => setNews(items))
      .catch(console.error);
    
    getEntries('event')
      .then(items => setEvents(items))
      .catch(console.error);

    getEntries('contact')
      .then(items => setContact(items[0].fields))
      .catch(console.error);
  }, []);

  useEffect(() => {
    events.forEach(event => {
      const myIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      const { lat, lon } = event.fields.location;
      const containerId = `mapid-${event.sys.id}`;
      const container = document.getElementById(containerId);
      if (!container._leaflet_id) {
        const mymap = L.map(containerId, {
          center: [lat, lon],
          zoom: 20,
          scrollWheelZoom: false
        });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(mymap);
        L.marker([lat, lon], {icon: myIcon})
        .addTo(mymap)
        .bindPopup(event.fields.address)
        .openPopup()
      }
    });
  }, [events]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{about.name}</h1>
        <p>{about.description}</p>
      </header>
      <section>
        <h2>About</h2>
        <p>{about.aboutUs}</p>
      </section>
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
      <section>
  <h2>Events</h2>
  <ul>
    {events.map(item => (
      <li key={item.sys.id}>
        <h3>{item.fields.title}</h3>
        <p>{new Date(item.fields.date).toLocaleString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })}</p>
        <div id={`mapid-${item.sys.id}`} style={{height: "400px", width: "400px"}}></div>
      </li>
    ))}
  </ul>
</section>
      <section>
        <h2>Contact</h2>
        <p>{contact.email}</p>
        <p>{contact.phone}</p>
        <p>{contact.address}</p>
      </section>
    </div>
  );
};

export default App;