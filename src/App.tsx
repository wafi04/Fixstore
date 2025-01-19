import { useAuth } from "./hooks/auth/userAuthStore";
import Banner from "./pages/home/components/Banner";
import Categories from "./pages/home/components/Categories";
import FeaturedCollection from "./pages/home/components/FeaturedCollections";

function App() {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <Banner />
      {/* <FeaturedCollection />
      <Categories /> */}
    </>
  );
}

export default App;
