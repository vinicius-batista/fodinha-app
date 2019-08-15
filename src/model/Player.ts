export type Player = {
  name: String
  lives: number
}

export function createPlayer(name: String, lives?: number): Player {
  return {
    name,
    lives: lives || 3,
  }
}
