export type Player = {
  name: string
  lives: number
}

export function createPlayer(name: string, lives: number = 3): Player {
  return {
    name,
    lives: lives,
  }
}
