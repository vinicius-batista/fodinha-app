export type Player = {
  name: String
  lives: number
}

export function createPlayer(name: String, lives: number = 3): Player {
  return {
    name,
    lives: lives,
  }
}
