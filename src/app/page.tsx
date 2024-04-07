import Card from "./card";
import { CardContent } from "./card-content";

export default function Home() {
  return (
    <div>
      <Card InnerComponent={CardContent} />
    </div>
  );
}
