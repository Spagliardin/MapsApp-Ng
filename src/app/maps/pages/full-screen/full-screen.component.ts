import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [

    `
    #maps{
      height: 100%;
      width: 100%
    }
    `

  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var map = new mapboxgl.Map({
      container: 'maps',
      style: 'mapbox://styles/mapbox/streets-v11',

      center: [ -58.45782391279005 , -34.55502488903992 ],
      zoom: 16

    });

  }

}
