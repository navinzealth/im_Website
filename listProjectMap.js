'use client'
import mapboxgl from '!mapbox-gl';
import {useRef, useEffect, useState} from 'react'
//import Script from 'next/script'
//import {Marker} from '/images/map-marker.png'

export default function Projectmap(props){
    console.log(props.treeLoc)
    const stores =  props.treeLoc;
   console.log(stores[0]?.longitude, stores[0]?.latitude)
        
   // const stores = geoJson;
    /* Assign a unique ID to each store */
/* Assign a unique ID to each store */
stores.forEach(function (store, i) { store.id = i; });


    mapboxgl.accessToken = 'pk.eyJ1IjoibmF2aW56ZWFsdGgiLCJhIjoiY2x0emVpNXZvMDlmNjJqcHphZzNyOGpuMSJ9.1OXAP5Ucz7zLOMgWNR3Icw';

    const mapContainer = useRef(null);
    const Map = useRef(null);
    const [lng, setLng] = useState( 78.9629 );
    const [lat, setLat] = useState( 20.5937);
    const [zoom, setZoom] = useState(3)
       // setLng(stores[0]?.longitude)
       // setLat(stores[0]?.latitude)

    useEffect(() => {
        //setLng(stores[0]?.longitude)
        //setLat(stores[0]?.latitude)
         console.log(stores[0]?.longitude, stores[0]?.latitude)
        if (Map.current) return; // initialize map only once
        Map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/satellite-streets-v12',
         // center: [lng, lat],
         center: [lng, lat],
          zoom: zoom,
		      pitch: 40,
          scrollZoom: true
        });

         // Add navigation control (the +/- zoom buttons)
    Map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      },[lng, lat, stores]);

      Map.current?.on('load', () => {
            
          /**
           * Add all the things to the page:
           * - The location listings on the side of the page
           * - The markers onto the map
           */
          //buildLocationList(stores);
          addMarkers();
          console.log('marker function started')
       });
      
 /**
       * Add a marker to the map for every store listing.
       **/
 function addMarkers() {
    console.log('marker function started2')
    /* For each feature in the GeoJSON object above: */
    for (const marker of stores) {
      /* Create a div element for the marker. */
      const el = document.createElement('div');
      /* Assign a unique `id` to the marker. */
      el.id = `marker-${marker._id}`;
      /* Assign the `marker` class to each marker for styling. */
      el.className = 'marker';
  
      /**
       * Create a marker using the div element
       * defined above and add it to the map.
       **/
      new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat([parseFloat(marker.longitude).toFixed(5), parseFloat(marker.latitude).toFixed(5)])
        .addTo(Map.current);
      /**
       * Listen to the element and when it is clicked, do three things:
       * 1. Fly to the point
       * 2. Close all other popups and display popup for clicked store
       * 3. Highlight listing in sidebar (and remove highlight for all other listings)
       **/
      el.addEventListener('click', (e) => {
        /* Fly to the point */
        flyToStore(marker);
        /* Close all other popups and display popup for clicked store */
        createPopUp(marker);
        /* Highlight listing in sidebar */
        const activeItem = document.getElementsByClassName('active');
        e.stopPropagation();
        if (activeItem[0]) {
          activeItem[0].classList.remove('active');
        }
      });
    }
  }

   /**
       * Use Mapbox GL JS's `flyTo` to move the camera smoothly
       * a given center point.
       **/
   function flyToStore(currentFeature) {
    Map.current.flyTo({
      center: [currentFeature.longitude, currentFeature.latitude],
      zoom: 20
    });
  }

  /** * Create a Mapbox GL JS `Popup`. **/
  function createPopUp(currentFeature) {
    const popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();
    const popup = new mapboxgl.Popup({ closeOnClick: true })
      .setLngLat([currentFeature.longitude, currentFeature.latitude])
      .setHTML(
        `<img src=${currentFeature.image} style="width:100%;"/><h3>${currentFeature.area}</h3><h4>${currentFeature.state}</h4><h4>Total Trees:- <b>${stores.length}</b></h4>`
      )
      .addTo(Map.current);
  }

  Map.current?.on('move', () => {
        setLng(Map.current.getCenter().lng.toFixed(8));
        setLat(Map.current.getCenter().lat.toFixed(8));
        setZoom(Map.current.getZoom().toFixed(2));
      });
  



    return(
        <>
        
        <div>
        
          <div ref={mapContainer} className="map-container" style={{position:'relative'}}/>
        </div>
        </>
    )
}