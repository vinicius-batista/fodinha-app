import { Player } from './Player'

export type Game = {
  totalLives: number
  players: Player[]
}

export function createGame(players: Player[], totalLives: number = 3): Game {
  return {
    totalLives,
    players,
  }
}
