export function formatSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = bytes / 1024 ** unitIndex;

  return `${parseFloat(value.toFixed(2))} ${units[unitIndex]}`;
}

export const generateUUID=()=> crypto.randomUUID()
