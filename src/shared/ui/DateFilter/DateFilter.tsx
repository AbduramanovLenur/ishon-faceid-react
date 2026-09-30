import type { FC } from "react";

import { DatePicker, type DatePickerProps } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";

import { useQueryParams } from "@shared/lib";

interface IDateFilterProps {
  queryKey: string;
  className?: string;
  currentValue?: string;
  defaultValue?: string;
}

const DateFilter: FC<IDateFilterProps> = ({
  queryKey,
  className = "",
  defaultValue = "",
  currentValue = "",
}) => {
  const { t } = useTranslation();
  const { set, remove } = useQueryParams();

  const onChangeHandle: DatePickerProps<Dayjs>["onChange"] = (date) => {
    if (!date || Array.isArray(date)) {
      remove(queryKey);
      return;
    }

    set(queryKey, date.format("DD-MM-YYYY"));
  };

  return (
    <DatePicker
      className={className}
      placeholder={t("common.selectDate")}
      onChange={onChangeHandle}
      format="DD-MM-YYYY"
      defaultValue={
        defaultValue
          ? dayjs(defaultValue, "DD-MM-YYYY")
          : null
      }
      value={
        currentValue
          ? dayjs(currentValue, "DD-MM-YYYY")
          : null
      }
    />
  );
};

export default DateFilter;