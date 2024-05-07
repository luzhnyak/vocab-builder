import React, { FC, useEffect, useRef, useState } from "react";

import css from "./Dropdown.module.css";
import { FaAngleDown } from "react-icons/fa";

interface IListDropdownProps {
  items: string[];
  onSelect: (item: string) => void;
  onClose: (value: boolean) => void;
}

const ListDropdown = React.forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ items, onSelect, onClose }: IListDropdownProps, ref: any) => {
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === "Escape") {
          onClose(false);
        }
      };

      const handleClose = (event: MouseEvent) => {
        if (
          listRef.current &&
          !listRef.current.contains(event.target as Node) &&
          ref.current &&
          !ref.current.contains(event.target as Node)
        ) {
          onClose(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClose);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("mousedown", handleClose);
      };
    }, [onClose, ref]);

    return (
      <div className={css.listWrapper} ref={listRef}>
        <ul className={css.list}>
          {items.map((item) => {
            return (
              <li
                key={item}
                className={css.item}
                onClick={() => onSelect(item)}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);

interface IDropdownProps {
  items: string[];
  defaultSelect: string;
  onSelect: (item: string) => void;
}

const Dropdown: FC<IDropdownProps> = ({
  items = [],
  defaultSelect,
  onSelect,
}) => {
  const [isOpenList, setIsOpenList] = useState(false);
  const [selectText, setSelectText] = useState(defaultSelect);

  const listDropdownRef = useRef<HTMLButtonElement>(null);

  const handleSelect = (item: string) => {
    onSelect(item);
    setSelectText(item);
    setIsOpenList(false);
  };

  return (
    <div className={css.wrapper}>
      <button
        className={css.btn}
        onClick={() => {
          setIsOpenList(!isOpenList);
        }}
        ref={listDropdownRef}
      >
        {selectText}
        <FaAngleDown width="20" height="20" />
      </button>
      {isOpenList && (
        <ListDropdown
          items={items}
          onSelect={handleSelect}
          onClose={() => setIsOpenList(false)}
          ref={listDropdownRef}
        />
      )}
    </div>
  );
};

export default Dropdown;
