// Placeholder API service layer.
// Swap these mock functions for real fetch()/axios calls when a backend is available.

export async function fetchPatients() {
  const { PATIENTS } = await import("../data/mockData");
  return PATIENTS;
}

export async function submitScreening(payload) {
  // In production this would POST the captured image + patient metadata
  // to a backend that runs the quality/enhancement/classification pipeline.
  console.warn("submitScreening is a mock — no backend connected.", payload);
  return { success: true, mock: true };
}
