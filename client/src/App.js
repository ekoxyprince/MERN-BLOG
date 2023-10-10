import Pages from "./routes/pages";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from "./providers/auth";
function App() {
  return (
   <AuthProvider>
   <Pages/>
   </AuthProvider>
  );
}

export default App;
