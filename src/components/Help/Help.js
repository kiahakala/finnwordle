function Box(props) {
  let state = "text-black border-2 border-gray-300 dark:text-white";
  if (props.state === "C") state = "bg-emerald-500 text-white";
  if (props.state === "E") state = "bg-amber-500 text-white";
  if (props.state === "N") state = "bg-zinc-500 text-white dark:bg-gray-700";

  return (
    <div
      className={
        "w-8 h-8 sm:w-10 sm:h-10 grid place-items-center p-0 m-0 font-bold text-lg sm:text-2xl " + state
      }
    >
      {props.value}
    </div>
  );
}

function Help() {
  return (
    <>
      <p className="text-left text-sm sm:text-base py-5 font-regular opacity-75 mr-1">
        Arvaa FINNWORDLE kuudella yrityksellä.
        <br />
        Jokaisen arvauksen on oltava sanakirjasta* löytyvä viisikirjaiminen sana. Paina "enter" lähettääksesi arvaus.
        <br /> Arvauksen jälkeen arvatun sanan kirjainruutujen väri muuttuu sen perusteella, 
        kuinka lähelle oikeaa sanaa arvauksesi osui.
      </p>
      <hr />
      <h3 className="text-left font-bold py-5">Esimerkit</h3>
      <div className="flex gap-1">
        <Box value="K" state="C" />
        <Box value="I" />
        <Box value="S" />
        <Box value="S" />
        <Box value="A" />
      </div>
      <p className="text-left text-sm sm:text-base py-2 opacity-75">
        Kirjain <b>K</b> on sanassa ja oikealla paikalla.
      </p>
      <br></br>
      <div className="flex gap-1">
        <Box value="R" />
        <Box value="A" state="E" />
        <Box value="T" />
        <Box value="T" />
        <Box value="I" />
      </div>
      <p className="text-left text-sm sm:text-base py-2 opacity-75">
        Kirjain <b>A</b> on sanassa, mutta eri kohdassa.
      </p>
      <br></br>
      <div className="flex gap-1">
        <Box value="H" />
        <Box value="U" />
        <Box value="U" />
        <Box value="T" />
        <Box value="O" state="N" />
      </div>
      <p className="text-left text-sm sm:text-base py-2 opacity-75">
        Kirjain <b>O</b> ei ole sanassa.
      </p>
      <br></br>
      <hr />
      <p className="text-left text-sm sm:text-base py-2 opacity-75">
        *Sanat on poimittu Kotimaisten kielten keskuksen nykysuomen sanalistasta.
      </p>
    </>
  );
}

export default Help;
