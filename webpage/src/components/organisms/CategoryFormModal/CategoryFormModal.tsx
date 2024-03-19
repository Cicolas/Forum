import { useContext, useEffect, useState } from "react";
import { ICategory } from "../../../utils/interfaces/category";
import { Label } from "../../atoms/Label/Label";
import { Modal } from "../../atoms/Modal/Modal";
import { Title } from "../../atoms/Title/Title";
import { RemovableCategoryChip } from "../../molecules/Chips/RemovableCategoryChip";
import { Button } from "../../atoms/Button/Button";
import { CategoryContext } from "../../../context/CategoryContext";

// type CategoryFormModalProps = {

type CategoryFormModalProps = {
  open: boolean;
  requestClose: () => void;
  onSubmit: (categories: ICategory[]) => void;
}

export function CategoryFormModal({ open, requestClose, onSubmit }: CategoryFormModalProps) {
  const { categories, getCategories } = useContext(CategoryContext);

  const [categoriesValue, setCategoriesValue] = useState<[ICategory, boolean][]>([]);

  useEffect(() => {
    if (!categories)
      getCategories();
  }, [categories, getCategories])

  useEffect(() => {
    if (categories)
      setCategoriesValue(categories.map((category) => [category, false]));
  }, [categories]);

  const handleCategoryClick = (categoryName: string) => {
    setCategoriesValue((prev) =>
      prev.map(([category, selected]) => {
        if (category.name === categoryName)
          return [category, !selected];
        return [category, selected];
      })
    );
  }

  const handleOnSubmit = () => {
    const selectedCategories = categoriesValue
      .filter(value => value[1])
      .map(value => value[0]);

    onSubmit(selectedCategories);
    requestClose();
  }

  return <Modal darken open={open} requestClose={requestClose}>
    <Title>Adicionar Categorias</Title>

    <Label className="font-serif">Categorias:</Label>
    <div className="flex flex-wrap gap-2">
      {categoriesValue?.map((value) => {
        const [category, selected] = value;

        return <RemovableCategoryChip
          name={category.name}
          key={category.name}
          color={category.color}
          onClick={handleCategoryClick}
          removed={!selected}
        >
        </RemovableCategoryChip>
      })}
    </div>

    <Button
      text="Atualizar"
      action="action"
      className="p-4 w-full"
      onClick={handleOnSubmit}
    >
    </Button>
  </Modal>
}