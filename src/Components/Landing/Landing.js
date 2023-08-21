import { useNavigate } from "react-router-dom";

import classes from "./Landing.module.css";
import Button from "../Common/Button";
import { arrowUpRightSVG } from "../../helpers/svgIcons";
import AuthLink from "../Auth/AuthLink";

const Landing = () => {
  const navigate = useNavigate();

  const getStartedHandler = () => {
    navigate("/register");
  };

  return (
    <>
      <section className={classes.heroContainer}>
        <div>
          <div>
            <h1>
              Reach new productivity<span>peaks</span>
            </h1>

            <h2 className={classes.secondary}>
              Create, track and manage your projects with ease.
            </h2>

            <div className={classes.btnGroup}>
              <Button color={"orange"} onClick={getStartedHandler}>
                Get started
                {arrowUpRightSVG}
              </Button>
              <AuthLink to={"login"} />
            </div>
          </div>

          <div>
            <img src="../../imgs/landing-2.webp" alt="people brainstorming" />
          </div>
        </div>
      </section>
      <section className={classes.featuresContainer}>
        <div>
          <h2>features</h2>
          <ul>
            <li className={`${classes.card} ${classes.blue}`}>
              <header>
                <h3>Kanban-style Project Management</h3>
              </header>
              <p>
                Effortlessly manage your projects using our intuitive
                Kanban-style interface. Assign different statuses (new, in
                progress, completed) to each project, allowing you to visualize
                and track their progress easily. Stay organized and on top of
                your tasks
              </p>
            </li>
            <li className={`${classes.card} ${classes.orange}`}>
              <header>
                <h3>Task Tracking and Progress Monitoring</h3>
              </header>
              <p>
                Break down your projects into smaller, manageable tasks. Track
                the progress of each task within a project, ensuring clear
                visibility and accountability. Stay informed about the status of
                each task and make informed decisions based on real-time
                updates.
              </p>
            </li>
            <li className={`${classes.card} ${classes.green}`}>
              <header>
                <h3>User Profile Customization</h3>
              </header>
              <p>
                Create your personalized profile and make it your own. Upload a
                profile picture to give your account a unique identity. Showcase
                your professional image and enhance collaboration within the
                platform.
              </p>
            </li>
            <li className={`${classes.card} ${classes.grey}`}>
              <header>
                <h3>Sleek and Intuitive User Interface</h3>
              </header>
              <p>
                Enjoy a seamless project management experience with our
                intuitive user interface. Navigate effortlessly, organize
                projects efficiently, and stay in control. Our streamlined
                design ensures a user-friendly and hassle-free experience.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <footer>Made by martynosa for demo purposes.</footer>
    </>
  );
};

export default Landing;
