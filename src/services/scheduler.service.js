import axios from "axios";

const backend = axios.create({
  baseURL: process.env.DRIPZOID_BACKEND_URL,
  headers: {
    "x-internal-key":
      process.env.INTERNAL_API_KEY,
  },
});

export async function getPendingTasks() {
  const { data } = await backend.get(
    "/api/automation/scheduler/scheduled-tasks/pending"
  );

  return data.tasks;
}

export async function updateTask(
  taskId,
  payload
) {
  const { data } = await backend.patch(
    `/api/internal/automation/scheduler/scheduled-tasks/${taskId}`,
    payload
  );

  return data.task;
}

export async function createLog(
  payload
) {
  const { data } = await backend.post(
    "/api/internal/automation/scheduler/automation-logs",
    payload
  );

  return data.log;
}
