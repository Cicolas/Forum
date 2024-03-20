import dayjs from "dayjs";
import { Bullet } from "../../atoms/Bullet/Bullet";
import { Label } from "../../atoms/Label/Label";
import { Spacer } from "../../atoms/Spacer/Spacer";
import { Timestamp, timestampToDate } from "../../../utils/types/timestamp";

type PostContentProps = {
  content: string;
  createdAt: Timestamp
}

export function PostContent({ content, createdAt }: PostContentProps) {
  return <>
    {content}

    <Spacer className="text-silver-chalice-400 font-serif">
      <Label>
        {dayjs(timestampToDate(createdAt)).format("HH:mm")}
      </Label>
      &nbsp;
      <Bullet/>
      &nbsp;
      <Label>
        {dayjs(timestampToDate(createdAt)).locale("pt-br").format('DD[ de ]MMMM[ de ]YYYY')}
      </Label>
    </Spacer>
  </>
}