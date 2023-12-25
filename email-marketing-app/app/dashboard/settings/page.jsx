"use client";

import React, { useState, useEffect} from 'react'; 
// import Nav from "/app/home/nav/Nav";
// import ImageUploader from "./Uploader"

// import { supabase } from '../path/to/supabase';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const Setting = () => {

  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState(''); 
  const [userName, setUserName] = useState(''); 
  const [bio, setBio] = useState(''); 
  const [profession, setProfession] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
  const supabase = createClientComponentClient();

  // const [errors, setErrors] = useState({}); 
  // const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    async function fetchUserProfile() {
      const session = supabase.auth.session();

      if (session) {
        try {
          const { data, error } = await supabase
            .from(tableName) // Replace 'user_profiles' with your Supabase table name for user profiles
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (error) {
            throw error;
          }

          setUserProfile(data);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setUserName(data.userName);
          setBio(data.bio);
          setProfession(data.profession);
          setEmail(data.email)
        } catch (error) {
          console.error('Error fetching user profile:', error.message);
          router.push('/auth/login'); // Redirect to login if there's an error or no session
        }
      } else {
        router.push('/auth/login'); // Redirect to login if there's no session
      }
    }

    fetchUserProfile();
  }, [router]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setError(null);
    // Reset form fields to current profile data
    setFirstName(profileData.firstName || '');
    setLastName(profileData.lastName || '');
    setUserName(profileData.userName || '');
    setBio(profileData.bio || '');
    setProfession(profileData.profession || '');
    setEmail(profileData.email || '')
    setError(null); // Clear error when canceling
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    if (!userName || !email) {
      setError('User name and email are required.');
      return;
    }

    try {
      const session = supabase.auth.session();

      if (session) {
        const { data, error } = await supabase
          .from(tableName) // Replace 'user_profiles' with your Supabase table name for user profiles
          .update({
            firstName,
            lastName,
            userName,
            bio,
            profession,
            email,
          })
          .eq('user_id', session.user.id)
          .single();

        if (error) {
          throw error;
        }

        setProfileData(data);
        setEditing(false);
        setError(null);
        console.log('Profile updated successfully:', data);
      }
    } catch (error) {
      console.error('Error updating user profile:', error.message);
      setError('Error updating profile. Please try again.');
      // Handle error updating profile
    }
  };


  // if (!profileData) {
  //   return  (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="border-2 border-gray-300 rounded p-4">
  //         <h1 className="text-xl font-semibold mb-4">Loading...</h1>
  //         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <main className="mt-5 justify-center items-center flex flex-col " >
     {/* <Nav/> */}
      <div className="text-center">
        <h1 className="text-3xl text-ui_primary font-semibold" >User Profile Settings</h1>
      </div>
      {/* <div className="mt-5">
      <ImageUploader />
      </div> */}
      
      <form className="mt-10" onSubmit={handleUpdateProfile}>
      {error && <p style={styles.error}>{error}</p>}
        <div className="md:flex md:flex-row ">
          <div className="flex flex-col mt-5">
            <label className="text-2xl" style={styles.label}>FirstName</label>
              <input type="text" id="inputa" className=" mt-2" placeholder="John" value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                /> 
                {/* {error.name && <p style={styles.error}>{error.name}</p>} */}
          </div>
          <div className="flex flex-col mt-5 md:ml-5">
            <label className="text-2xl" style={styles.label}>LastName</label>
            <input type="text" id="inputb" className=" mt-2" placeholder="Doe"  value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                /> 
                {/* {error.name && <p style={styles.error}>{error.name}</p>} */}
          </div>
        </div>
        <div>
          <label className="text-2xl" style={styles.label}>UserName</label>         
          <input type="text" id="input" placeholder="JohnD234" value={userName} onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className="flex flex-col mt-5">
          <label className="text-2xl" style={styles.label}>E-mail</label>
          <input type="email" id="input" placeholder="emails@gmail.com" className=""  value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                /> 
                {/* {error.email && <p style={styles.error}>{error.email}</p>}  */}
        </div>
        <div className="flex flex-col mt-5">
          <label className="text-2xl" style={styles.label}>Profession</label>
          <input type="text" id="input" placeholder="A developer" className=" mt-2"  value={profession} 
                    onChange={(e) => setProfession(e.target.value)}  />
        </div>
        <div className="flex flex-col mt-5">
          <label className="text-2xl" style={styles.label}>Bio</label>
          <textarea type="text" id="input" placeholder="I'm a ......" className=" mt-2"   value={bio} 
                    onChange={(e) => setBio(e.target.value)} />
        </div>
        <div className="mt-5 cursor">
          <button id="button">Save Changes</button>
        </div>
      </form>
    </main>
  );
};

export default Setting;

const styles ={
  error: { 
    color: 'red', 
    fontSize: '14px', 
    marginBottom: '6px', 
}, 
 label: {
   color: 'black',
   fontSize: '20px', 
 }
 
}





//   const [firstName, setFirstName] = useState(''); 
//   const [lastName, setLastName] = useState(''); 
//   const [userName, setUserName] = useState(''); 
//   const [bio, setBio] = useState(''); 
//   const [profession, setProfession] = useState(''); 
//   const [email, setEmail] = useState(''); 
//   const [errors, setErrors] = useState({}); 
//   const [isFormValid, setIsFormValid] = useState(false); 

//   // Submit 
//   useEffect(() => { 
//     validateForm(); 
// }, [userName, email, ]); 
// // Validate form 
// const validateForm = () => { 
//     let errors = {}; 

//     if (!userName) { 
//         errors.userName = 'Name is required.'; 
//     } 

//     if (!email) { 
//         errors.email = 'Email is required.'; 
//     } else if (!/\S+@\S+\.\S+/.test(email)) { 
//         errors.email = 'Email is invalid.'; 
//     } 

//     setErrors(errors); 
//     setIsFormValid(Object.keys(errors).length === 0); 
// }; 
// // Submit 
// const handleSubmit = () => { 
//     if (isFormValid) { 
//         console.log('Form submitted successfully!'); 
//     } else { 
//         console.log('Form has errors. Please correct them.'); 
//     } 
// }; 