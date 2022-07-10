import "../../App.css"

function LockModal(props) {
  return (
    <div className="absolute w-full h-full grid place-center">
      <div
        className="z-10 flex place-self-center flex-col rounded-xl bg-white p-5 pb-10 drop-shadow-md dark:bg-zinc-800 dark:text-white"
        style={
            { width: "min(480px, 60vw)", height: "min(200px, 60vh)" }
            }>
          <h2 className="font-black text-2xl">{props.title}</h2>
        <div className="modal overscroll-contain overflow-y-scroll sm:px-7">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default LockModal
