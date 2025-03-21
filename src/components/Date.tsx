import { parseISO, format } from "date-fns";

interface DateProps {
  dateString: string;
}

const Date: React.FC<DateProps> = ({ dateString }) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "yyyy/MM/dd")}</time>;
};

export default Date;
