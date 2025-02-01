import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Card>
      <CardHeader>
        <CardTitle> vite + react + tailwind + shadcn</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </Button>
        <Button>Toggle theme</Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        Made with love by Filip.
      </CardFooter>
    </Card>
  );
}

export default App;
