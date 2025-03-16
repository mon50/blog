import { parseISO, format } from "date-fns";

interface DateProps {
  dateString: string;
}

const Date: React.FC<DateProps> = ({ dateString }) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "yyyy年MM月dd日")}</time>;
};

export default Date;
