'use client'
import styles from "./List.module.css";

const placeholderText = "––––––––––––"

const PlaceholderText = () => (
  <span className={styles.placeholderText}>{placeholderText}</span>
)


const PlaceholderList = () => {
  return (
    <table className={styles.mainTable}>
      <caption className={styles.mainTableCaption}><PlaceholderText /></caption>
      <thead className={styles.mainTableTableHeader}>
        <tr className={styles.mainTableTableRow}>
          {Array.from({ length: 6 }).map(
            (_el, index) => (<th key={index} scope="col" className={styles.mainTableTableHeader}><PlaceholderText /></th>)
          )}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 3 }).map(
          (_el, index) => (
            <tr key={index} className={styles.mainTableTableRow}>
              {Array.from({ length: 6 }).map(
                (_el, indx) => (
                  <td key={indx} className={styles.mainTableTableCell}>
                    <div className={styles.pseudoHeader}>
                      <PlaceholderText />
                    </div>
                    <PlaceholderText />
                  </td>
                )
              )}
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}

export default PlaceholderList;
