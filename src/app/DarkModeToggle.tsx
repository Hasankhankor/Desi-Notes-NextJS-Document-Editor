function DarkModeToggle() {
    const toggleDarkMode = () => {
      document.body.classList.toggle("dark");
    };

    return (
      <div
        className="dark-mode-toggle"
        onClick={toggleDarkMode}
        title="Toggle Dark Mode"
      >
        🌙
      </div>
    );
  }

  export default DarkModeToggle;
