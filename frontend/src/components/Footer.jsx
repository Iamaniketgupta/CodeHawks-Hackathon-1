

const Footer = () => {
  return (
    <footer className="h-fit text-white p-5 flex w-full items-center justify-center gap-5 bg-[#181a1d] flex-wrap">
      <div className="min-w-[200px]">
        <p>Developed with <span className="text-red-900">&hearts;</span> by Team : <span className="text-blue-500"> Code Hawks </span></p>
      </div>
      <div className="text-blue-600 min-w-[100px]">
        <a href="https://upskillmafia.com/" target="_blank">Hackathon | Upskill Mafia</a>
      </div>
    </footer>
  );
};

export default Footer;