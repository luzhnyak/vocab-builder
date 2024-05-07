import Dashboard from "../components/Dashboard/Dashboard";
import DictonaryTable from "../components/DictonaryTable/DictonaryTable";

const DictonaryPage = () => {
  return (
    <main className="container">
      <Dashboard isAddWord={true} />
      <DictonaryTable />
    </main>
  );
};

export default DictonaryPage;
