import { useContext, useEffect } from "react"
import { GameContext } from "../contexts/GameContext"
import GameRipple from "./GameRipple"
import { randomOption, whoWinsTheGame } from "./GamePlayLogic"
import { motion } from "framer-motion"
const GameResults = () => {
  const {
    aiChoice,
    playerChoice,
    setPlayerChoice,
    setAiChoice,
    gameResult,
    setGameResult,
    playerScore,
    setPlayerScore,
    aiScore,
    setAiScore,
  } = useContext(GameContext)
  const aiOptions: string[] = ["paper", "scissors", "rock"]

  const gameInPlay = () => {
    const aiSelectedChoice = aiOptions[randomOption(aiOptions)]
    setAiChoice(aiSelectedChoice)
    const winner = whoWinsTheGame(playerChoice, aiSelectedChoice)
    //@ts-ignore
    winner === "YOU WIN"
      ? //@ts-ignore
        setPlayerScore((prevScore) => parseInt(prevScore) + 1)
      : winner === "YOU LOSE"
      ? //@ts-ignore
        setAiScore((prevScore) => parseInt(prevScore) + 1)
      : setPlayerScore(playerScore)

    if (winner === "It's A TIE") setAiScore(aiScore)
    setGameResult(winner)
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      let randomNumber = Math.ceil(Math.round(Math.random() * 2))
      let player = aiOptions[randomNumber]
      setAiChoice(player)
      gameInPlay()
    }, 1500)

    return () => {
      timeout
    }
  }, [])

  useEffect(() => {
    const setPlayerScoreUpdate = () => {
      localStorage.setItem("playerScore", JSON.stringify(playerScore))
    }
    const setAiScoreUpdate = () => {
      localStorage.setItem("aiScore", JSON.stringify(aiScore))
    }
    return () => {
      setPlayerScoreUpdate()
      setAiScoreUpdate()
    }
  }, [playerScore, aiScore])

  const handleReset = () => {
    setPlayerChoice("")
    setAiChoice("")
    setGameResult("")
  }
  return (
    <div className="w-full sm:max-w-[31.25rem] md:max-w-[48.25rem] h-[18.75rem] md:h-[28.125rem] mx-auto relative">
      <div className="flex items-center justify-between">
        <div className="flex flex-col md:flex-col-reverse items-center">
          <div
            className={`w-[8.75rem] h-[8.75rem] md:w-[12.5rem] md:h-[12.5rem] rounded-full bg-${playerChoice}_gradient_2  grid place-items-center border-b-[10px] border-b-${playerChoice}_gradient_1 shadow-lg hover:cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-${playerChoice}_gradient_1`}
            aria-label="YOU playerED"
          >
            {gameResult === "YOU WIN" && <GameRipple />}
            <div className="bg-white w-[6.25rem] h-[6.25rem] md:w-[9.6875rem] md:h-[9.6875rem] rounded-full grid place-items-center border-t-[10px] border-t-bg_gradient_1/30">
              <img
                src={`/assets/icon-${playerChoice}.svg`}
                alt={`${playerChoice} selected`}
                className="md:w-16 md:h-20"
              />
            </div>
          </div>
          <p className="text-white text-sm md:text-xl font-bold mt-8 md:mt-0 md:mb-10">
            YOU PLAYED
          </p>
        </div>

        {gameResult && (
          <div className="hidden md:flex flex-col items-center mt-14">
            <p className="uppercase text-white font-bold text-4xl mb-4">
              {gameResult}
            </p>
            <motion.button
              className="w-56 h-12 rounded-md bg-white text-dark_Text hover:text-rock_gradient_1 uppercase grid place-items-center"
              onClick={handleReset}
              initial={{ scale: 1 }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
              whileTap={{ scale: 0.9 }}
            >
              play again
            </motion.button>
          </div>
        )}

        <div className="flex flex-col md:flex-col-reverse items-center">
          {aiChoice === "" ? (
            <div
              className="bg-bg_gradient_1 w-[8.75rem] h-[8.75rem] md:w-[12.5rem] md:h-[12.5rem] rounded-full relative grid place-items-center shadow-lg hover:cursor-pointer outline-none animate-pulse "
              aria-label="select for scissors"
            ></div>
          ) : (
            <motion.div
              className={`w-[8.75rem] h-[8.75rem] md:w-[12.5rem] md:h-[12.5rem] rounded-full bg-${aiChoice}_gradient_2  grid place-items-center border-b-[10px] border-b-${aiChoice}_gradient_1 shadow-lg hover:cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-${aiChoice}_gradient_1 self-end ml-auto `}
              aria-label={`the house playered ${aiChoice}`}
            >
              {gameResult === "YOU LOSE" && <GameRipple />}
              <div className="bg-white w-[6.25rem] h-[6.25rem] md:w-[9.6875rem] md:h-[9.6875rem] rounded-full grid place-items-center border-t-[10px] border-t-bg_gradient_1/30">
                <img
                  src={`/assets/icon-${aiChoice}.svg`}
                  alt={`the house playered ${aiChoice}`}
                  className="md:w-16 md:h-20"
                />
              </div>
            </motion.div>
          )}

          <p className="text-white text-sm md:text-xl font-bold mt-8 md:mt-0 md:mb-10">
            THE HOUSE PLAYED
          </p>
        </div>
      </div>
      {gameResult && (
        <div className="flex flex-col items-center mt-14 md:hidden">
          <p className="uppercase text-white font-bold text-4xl mb-4">
            {gameResult}
          </p>
          <motion.button
            className="w-56 h-12 rounded-md bg-white text-dark_Text hover:text-rock_gradient_1 uppercase grid place-items-center"
            onClick={handleReset}
            initial={{ scale: 1 }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            whileTap={{ scale: 0.9 }}
          >
            play again
          </motion.button>
        </div>
      )}
    </div>
  )
}
export default GameResults
