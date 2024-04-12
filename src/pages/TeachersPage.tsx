import { FC, useEffect, useState } from "react";

import Card from "../components/Card/Card";
import ScrollUp from "../components/ScrollUp/ScrollUp";
import { useFilters, useTeachers } from "../store";
import LoadMore from "../components/LoadMore/LoadMore";
import Filter from "../components/Filter/Filter";

const TeachersPage: FC = () => {
  const { items, loadTeachers, isLoadMore } = useTeachers((state) => ({
    loading: state.loading,
    isLoadMore: state.isLoadMore,
    error: state.error,
    items: state.items,
    loadTeachers: state.loadTeachers,
  }));

  const { filterLanguage, filterLevel, filterPrice } = useFilters((state) => ({
    filterLanguage: state.filterLanguage,

    filterLevel: state.filterLevel,

    filterPrice: state.filterPrice,
  }));

  useEffect(() => {
    loadTeachers();
  }, [loadTeachers]);

  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    let tempItems = [...items];

    if (filterLanguage && filterLanguage !== "All") {
      tempItems = tempItems.filter((item) =>
        item.languages.includes(filterLanguage)
      );
    }

    if (filterLevel && filterLevel !== "All") {
      tempItems = tempItems.filter((item) => item.levels.includes(filterLevel));
    }

    if (filterPrice && filterPrice !== "All") {
      tempItems = tempItems.filter(
        (item) => +item.price_per_hour <= +filterPrice
      );
    }

    setFilteredItems([...tempItems]);
  }, [items, filterLanguage, filterLevel, filterPrice]);

  return (
    <main className="container">
      <Filter />
      {filteredItems.map((item) => (
        <Card key={item.id} data={item} />
      ))}
      {isLoadMore && <LoadMore />}
      <ScrollUp />
    </main>
  );
};

export default TeachersPage;
