import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import { AddTask, EditTask, Loggin, NotFound, Profile, Register, ViewTask } from "./pages";
import PrivateRoute from "./components/privateRoute";


const App = () => {
  return (
    <div>
      <div 
          className="bg-[#dffcf0] absolute top-[-6rem] -z-10 right-[11rem] 
                      h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] 
                        sm:w-[68.75rem] dark:bg-[#8c6496]">                  
      </div>
      <div 
          className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] 
                        h-[31.25rem] w-[50rem] rounded-full blur-[10rem] 
                        sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] 
                        xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#699463]">
      </div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" index element={<Loggin />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/view" index element={<ViewTask />} />
            <Route path="/edit/:id" element={<EditTask />} />
            <Route path="/add" element={<AddTask />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
