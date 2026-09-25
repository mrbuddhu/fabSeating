import manifest from './imageManifest.json'

const folders = manifest as Record<string, string[]>

/** Files (names only) directly inside public/images/<dir>, from the build-time manifest. */
export function listImageFiles(dir: string): string[] {
  return folders[dir.replace(/^\/+|\/+$/g, '')] ?? []
}
