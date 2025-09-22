import { useEffect, useState } from "react";
import { formIds, storageKeys } from "./consts/constants";
import { SelectOptionsType } from "./types/select";
import { FormState } from "./types/form";
import fieldService from "./service/formService";

import Form from "./modules/Form";
import { getLocalStorage } from "./utils/persistence";

const { fieldType, fieldLabel, defaultValue, choicesListbox, sortSelect } =
  formIds;
const sortTypes = {
  alphaAscending: "alphaAscending",
  alphaDescending: "alphaDescending",
};
const sortOptions: SelectOptionsType[] = [
  { id: sortTypes.alphaAscending, label: "Choices in Alphabetical Asc" },
  { id: sortTypes.alphaDescending, label: "Choices in Alphabetical Desc" },
];
const initialState: FormState = {
  [fieldLabel]: "",
  [fieldType]: false,
  [defaultValue]: "",
  [choicesListbox]: [],
  [sortSelect]: sortOptions[0],
};
const storageKeyValue = storageKeys.fieldTypeForm;
const App = (): JSX.Element => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    const dataFromStorage = JSON.parse(
      getLocalStorage(storageKeyValue) ?? "null",
    );

    if (dataFromStorage) {
      setFormData(dataFromStorage);
    } else {
      const apiRes = fieldService.getField("test-id");
      const stateData = {
        [fieldLabel]: apiRes?.label ?? initialState[fieldLabel],
        [fieldType]: apiRes?.required ?? initialState[fieldType],
        [defaultValue]: apiRes?.default ?? initialState[defaultValue],
        [choicesListbox]: apiRes?.choices ?? initialState[choicesListbox],
        [sortSelect]:
          (apiRes?.displayAlpha ? sortOptions[0] : sortOptions[1]) ??
          initialState[sortSelect],
      };

      setFormData(stateData);
    }
  }, []);

  return (
    <div>
      <Form
        data={formData}
        storageKey={storageKeyValue}
        sortOptions={sortOptions}
      />
    </div>
  );
};

export default App;
