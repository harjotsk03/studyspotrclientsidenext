import Nav from "../general/Nav.js";

export default function Layout({ children }) {
  return (
    <div>
      <main className="flex-1 min-h-screen bg-lightBG dark:bg-darkBG">
        <div>{children}</div>
      </main>
    </div>
  );
}
