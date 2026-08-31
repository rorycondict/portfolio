import "./App.css";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function App() {
  return (
    <>
      <section id="intro">
        <div>
          <h1>rory condict.</h1>
          <br />
          <h2>welcome to my portfolio</h2>
          <p>it's a bit bare-bones at the minute, i'm working on it!</p>
        </div>
      </section>

      <section id="next-steps">
        <div id="social">
          <ul>
            <li>
              <a
                href="https://www.linkedin.com/in/rorycondict/"
                target="_blank"
              >
                <FaLinkedin />
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/forthfora" target="_blank">
                <FaGithub />
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
