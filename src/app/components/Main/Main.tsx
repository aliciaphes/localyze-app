import Image from "next/image";
import styles from "../../page.module.css";
import stylesMain from "./Main.module.css";
import List from "../List/List";


export const Main: React.FC = async () => (
  <div className={styles.page}>
    <main className={styles.main}>
      <Image
        src="/localyze.svg"
        alt="Localyze logo"
        width={180}
        height={38}
        priority
      />
      <div className={stylesMain.intro}>
        <p>This page displays a list of users, with their current location and its temperature, and the same for the location they're moving to.</p>
        <p>The difference in temperature between both places is also shown, which serves as the parameter to sort the table by.</p>
        <p>Click on the button to check it out!</p>
      </div>
      <List />
    </main>
    <footer className={styles.footer}>
      <span>© Alicia P. 2024</span>
    </footer>
  </div>
);


