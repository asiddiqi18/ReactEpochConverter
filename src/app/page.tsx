import Card from "./card";
import { Form } from "./form";

export default function Home() {
  return (
    <div>
      <Card InnerComponent={Form} />
    </div>
  );
}
