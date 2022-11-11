import { FormProvider } from "./contexts/FormContext";
import Routes from "./routes";

export const App = () => {

  return (
    <FormProvider>
      <Routes />
    </FormProvider>

  );
}

export default App;

