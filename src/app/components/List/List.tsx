'use client'
import { memo, useEffect, useState } from 'react';
import styles from "./List.module.css";
import { User } from './types';
import { ApiUser } from './types';
import PlaceholderList from './PlaceholderList';
import { fetchTemperatures } from '@/app/data-fetching/fetchTemperatures';



const tableHeaders = ['NAME', 'MOVING FROM', 'TEMP IN ORIGIN', 'MOVING TO', 'TEMP IN DESTINATION', 'DIFFERENCE (ºC)']



const UsersTable = ({ userInfo }: { userInfo: User[] }) => {
  return (
    <table className={styles.mainTable}>
      <caption className={styles.mainTableCaption}>Users 2024</caption>
      <thead className={styles.mainTableTableHeader}>
        <tr className={styles.mainTableTableRow}>
          {tableHeaders.map(
            (header, index) => (<th key={index} scope="col" className={styles.mainTableTableHeader}>{header}</th>)
          )}
        </tr>
      </thead>
      <tbody>
        {userInfo.map(
          (user: User, index: number) => (
            <tr key={index} className={`${styles.mainTableTableRow} ${styles.zebraRow}`}>
              <td scope="row" data-label="Name" className={`${styles.mainTableTableCell} ${styles.mainTableTableCellContent}`}>{user.name}</td>
              <td data-label="Moving from" className={`${styles.mainTableTableCell} ${styles.mainTableTableCellContent}`}>{`${user.location.city}, ${user.location.country}`}</td>
              <td data-label="Temp in origin" className={`${styles.mainTableTableCell} ${styles.mainTableTableCellContent}`}>{user.location.temp}</td>
              <td data-label="Moving to" className={`${styles.mainTableTableCell} ${styles.mainTableTableCellContent}`}>{`${user.movingTo.city}, ${user.movingTo.country}`}</td>
              <td data-label="Temp in destination" className={`${styles.mainTableTableCell} ${styles.mainTableTableCellContent}`}>{user.movingTo.temp}</td>
              <td data-label="Difference (ºC)" className={`${styles.mainTableTableCell} ${styles.mainTableTableCellContent}`}>{user.tempDifference.toFixed(1)}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}



const List = () => {

  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState(null);
  const [sortAscendingOn, setSortAscending] = useState(false);

  const toggleSort = () => {
    setSortAscending(prevState => !prevState);
  };



  const ButtonSection = memo(() => (
    <div className={styles.buttonContainer}>
      <div
        className={styles.sortButton}
        onClick={() => {
          toggleSort();
          (users || []).sort((a, b) => sortAscendingOn ? a.tempDifference - b.tempDifference : b.tempDifference - a.tempDifference);
        }}
      >
        {`Sort ${sortAscendingOn ? 'ASCENDING ▲' : 'DESCENDING ▼'}`}
      </div>
    </div>
  ));


  const UserInformation = memo(({ users }: { users: User[] }) => {

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (users.length === 0) return (<span>The list is empty, nothing to show</span>);

    return (
      <>
        <ButtonSection />
        <UsersTable userInfo={users} />
      </>
    )
  });



  useEffect(() => {
    fetch('https://raw.githubusercontent.com/aliciaphes/users-json/refs/heads/main/users.json')
      .then((response) => response.json())
      .then(async (data: ApiUser[]) => {
        const usersData: User[] = await fetchTemperatures(data);
        setUsers(usersData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
      });
  }, []);


  return (
    <>
      {!users ? (
        <PlaceholderList />
      ) : (
        <UserInformation users={users} />
      )}
    </>
  );
}

export default List;
