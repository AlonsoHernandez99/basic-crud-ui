import "./App.css";
import Navbar from "./components/Navbar";
import FormContainer from "./components/FormContainer";
import { Card, CardContent, Container } from "@material-ui/core";

function App() {
  return (
    <div>
      <Container>
        <Navbar></Navbar>
        <Card>
          <CardContent>
            <FormContainer></FormContainer>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default App;
