import React, { useEffect, useState, useRef } from "react"; // Import useRef
import axios from "axios"; // Assuming axios is installed and used for API calls
import styles from "./Home.module.css"

const apiUrl = import.meta.env.VITE_API_URL;

const Home = () => {
  // console.log(apiUrl);

  const [file, setFile] = useState(null);
  const [user, setUser] = useState("");
  // 1. Declare useRef for the debounce timer
  const debounceTimer = useRef(null);
  const [typedUser, setTypedUser] = useState("")

  useEffect(() => console.log(user), [user]);

  // !  Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submission under progress");
    
    if (!file) {
      console.log("Please add a valid file and submit");
      return;
    }

    const formData = new FormData();
    formData.append("uploaded-file", file);
    formData.append("user", user);

    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/fileshare/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFile(null)
      setUser("")
      console.log("Submission Successful", response.data);
    } catch (error) {
      console.log("Error in submission file", error);
    }
  };

  //   ! file upload state management
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // No need for prev if you just want to set the new file
  };

  // ! debounced user change handler
  
  const handleUserChange = (e) => {
    setTypedUser(e.target.value)
    if(debounceTimer.current){
      clearTimeout(debounceTimer)
    }
     debounceTimer.current = setTimeout(()=>{
      setUser(e.target.value)
    }, 3000)
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input type="file" name="uploaded_file" onChange={handleFileChange} />
        {/* Make sure to set the value prop for controlled input */}
        <input type="mail" placeholder="Enteer your mail" value={typedUser} onChange={handleUserChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Home;