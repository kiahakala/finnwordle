import "../../App.css"
import CountdownTimer from "../CountDownTimer"

function LockModal(props) {
    const DAY_IN_MS = 24 * 60 * 60 * 1000;
    const NOW_IN_MS = new Date().getTime();

    const timeAfterOneDay = NOW_IN_MS + DAY_IN_MS;

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
                <CountdownTimer targetDate={timeAfterOneDay} />
            </div>
            </div>
        </div>
    )
}

export default LockModal
