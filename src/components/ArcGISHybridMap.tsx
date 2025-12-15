import { useEffect, useRef } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import esriConfig from '@arcgis/core/config';
import Basemap from '@arcgis/core/Basemap';
import TileLayer from '@arcgis/core/layers/TileLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Legend from '@arcgis/core/widgets/Legend';
import LayerList from '@arcgis/core/widgets/LayerList';
import "@arcgis/core/assets/esri/themes/light/main.css";

type ArcGISHybridMapProps = {
  center?: [number, number]; // [longitude, latitude]
  zoom?: number;
  className?: string;
  style?: React.CSSProperties;
  basemap?: string;
};

export function ArcGISHybridMap({
  center = [-122.3321, 47.6062],
  zoom = 7,
  className,
  style,
  basemap = 'hybrid'
}: ArcGISHybridMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<MapView | null>(null);

  useEffect(() => {
    const apiKey = (import.meta as any).env?.VITE_ARCGIS_API_KEY as string | undefined;
    const portalUrl = (import.meta as any).env?.VITE_ARCGIS_PORTAL_URL as string | undefined;
    if (apiKey) {
      esriConfig.apiKey = apiKey;
    }
    if (portalUrl) {
      esriConfig.portalUrl = portalUrl;
    }
    // Ensure workers and assets can load in Vite without copying local assets.
    // Use CDN assets path compatible with @arcgis/core 4.34.
    if (!esriConfig.assetsPath) {
      esriConfig.assetsPath = 'https://js.arcgis.com/4.34/@arcgis/core/assets';
    }

    let mapBasemap: Basemap | string = basemap;
    if (!apiKey && (basemap === 'hybrid' || basemap === 'satellite')) {
      // Build a hybrid-like basemap from public services (no API key)
      // Base imagery
      const imagery = new TileLayer({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
      });
      // Reference labels/places overlay
      const refLabels = new TileLayer({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer',
      });
      mapBasemap = new Basemap({
        baseLayers: [imagery],
        referenceLayers: [refLabels],
        title: 'Hybrid (Public)',
        id: 'hybrid-public',
      });
    }

    const map = new Map({ basemap: mapBasemap });

    const view = new MapView({
      container: containerRef.current as HTMLDivElement,
      map,
      center,
      zoom,
      constraints: {
        rotationEnabled: false,
      },
      popup: {
        dockEnabled: true,
        dockOptions: {
          position: 'bottom-right'
        }
      }
    });

    // --- Thematic client-side layers for Legend and toggling ---
    // Incident Data (points)
    const incidentLayer = new FeatureLayer({
      title: 'Incident Data',
      legendEnabled: true,
      visible: true,
      source: [],
      objectIdField: 'OBJECTID',
      fields: [
        { name: 'OBJECTID', type: 'oid' },
        { name: 'name', type: 'string' }
      ],
      geometryType: 'point',
      renderer: {
        type: 'simple',
        symbol: {
          type: 'simple-marker',
          style: 'circle',
          size: 8,
          color: [220, 53, 69, 1], // red
          outline: { color: [255, 255, 255, 1], width: 1 }
        }
      }
    });

    // Weather (polygons)
    const weatherLayer = new FeatureLayer({
      title: 'Weather',
      legendEnabled: true,
      visible: true,
      source: [],
      objectIdField: 'OBJECTID',
      fields: [
        { name: 'OBJECTID', type: 'oid' },
        { name: 'name', type: 'string' }
      ],
      geometryType: 'polygon',
      renderer: {
        type: 'simple',
        symbol: {
          type: 'simple-fill',
          color: [0, 123, 255, 0.2], // semi-transparent blue
          style: 'solid',
          outline: { color: [0, 123, 255, 0.8], width: 1 }
        }
      }
    });

    // Vessel Tracks (lines)
    const vesselTracksLayer = new FeatureLayer({
      title: 'Vessel Tracks',
      legendEnabled: true,
      visible: true,
      source: [],
      objectIdField: 'OBJECTID',
      fields: [
        { name: 'OBJECTID', type: 'oid' },
        { name: 'name', type: 'string' }
      ],
      geometryType: 'polyline',
      renderer: {
        type: 'simple',
        symbol: {
          type: 'simple-line',
          color: [40, 167, 69, 1], // green
          width: 2
        }
      }
    });

    map.addMany([incidentLayer, weatherLayer, vesselTracksLayer]);

    // --- Internal widgets: LayerList (with legend panels) and Legend ---
    const layerList = new LayerList({
      view,
      selectionEnabled: false,
      visibleElements: {
        statusIndicators: true,
        errors: true
      }
    });
    layerList.listItemCreatedFunction = (event) => {
      const item = event.item;
      item.panel = {
        content: 'legend',
        open: true
      };
    };
    const legend = new Legend({
      view,
      basemapLegendVisible: false
    });
    view.ui.add(layerList, 'top-right');
    view.ui.add(legend, 'bottom-right');

    viewRef.current = view;

    return () => {
      view?.destroy();
      viewRef.current = null;
    };
  }, []);

  return (
    <div ref={containerRef} className={className} style={style} />
  );
}


