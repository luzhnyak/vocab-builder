import css from "./Filter.module.css";

import Dropdown from "../Dropdown/Dropdown";

import { useFilters } from "../../store";

const filterLanguagesOptions = [
  "All",
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Korean",
  "Vietnamese",
  "Mandarin Chinese",
];

const filterLevelsOptions = [
  "All",
  "A1 Beginner",
  "A2 Elementary",
  "B1 Intermediate",
  "B2 Upper-Intermediate",
  "C1 Advanced",
  "C2 Proficient",
];

const filterPriceOptions = ["All", "10", "20", "30", "40", "50", "60"];

const Filter = () => {
  const {
    filterLanguage,
    setFilterLanguage,
    filterLevel,
    setFilterLevel,
    filterPrice,
    setFilterPrice,
  } = useFilters((state) => ({
    filterLanguage: state.filterLanguage,
    setFilterLanguage: state.setFilterLanguage,
    filterLevel: state.filterLevel,
    setFilterLevel: state.setFilterLevel,
    filterPrice: state.filterPrice,
    setFilterPrice: state.setFilterPrice,
  }));

  return (
    <div className={css.container}>
      <div className={css.languagesWrapper}>
        <span className={css.label}>Languages</span>
        <Dropdown
          items={filterLanguagesOptions}
          defaultSelect={filterLanguage || "All"}
          onSelect={setFilterLanguage}
        />
      </div>
      <div className={css.levelWrapper}>
        <span className={css.label}>Level of knowledge</span>
        <Dropdown
          items={filterLevelsOptions}
          defaultSelect={filterLevel || "All"}
          onSelect={setFilterLevel}
        />
      </div>
      <div className={css.priceWrapper}>
        <span className={css.label}>Price</span>
        <Dropdown
          items={filterPriceOptions}
          defaultSelect={filterPrice || "All"}
          onSelect={setFilterPrice}
        />
      </div>
    </div>
  );
};

export default Filter;
