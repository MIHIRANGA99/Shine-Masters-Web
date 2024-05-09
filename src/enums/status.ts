enum STATUS {
  pending = "pending",
  active = "active",
  error = "error",
  completed = "completed",
  missed = "missed"
}

export type TStatus = keyof typeof STATUS;

export default STATUS;
