import css from "./DictonaryTable.module.css";
const DictonaryTable = () => {
  return (
    <div>
      <table className={css.table} cellSpacing={0}>
        <tr className={css.headRow}>
          <th>Word</th>
          <th>Translation</th>
          <th>Category</th>
          <th>Progress</th>
          <th></th>
        </tr>
        <tr className={css.bodyRow}>
          <td>A little bit</td>
          <td>Трохи, трішки</td>
          <td>Phrasal verb</td>
          <td>50%</td>
          <td>...</td>
        </tr>
      </table>
    </div>
  );
};

export default DictonaryTable;
