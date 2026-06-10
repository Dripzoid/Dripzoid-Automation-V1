import axios from "axios";

const backend = axios.create({
  baseURL: process.env.DRIPZOID_BACKEND_URL,
  headers: {
    "x-internal-key":
      process.env.INTERNAL_API_KEY,
  },
});

export async function getPendingTasks() {
  try {
  const { data } = await backend.get(
    "/api/internal/automation/scheduler/scheduled-tasks/pending"
  );

  return data.tasks;
} catch (error) {
  console.log("URL:", error.config?.url);
  console.log("BASE_URL:", error.config?.baseURL);
  console.log(
    "RESPONSE:",
    error.response?.data
  );

  throw error;
}

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
