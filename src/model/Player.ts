export type Player = {
  name: String
  isDealer: boolean
  lives: number
}

export function createPlayer(name: String, lives?: number): Player {
  return {
    name,
    lives: lives || 3,
    isDealer: false,
  }
}
