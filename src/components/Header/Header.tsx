import { createTheme, TextField, ThemeProvider } from "@mui/material"; // Corrected import for MUI v5
import React from "react";
import "./Header.css";
import MenuItem from "@mui/material/MenuItem";
import countries from "../../data/category"; // Ensure this file is typed
import { debounce } from "lodash";


// Type definitions for the props
interface HeaderProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setWord: React.Dispatch<React.SetStateAction<string>>;
  word: string;
  setMeanings: React.Dispatch<React.SetStateAction<any[]>>;
  LightTheme: boolean;
}

const Header: React.FC<HeaderProps> = ({
  category,
  setCategory,
  setWord,
  word,
  setMeanings,
  LightTheme,
}) => {
  // Create a custom theme for dark/light mode
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: LightTheme ? "#000" : "#fff",
      },
      mode: LightTheme ? "light" : "dark", // Use mode instead of type
    },
  });

  // Handle category change
  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(e.target.value as string); // type the value properly
    setWord(""); // clear the word on category change
    setMeanings([]); // reset meanings
  };

  // Debounced text input handler
  const handleText = debounce((text: string) => {
    setWord(text);
  }, 500);

  return (
    <div className="header">
      <span className="title">Meaning Mate</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            className="search"
            id="filled-basic"
            label="Search a Word"
            onChange={(e) => handleText(e.target.value)}
          />
          <TextField
            select
            label="Language"
            value={category}
            onChange={handleChange}
            className="select"
          >
            {countries.map((option) => (
              <MenuItem key={option.label} value={option.label}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
