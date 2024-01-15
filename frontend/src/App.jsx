import useAuth from "./hooks/useAuth";
import { AuthProvider } from "./context/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MailBox from "./components/MailBox";
import { MessageProvider } from "./context/MessageContext";
import { useEffect } from "react";
import useMailAPI from "./hooks/useMailApi";
import MessageBox from "./components/MessageBox";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useAuth();
  const { getRecievedEmails } = useMailAPI();
  const inboxEmails = async () => {
    const res = await getRecievedEmails({ count: 10, offset: 0 });
    console.log("inbox: ", res);
  };

  useEffect(() => {
    inboxEmails();
    // sentEmails()
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />}>
          <Route path="/inbox" element={<MailBox />} />
          <Route path="/sent" element={<MailBox />} />
          <Route path="/messages/:messageId" element={<MessageBox />} />
        </Route>
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/inbox" /> : <Login />}
        />
      </Routes>
      <ToastContainer
        style={{zIndex: 100}}
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
      />
    </div>
  );
}

export default () => (
  <AuthProvider>
    <MessageProvider>
      <App />
    </MessageProvider>
  </AuthProvider>
);
