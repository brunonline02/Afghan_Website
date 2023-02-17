import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import getEntries from "../Contentful";
import ReactPaginate from "react-paginate";

export default function Events() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEntries("event")
      .then((items) => {
        const numPages = Math.ceil(items.length / 5);
        setTotalPages(numPages);
        setEvents(items);
      })
      .catch(console.error);
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const startIndex = currentPage * 5;
  const endIndex = startIndex + 5;
  const visibleEvents = events.slice(startIndex, endIndex);

  useEffect(() => {
    visibleEvents.forEach((event) => {
      const myIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      const { lat, lon } = event.fields.location;
      const containerId = `mapid-${event.sys.id}`;
      const container = document.getElementById(containerId);
      if (!container._leaflet_id) {
        const mymap = L.map(containerId, {
          center: [lat, lon],
          zoom: 20,
          scrollWheelZoom: false,
        });
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(mymap);
        L.marker([lat, lon], { icon: myIcon })
          .addTo(mymap)
          .bindPopup(event.fields.address)
          .openPopup();
      }
    });
  }, [visibleEvents]);

  return (
    <div>
      <section>
        <h1 className="name">Events</h1>
        <ul>
          {visibleEvents.map((item) => (
            <li key={item.sys.id}>
              <h2 className="title">{item.fields.title}</h2>
              <p>
                {new Date(item.fields.date).toLocaleString("de-DE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </p>
              <div className="map" id={`mapid-${item.sys.id}`}></div>
            </li>
          ))}
        </ul>
        {totalPages > 1 && (
          <ReactPaginate
            className="pagination"
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        )}
      </section>
    </div>
  );
}
