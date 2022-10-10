const GameDefault = () => {
  return (
    <div className="w-full md:max-w-[31.25rem] h-[18.75rem] md:h-[28.125rem] border-rock_gradient_1 border mx-auto relative">
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[url('/assets/bg-triangle.svg')] w-2/4 h-2/4  bg-center bg-no-repeat bg-contain"></div>
      <div>
        <div className="w-[8.75rem] h-[8.75rem] md:w-[12.5rem] md:h-[12.5rem] rounded-full bg-paper_gradient_2 relative grid place-items-center border-b-[10px] border-b-paper_gradient_1 shadow-lg">
          <div className="bg-white w-[6.25rem] h-[6.25rem] md:w-[9.6875rem] md:h-[9.6875rem] rounded-full grid place-items-center">
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameDefault