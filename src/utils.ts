import { USER_AGENT } from "./constants.js";
import { AlertFeature, ForecastPeriod } from "./types.js";

/* Helper functions for querying and formatting data from the National Weather Server API */

export async function makeNWSRequest<T>(url: string): Promise<T | null> {
  const headers = {
    "User-Agent": USER_AGENT,
    Accept: "application/geo+json",
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("Error making NWS request:", error);
    return null;
  }
}

export const formatAlert = (feature: AlertFeature) => {
  const props = feature.properties;
  return [
    `Event: ${props.event || "Unknown"}`,
    `Area: ${props.areaDesc || "Unknown"}`,
    `Severity: ${props.severity || "Unknown"}`,
    `Status: ${props.status || "Unknown"}`,
    `Headline: ${props.headline || "No headline"}`,
    "---",
  ].join("\n");
};

export const formatForecast = (period: ForecastPeriod) =>
  [
    `${period.name || "Unknown"}:`,
    `Temperature: ${period.temperature || "Unknown"}°${
      period.temperatureUnit || "F"
    }`,
    `Wind: ${period.windSpeed || "Unknown"} ${period.windDirection || ""}`,
    `${period.shortForecast || "No forecast available"}`,
    "---",
  ].join("\n");
