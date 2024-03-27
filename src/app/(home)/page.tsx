import Clock from "./components/clock-component/clock";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Pomowise</h1>
        <hr></hr>
      </div>
      <Clock />
    </main>
  );
}

