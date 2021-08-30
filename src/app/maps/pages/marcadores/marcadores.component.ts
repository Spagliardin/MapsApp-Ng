import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerColors {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [

    `
      .mapa-container{
        height: 100%;
        width: 100%
      }

      .list-group{
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 99;
      }

      li{
        cursor: pointer
      }

    
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapsZoom') divMap!: ElementRef;
  maps!: mapboxgl.Map;
  zoomLevel: number = 15
  center: [number, number] = [ -58.45782391279005 , -34.55502488903992 ]

  markers: MarkerColors[] = []
  
  constructor() { }

  ngAfterViewInit(): void {

    this.maps = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    })

    this.getLocalStorage()

    // const markerHtml: HTMLElement = document.createElement( 'div' )
    // markerHtml.innerHTML = 'Hola Mundo'

  //   const maker = new mapboxgl.Marker({
  //     // element: markerHtml
  //   })
  //         .setLngLat( this.center )
  //         .addTo( this.maps )

  // }

  }

  goMarker( marker: mapboxgl.Marker ){
    this.maps.flyTo( {
      center: marker.getLngLat()
    } )
  }

  addMarket(){
    
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color
    })
    .setLngLat( this.center )
    .addTo( this.maps )

    this.markers.push ({
      color,
      marker: newMarker
    })

    this.saveMarkerLocalStorage()

    newMarker.on('dragend', () => {
      this.saveMarkerLocalStorage()
    })
  }

  saveMarkerLocalStorage(){

    const lngLatArr: MarkerColors[] = []
    this.markers.forEach( m => {
      const { lng , lat } = m.marker!.getLngLat()  
      lngLatArr.push({
        color: m.color,
        centro: [ lng, lat ],
      })
    })
    localStorage.setItem( 'marcadores', JSON.stringify(lngLatArr) )
  }

  getLocalStorage(){
    if (!localStorage.getItem('marcadores')) {
      return;
    }
    const lngLatArr: MarkerColors[] = JSON.parse(localStorage.getItem('marcadores')!)

    lngLatArr.forEach ( m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true,
      })
      .setLngLat( m.centro! )
      .addTo(this.maps)

      this.markers.push({
        marker: newMarker,
        color: m.color
      })

      newMarker.on('dragend', () => {
        this.saveMarkerLocalStorage()
      })
    })
  }

  deleteMarker( i: number ){
    this.markers[i].marker?.remove()
    this.markers.splice(i, 1)
    this.saveMarkerLocalStorage()
  }

}
