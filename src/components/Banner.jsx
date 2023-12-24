import "./Banner.css";
import { signInWithGoogle, signOut, useAuthState } from "../utils/firebase";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


const Banner = () => {
  const d = new Date();
  const hour = d.getHours();
  const [user] = useAuthState();

  const meal = ["breakfast", "lunch", "dinner"];
  let s;
  if (hour < 11) {
    s = meal[0];
  } else if (hour < 16) {
    s = meal[1];
  } else {
    s = meal[2];
  }
  const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user] = useAuthState();
    console.log(user);

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    return (
      <div className="profileDropdown">
        <button
          onClick={toggleDropdown}
          className={user ? "profileButton" : "loginButton"}
        >
          {user ? <img src={user.photoURL} alt="Profile" /> : "Login"}
        </button>
        {isOpen && (
          <div className="dropdownContent">
            {user ? (
              <>
                <Link to="/Profile" className="dropdown-item">
                  Go to Profile
                </Link>
                <button onClick={signOut} className="btn btn-primary mt-2">
                  Sign out
                </button>
              </>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="btn btn-primary mt-2"
              >
                Sign in
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bannerContainer">
      <div className="textContainer">
        <h1 className="title">What's for {s}?</h1>
        <p className="subtitle">
          Find a recipe for {hour < 16 ? "today" : "tonight"}
        </p>
      </div>
      <ProfileDropdown />
    </div>
  );
};

export default Banner;
