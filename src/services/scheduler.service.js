import axios from "axios";

const backend = axios.create({
  baseURL:
    process.env.DRIPZOID_BACKEND_URL,

  headers: {
    "x-internal-key":
      process.env.INTERNAL_API_KEY,
  },
});

export async function getPendingAutomationEvents() {
  const { data } = await backend.get(
    "/api/automation/scheduler/automation-events/pending"
  );

  return data.events;
}

export async function updateAutomationEvent(
  eventId,
  payload
) {
  const { data } = await backend.patch(
    `/api/automation/scheduler/automation-events/${eventId}`,
    payload
  );

  return data.event;
}
