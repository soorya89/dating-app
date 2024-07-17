// src/contexts/RegistrationContext.js
import React, { createContext, useState } from 'react';

export const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    section1: {
      age: '',
      dob: '',
      hobbies: '',
      interest: [],
      smoking: '',
      drinking: '',
      qualification: '',
      profilePic: '',
      additionalImages: [],
      shortReel: '',
    },
    section2: {
      employmentType: '',
      companyName: '',
      designation: '',
      location: '',
      title: '',
      expertiseLevel: '',
    },
    section3: {
      relationshipType: '',
    },
  });

  const updateSection1 = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      section1: { ...prevData.section1, ...data },
    }));
  };

  const updateSection2 = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      section2: { ...prevData.section2, ...data },
    }));
  };

  const updateSection3 = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      section3: { ...prevData.section3, ...data },
    }));
  };

  return (
    <RegistrationContext.Provider value={{ formData, updateSection1, updateSection2, updateSection3 }}>
      {children}
    </RegistrationContext.Provider>
  );
};
