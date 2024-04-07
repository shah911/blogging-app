import React from "react";
import { UseFormRegister } from "react-hook-form";

type FormFields = {
  email: string;
  acceptTerms: boolean;
};

type CheckBoxProps = {
  register: UseFormRegister<FormFields>;
};

function CheckBox() {
  //{ register }: CheckBoxProps
  return (
    <label className="container">
      <input
        type="checkbox"
        //{...register("acceptTerms", { required: true })}
      />
      <svg viewBox="0 0 64 64" className="h-4 w-4 2xl:h-[1vw] 2xl:w-[1vw]">
        <path
          d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
          pathLength="575.0541381835938"
          className="path"
        ></path>
      </svg>
    </label>
  );
}

export default CheckBox;
