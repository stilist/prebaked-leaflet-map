import {
  Feature,
  FeatureCollection,
  GeoJsonObject,
  GeometryObject,
} from "geojson";
import {
  geoJSON,
  GeoJSONOptions,
  Map,
  marker,
} from "leaflet";
import {
  ICustomProperties,
  IGroupedFeatures,
} from "./types";

const options: GeoJSONOptions = {
  filter: (feature) => feature.geometry.type === "Point",
  pointToLayer(feature: Feature<GeometryObject, ICustomProperties>, coordinates) {
    const mark = marker(coordinates);
    const properties = feature.properties || {};

    if (properties.place && properties.place.name) {
      mark.bindPopup(properties.place.name);
    }

    return mark;
  },
};

export default function renderPoints(geojson: FeatureCollection<GeometryObject, ICustomProperties>, map: Map) {
  const parsedPoints = geoJSON(geojson, options);

  map.addLayer(parsedPoints);
}
