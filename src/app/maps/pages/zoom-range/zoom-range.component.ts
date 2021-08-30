import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [

    `
      .mapa-container{
        height: 100%;
        width: 100%
      }

      .row{
        width: 400px;
        background-color: white;
        border-radius: 5px;
        position: fixed;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        z-index: 999;
      }

    
    `

  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapsZoom') divMap!: ElementRef;
  maps!: mapboxgl.Map;
  zoomLevel: number = 10
  center: [number, number] = [ -58.45782391279005 , -34.55502488903992 ]

  constructor() { }

  ngOnDestroy(): void {
    this.maps.off('zoom', () => {})
    this.maps.off('zoomend', () => {})
    this.maps.off('move', () => {})
  }

  ngAfterViewInit(): void {

    this.maps = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel

    })


    this.maps.on( 'zoom', ( _ ) => {
      this.zoomLevel = this.maps.getZoom();
    } )

    this.maps.on( 'zoomend', ( _ ) => {
      if ( this.maps.getZoom() > 18) {
        this.maps.zoomTo( 18 )
      }
    } )


    this.maps.on( 'move', ( event ) => {
      const target = event.target
      const { lng, lat } = target.getCenter()
      this.center = [lng, lat]
    } )

  }

  zoomOut(){
    this.maps.zoomOut()
    
  }

  zoomIn(){
    this.maps.zoomIn()
  }

  zoomChange( value: string ) {
    this.maps.zoomTo( Number(value) )
  }


}
