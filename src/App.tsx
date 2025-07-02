import "./App.css";
import { AuthProvider, ToastProvider } from "./contexts";
import { AppNavigation } from "./navigation";

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
